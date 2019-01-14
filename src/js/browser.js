export const isBrowser = typeof window !== 'undefined';

const nav = isBrowser ? navigator : {};
const win = isBrowser ? window : {};

export const isBrowserSupported = 'MutationObserver' in win;
export const isIE = /MSIE |Trident\//.test(nav.userAgent);
export const isIOS = /iPhone|iPad|iPod/.test(nav.platform) && !win.MSStream;
export const supportsTouch = 'ontouchstart' in win;