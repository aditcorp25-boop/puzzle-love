/**
 * Icon — thin SVG wrapper that suppresses Dark Reader hydration warnings.
 *
 * Dark Reader browser extension injects `data-darkreader-inline-stroke` and
 * similar attributes into SVG elements after React hydrates the page.  React
 * then reports a hydration mismatch because those attributes weren't present in
 * the server-rendered HTML.  Adding `suppressHydrationWarning` on the `<svg>`
 * element itself tells React to skip attribute comparison for that node, which
 * silences the warning without affecting behaviour.
 *
 * Usage — drop-in replacement for bare `<svg>`:
 *   <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *     <path ... />
 *   </Icon>
 */
import type { SVGProps } from "react";

export default function Icon(props: SVGProps<SVGSVGElement>) {
  // eslint-disable-next-line react/no-danger-with-children -- intentional passthrough
  return <svg {...props} suppressHydrationWarning />;
}
