import type { Transition } from 'motion/react'

// ─── Shared Curves ────────────────────────────────────────────────
const easeOut: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] }

// ─── Overlay (backdrop fade) ──────────────────────────────────────
export const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: 'easeOut' },
} as const

// ─── Content (scale + fade — for Dialogs, AlertDialogs) ──────────
export const contentAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: easeOut,
} as const

// ─── Slide Down (Dropdowns, Selects, Popovers) ───────────────────
export const slideDownAnimation = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: easeOut,
} as const

// ─── Slide Up (Bottom sheets, toasts from bottom) ─────────────────
export const slideUpAnimation = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: easeOut,
} as const

// ─── Slide from Edge (Sheet/Drawer — parameterized) ───────────────
type Side = 'top' | 'right' | 'bottom' | 'left'

const slideOffsets: Record<Side, Record<string, string | number>> = {
  top: { y: '-100%' },
  bottom: { y: '100%' },
  left: { x: '-100%' },
  right: { x: '100%' },
}

export function sheetAnimation(side: Side) {
  return {
    initial: { ...slideOffsets[side], opacity: 1 },
    animate: { x: 0, y: 0, opacity: 1 },
    exit: { ...slideOffsets[side], opacity: 1 },
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] },
  } as const
}

// ─── Accordion / Collapsible (height auto) ────────────────────────
export const collapseAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
} as const

// ─── Tooltip ──────────────────────────────────────────────────────
export const tooltipAnimation = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.15 },
} as const
