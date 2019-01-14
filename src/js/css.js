import { isBrowserSupported } from './browser';

/**
 * Injects a string of CSS styles to a style node in <head>
 * @param {String} css
 */
export function injectCSS(css) {
  if (isBrowserSupported) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = css;
    document.head.insertBefore(style, document.head.firstChild);
  }
}