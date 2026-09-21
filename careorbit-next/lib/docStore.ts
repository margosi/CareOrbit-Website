/* Tiny external store for the "this browser already requested <file>" flag.
 *
 * WHY NOT AN EFFECT: reading localStorage in useEffect and calling setState
 * synchronously triggers a cascading render, which react-hooks/purity
 * (correctly) rejects. localStorage is an external mutable source, so
 * useSyncExternalStore is the sanctioned API for it - and it gives us a
 * correct server snapshot for free, so SSR renders the un-requested state
 * and hydration does not mismatch.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

function subscribe(fn: Listener) {
  listeners.add(fn);
  /* Another tab clearing the flag should update this one too. */
  const onStorage = () => fn();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", onStorage);
  };
}

function emit() {
  for (const fn of listeners) fn();
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // private mode / blocked storage
  }
}

export const docStore = {
  subscribe,
  /** Client snapshot. */
  get: (key: string) => () => read(key),
  /** Server snapshot: never requested. */
  server: () => null,
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* blocked storage */
    }
    emit();
  },
  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* blocked storage */
    }
    emit();
  },
};
