import { useEffect, useRef, useCallback } from "react";

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  timestamp: number;
}

interface PerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface UsePerformanceOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  threshold?: number; // Log if render time exceeds this threshold
}

export function usePerformance(
  componentName: string,
  options: UsePerformanceOptions = {}
) {
  const {
    enabled = process.env.NODE_ENV === "development",
    logToConsole = true,
    onMetricsUpdate,
    threshold = 16, // 16ms = 60fps
  } = options;

  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);
  const metricsHistory = useRef<PerformanceMetrics[]>([]);

  // Start measuring render time
  const startRender = useCallback(() => {
    if (!enabled) return;
    renderStartTime.current = performance.now();
  }, [enabled]);

  // End measuring render time and collect metrics
  const endRender = useCallback(() => {
    if (!enabled) return;

    const renderTime = performance.now() - renderStartTime.current;
    renderCount.current += 1;

    const metrics: PerformanceMetrics = {
      renderTime,
      timestamp: Date.now(),
    };

    // Get memory usage if available
    if ("memory" in performance) {
      const memory = (
        performance as Performance & { memory: PerformanceMemory }
      ).memory;
      metrics.memoryUsage = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
      };
    }

    // Store metrics in history (keep last 100)
    metricsHistory.current.push(metrics);
    if (metricsHistory.current.length > 100) {
      metricsHistory.current.shift();
    }

    // Log to console if enabled and threshold exceeded
    if (logToConsole && renderTime > threshold) {
      console.warn(
        `🚨 Performance Warning: ${componentName} took ${renderTime.toFixed(2)}ms to render (threshold: ${threshold}ms)`
      );
    }

    // Log to console if enabled
    if (logToConsole) {
      console.log(
        `📊 ${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`
      );
    }

    // Call callback if provided
    onMetricsUpdate?.(metrics);
  }, [enabled, logToConsole, onMetricsUpdate, threshold, componentName]);

  // Get performance statistics
  const getStats = useCallback(() => {
    if (metricsHistory.current.length === 0) return null;

    const renderTimes = metricsHistory.current.map((m) => m.renderTime);
    const avgRenderTime =
      renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length;
    const minRenderTime = Math.min(...renderTimes);
    const maxRenderTime = Math.max(...renderTimes);

    return {
      totalRenders: renderCount.current,
      averageRenderTime: avgRenderTime,
      minRenderTime,
      maxRenderTime,
      recentMetrics: metricsHistory.current.slice(-10),
    };
  }, []);

  // Reset metrics
  const resetMetrics = useCallback(() => {
    renderCount.current = 0;
    metricsHistory.current = [];
  }, []);

  // Monitor component lifecycle
  useEffect(() => {
    if (!enabled) return;

    startRender();

    return () => {
      endRender();
    };
  }, [enabled, startRender, endRender]);

  // Monitor specific dependencies
  const monitorDependencies = useCallback(() => {
    if (!enabled) return;

    startRender();

    return () => {
      endRender();
    };
  }, [enabled, startRender, endRender]);

  return {
    startRender,
    endRender,
    getStats,
    resetMetrics,
    monitorDependencies,
    renderCount: renderCount.current,
    isEnabled: enabled,
  };
}

// Hook for monitoring specific operations
export function useOperationPerformance(
  operationName: string,
  options: UsePerformanceOptions = {}
) {
  const { enabled = process.env.NODE_ENV === "development" } = options;

  const measureOperation = useCallback(
    async <T>(operation: () => T | Promise<T>): Promise<T> => {
      if (!enabled) {
        return operation();
      }

      const startTime = performance.now();
      try {
        const result = await operation();
        const endTime = performance.now();
        const duration = endTime - startTime;

        if (options.logToConsole) {
          console.log(
            `⚡ ${operationName} completed in ${duration.toFixed(2)}ms`
          );
        }

        if (options.onMetricsUpdate) {
          options.onMetricsUpdate({
            renderTime: duration,
            timestamp: Date.now(),
          });
        }

        return result;
      } catch (error) {
        const endTime = performance.now();
        const duration = endTime - startTime;

        if (options.logToConsole) {
          console.error(
            `❌ ${operationName} failed after ${duration.toFixed(2)}ms:`,
            error
          );
        }

        throw error;
      }
    },
    [enabled, operationName, options.logToConsole, options.onMetricsUpdate]
  );

  return { measureOperation };
}

// Hook for monitoring API calls
export function useApiPerformance(
  apiName: string,
  options: UsePerformanceOptions = {}
) {
  const { measureOperation } = useOperationPerformance(apiName, options);

  const measureApiCall = useCallback(
    async <T>(
      apiCall: () => Promise<T>,
      additionalData?: Record<string, unknown>
    ): Promise<T> => {
      return measureOperation(async () => {
        const startTime = performance.now();
        const result = await apiCall();
        const endTime = performance.now();
        const duration = endTime - startTime;

        // Log additional performance data
        if (options.logToConsole && additionalData) {
          console.log(`📡 ${apiName} API call:`, {
            duration: `${duration.toFixed(2)}ms`,
            ...additionalData,
          });
        }

        return result;
      });
    },
    [measureOperation, apiName, options.logToConsole]
  );

  return { measureApiCall };
}
