export interface UBDebugInfo {
  classCache: number;
  styleCount: number;
  totalRequests: number;
  cacheHits: number;
  totalSegmentRequests: number;
  version: string;
}

// Core Engine Functions
export function ub(str: any): string;
export function debugUB(): UBDebugInfo;
export function clearUBCache(): void;
export function oklch(
  name: 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'teal' | 'amber' | 'gray' | string,
  shade: number,
  darkMode?: boolean
): string;

// Layout & Style Helpers
export function p(v: string | number): string;
export function m(v: string | number): string;
export function pl(v: string | number): string;
export function pr(v: string | number): string;
export function ml(v: string | number): string;
export function mr(v: string | number): string;
export function pt(v: string | number): string;
export function pb(v: string | number): string;
export function mt(v: string | number): string;
export function mb(v: string | number): string;
export function w(v: string | number): string;
export function h(v: string | number): string;
export function scale(v: string | number): string;

// Border Helpers
export function border(v?: string | number): string;
export function borderT(v?: string | number): string;
export function borderR(v?: string | number): string;
export function borderB(v?: string | number): string;
export function borderL(v?: string | number): string;
export function borderX(v?: string | number): string;
export function borderY(v?: string | number): string;

// Styling Modifiers
export function rounded(v: 'full' | string | number): string;
export function shadow(v: string | number): string;
export function opacity(v: string | number): string;

// Flex & Grid Layout Helpers
export function bg(c: string, s: string | number, o?: string | number): string;
export function text(c: string, s: string | number, o?: string | number): string;
export function grid(cols: number | string, rows: number | string, gap: number | string): string;
export function autoGrid(minWidth: number | string, gap: number | string): string;
export function autoLayout(
  direction: 'row' | 'col' | 'wrap' | string,
  alignment: 'left' | 'right' | 'center' | 'between' | 'around' | 'evenly' | 'start' | 'end' | 'stretch' | string,
  gap?: number | string
): string;
export function span(n: number | string): string;
export function row(n: number | string): string;
export function bgFill(
  direction: 'left' | 'right' | 'top' | 'bottom' | string,
  color: string,
  shade: number | string,
  duration: number | string
): string;

// Component Classes Dictionaries
export const btn: {
  base: string;
  sm: string;
  md: string;
  lg: string;
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  outline: string;
  ghost: string;
  glow: string;
};

export const input: {
  base: string;
  sm: string;
  md: string;
  lg: string;
  error: string;
  success: string;
};

export const card: {
  base: string;
  hover: string;
  click: string;
  glass: string;
};

// Gradient Helpers
export function gradient(fromColor: string, fromShade: number | string, toColor: string, toShade: number | string): string;
export function gradientAngle(angle: number | string, fromColor: string, fromShade: number | string, toColor: string, toShade: number | string): string;
export function gradientVertical(fromColor: string, fromShade: number | string, toColor: string, toShade: number | string): string;
export function gradientHorizontal(fromColor: string, fromShade: number | string, toColor: string, toShade: number | string): string;
export function gradientRadial(fromColor: string, fromShade: number | string, toColor: string, toShade: number | string): string;
export function gradientTriple(c1: string, s1: number | string, c2: string, s2: number | string, c3: string, s3: number | string): string;

// Animation Helpers
export function animate(prop: string, from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function widthAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function heightAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function paddingAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function marginAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function bgAnim(fromColor: string, fromShade: number | string, toColor: string, toShade: number | string, duration: number | string, infinite?: boolean): string;
export function opacityAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function roundedAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function scaleAnim(from: number | string, to: number | string, duration: number | string, infinite?: boolean): string;
export function infiniteAnim(prop: string, from: number | string, to: number | string, duration: number | string): string;
export function clickAnim(prop: string, from: number | string, to: number | string, duration: number | string): string;

// Mapping Helpers
export const map: {
  linear: (v: number, min: number, max: number, sc: string, ss: number, ec: string, es: number) => string;
  shade: (v: number, min: number, max: number, color: string, sMin?: number, sMax?: number) => string;
  fuel: (v: number, min?: number, max?: number) => string;
  heat: (v: number, min?: number, max?: number) => string;
  coolWarm: (v: number, min?: number, max?: number) => string;
  rainbow: (v: number, min?: number, max?: number) => string;
};
