/**
 * Icon — thin SVG wrapper that suppresses Dark Reader hydration warnings.
 *
 * Dark Reader browser extension injects `data-darkreader-inline-stroke` and
 * similar attributes into SVG elements AND their children (path, circle, etc.)
 * after React hydrates the page. React reports a hydration mismatch because
 * those attributes weren't present in the server-rendered HTML.
 *
 * Fix: `suppressHydrationWarning` is applied to the root <svg> AND recursively
 * to every child element so React skips attribute comparison for the whole
 * SVG subtree.
 *
 * Usage — drop-in replacement for bare `<svg>`:
 *   <Icon className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 *     <path ... />
 *   </Icon>
 */
import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode, SVGProps } from "react";

function suppressChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<{ children?: ReactNode; suppressHydrationWarning?: boolean }>;
    return cloneElement(el, {
      suppressHydrationWarning: true,
      ...(el.props.children
        ? { children: suppressChildren(el.props.children) }
        : {}),
    });
  });
}

export default function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} suppressHydrationWarning>
      {suppressChildren(children)}
    </svg>
  );
}
