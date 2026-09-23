/* Accessible variants of the brand colours for LARGE display text.
 *
 * WCAG 1.4.3 asks 3:1 of text at 24px+ (or 18.66px+ bold), not 4.5:1. The
 * brand hues miss even that on the paper background: coral 2.88, blue 2.70,
 * teal 2.32. Each value below is the SAME hue stepped down its own ramp
 * until it clears 3:1 on paper, white and the tinted panels.
 *
 * This map is applied only where a colour is used as the colour of a large
 * numeral. The identical values continue to be used for dots, rules, fills
 * and borders, where contrast rules do not apply and the brand should stay
 * vivid - which is why this is a lookup at the point of use rather than a
 * change to the source data.
 */
export const LARGE_TEXT: Record<string, string> = {
  "#E3735C": "#D4644E", // coral  2.88 -> 3.45 on paper
  "#5B9BEA": "#5289D2", // blue   2.70 -> 3.37
  "#4FB3BF": "#41939D", // teal   2.32 -> 3.36
};

/** The accessible large-text variant of a brand colour, or the colour itself. */
export function largeText(c: string | undefined): string | undefined {
  return c ? (LARGE_TEXT[c.toUpperCase()] ?? c) : c;
}
