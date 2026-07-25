// ============================================================
// src/lib/rate-limit.ts
// Chống spam yêu cầu booking / API đơn giản bằng in-memory Map
// ============================================================

const ipCache = new Map<string, number[]>();

export interface RateLimitOptions {
  intervalMs: number;
  maxRequests: number;
}

/**
 * Thực hiện rate limit dựa trên địa chỉ IP.
 * Trả về true nếu bị giới hạn (rate limited), false nếu hợp lệ.
 */
export function isRateLimited(ip: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const timestamps = ipCache.get(ip) || [];

  // Loại bỏ các request đã quá thời gian interval
  const windowStart = now - options.intervalMs;
  const activeTimestamps = timestamps.filter((time) => time > windowStart);

  if (activeTimestamps.length >= options.maxRequests) {
    return true;
  }

  // Thêm request mới
  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return false;
}
