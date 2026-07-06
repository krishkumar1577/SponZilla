import { API_BASE_URL } from '../services/api';

const WAKE_TIMEOUT_MS = 60_000;
const WAKE_CACHE_MS = 30_000;

let wakePromise: Promise<boolean> | null = null;
let lastWakeAt = 0;

export async function wakeBackend(): Promise<boolean> {
  const now = Date.now();
  if (wakePromise && now - lastWakeAt < WAKE_CACHE_MS) {
    return wakePromise;
  }

  const healthUrl = `${API_BASE_URL || ''}/health`.replace(/([^:]\/)\/+/g, '$1');

  wakePromise = (async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), WAKE_TIMEOUT_MS);
      const response = await fetch(healthUrl, { signal: controller.signal });
      clearTimeout(timeout);
      lastWakeAt = Date.now();
      return response.ok;
    } catch {
      lastWakeAt = Date.now();
      return false;
    }
  })();

  return wakePromise;
}
