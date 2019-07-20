export function shepherdCancelLinkCSS() {
  return {
    fontSize: '2em',
    textDecoration: 'none',
    transition: 'color 0.5s ease',
    '&::before': {
      content: '"\u00d7"'
    }
  };
}
