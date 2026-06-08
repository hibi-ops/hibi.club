/**
 * Shared scroll state — written by the Lenis reporter, read inside the r3f
 * useFrame loop. A plain module singleton avoids re-renders on every scroll.
 */
export const scrollState = { progress: 0, velocity: 0 };
