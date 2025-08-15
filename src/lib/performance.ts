import { useMemo, useCallback, useRef, useEffect, useState } from "react";

/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, etc.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for throttling function calls
 * Useful for scroll events, resize events, etc.
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);
  const lastCallTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      } else {
        if (lastCallTimer.current) {
          clearTimeout(lastCallTimer.current);
        }

        lastCallTimer.current = setTimeout(
          () => {
            lastCall.current = Date.now();
            callback(...args);
          },
          delay - (now - lastCall.current)
        );
      }
    },
    [callback, delay]
  ) as T;
}

/**
 * Custom hook for memoizing expensive calculations
 * Automatically handles cleanup and memory management
 */
export function useMemoizedValue<T>(
  factory: () => T,
  deps: React.DependencyList,
  maxAge: number = 5 * 60 * 1000 // 5 minutes default
): T {
  const cacheRef = useRef<
    | {
        value: T;
        timestamp: number;
        depsString: string;
      }
    | undefined
  >(undefined);

  return useMemo(() => {
    const now = Date.now();
    const currentDepsString = JSON.stringify(deps);

    // Check if we have a valid cached value
    if (
      cacheRef.current &&
      cacheRef.current.depsString === currentDepsString &&
      now - cacheRef.current.timestamp < maxAge
    ) {
      return cacheRef.current.value;
    }

    // Calculate new value
    const newValue = factory();

    // Cache the new value
    cacheRef.current = {
      value: newValue,
      timestamp: now,
      depsString: currentDepsString,
    };

    return newValue;
  }, [factory, deps, maxAge]);
}

/**
 * Custom hook for intersection observer
 * Useful for lazy loading images, infinite scroll, etc.
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting];
}

/**
 * Custom hook for lazy loading components
 * Automatically loads components when they come into view
 */
export function useLazyLoad<T extends React.ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
): [T | null, boolean, React.RefObject<HTMLElement | null>] {
  const [Component, setComponent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [elementRef, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && !Component && !isLoading) {
      setIsLoading(true);
      importFn()
        .then((module) => {
          setComponent(() => module.default);
        })
        .catch((error) => {
          console.error("Failed to load component:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isIntersecting, Component, isLoading, importFn]);

  return [Component, isLoading, elementRef];
}

/**
 * Utility function for chunking arrays
 * Useful for processing large datasets in smaller batches
 */
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

/**
 * Utility function for deep cloning objects
 * Handles circular references and complex nested structures
 */
export function deepClone<T>(obj: T, hash = new WeakMap()): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array)
    return obj.map((item) => deepClone(item, hash)) as T;
  if (typeof obj === "function") return obj;

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  const clonedObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clonedObj);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key], hash);
    }
  }

  return clonedObj;
}

/**
 * Utility function for measuring performance
 * Useful for benchmarking functions and operations
 */
export function measurePerformance<T>(
  fn: () => T,
  label: string = "Operation"
): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
  return result;
}

/**
 * Utility function for async performance measurement
 */
export async function measureAsyncPerformance<T>(
  fn: () => Promise<T>,
  label: string = "Async Operation"
): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();

  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
  return result;
}
