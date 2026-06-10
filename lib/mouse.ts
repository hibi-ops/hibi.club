/**
 * Window-level pointer state in NDC (-1..1, y up). The fixed canvas is
 * pointer-events:none (so content stays clickable), which means r3f's own
 * pointer tracking never fires — this singleton is fed by a window listener
 * (see DayBackdrop) and read inside useFrame.
 */
export const mouseState = { nx: 10, ny: 10 }; // offscreen until first move
