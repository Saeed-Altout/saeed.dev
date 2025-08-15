import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useThrottle } from "@/lib/performance";

interface VirtualizedListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
  onScroll?: (scrollTop: number) => void;
}

export function VirtualizedList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = "",
  onScroll,
}: VirtualizedListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + height) / itemHeight) + overscan
    );

    return { startIndex, endIndex };
  }, [scrollTop, height, itemHeight, overscan, items.length]);

  // Calculate total height for scroll container
  const totalHeight = useMemo(
    () => items.length * itemHeight,
    [items.length, itemHeight]
  );

  // Calculate offset for visible items
  const offsetY = useMemo(
    () => visibleRange.startIndex * itemHeight,
    [visibleRange.startIndex, itemHeight]
  );

  // Throttled scroll handler for better performance
  // Fix: Ensure the throttled function accepts (...args: unknown[]) and extracts scrollTop as number
  const throttledScrollHandler = useThrottle((...args: unknown[]) => {
    // Defensive: Only proceed if the first argument is a number
    const scrollTop = typeof args[0] === "number" ? args[0] : 0;
    setScrollTop(scrollTop);
    onScroll?.(scrollTop);
  }, 16); // ~60fps

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = event.currentTarget.scrollTop;
      throttledScrollHandler(scrollTop);
    },
    [throttledScrollHandler]
  );

  // Scroll to specific item
  const scrollToItem = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      if (scrollElementRef.current) {
        scrollElementRef.current.scrollTo({
          top: index * itemHeight,
          behavior,
        });
      }
    },
    [itemHeight]
  );

  // Scroll to top
  const scrollToTop = useCallback(() => {
    scrollToItem(0);
  }, [scrollToItem]);

  // Get visible items
  const visibleItems = useMemo(() => {
    const { startIndex, endIndex } = visibleRange;
    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      item,
      originalIndex: startIndex + index,
    }));
  }, [items, visibleRange]);

  // Auto-scroll to top when items change
  useEffect(() => {
    if (scrollTop > 0) {
      scrollToTop();
    }
  }, [items.length, scrollToTop]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
    >
      <div
        ref={scrollElementRef}
        className="overflow-auto h-full"
        onScroll={handleScroll}
        style={{ height }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: offsetY,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map(({ item, originalIndex }) => (
              <div
                key={originalIndex}
                style={{
                  height: itemHeight,
                  position: "relative",
                }}
              >
                {renderItem(item, originalIndex)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {scrollTop > 100 && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

VirtualizedList.displayName = "VirtualizedList";
