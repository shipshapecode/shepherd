import variables from './variables';
import { shepherdButtonCSS } from './components/shepherd-button';
import { shepherdCancelLinkCSS } from './components/shepherd-cancel-link';
import { shepherdFooterCSS } from './components/shepherd-footer';
import { shepherdHeaderCSS } from './components/shepherd-header';
import { setupNano } from './nano';

export function generateStyles(options) {
  if (options.styleVariables) {
    Object.assign(variables, options.styleVariables);
  }

  const nano = setupNano(options.classPrefix);
  const styles = {};
  const components = [
    {
      baseClassName: 'shepherd-button',
      name: 'shepherdButton',
      styleGenerator: shepherdButtonCSS
    },
    {
      baseClassName: 'shepherd-cancel-link',
      name: 'shepherdCancelLink',
      styleGenerator: shepherdCancelLinkCSS
    },
    {
      baseClassName: 'shepherd-footer',
      name: 'shepherdFooter',
      styleGenerator: shepherdFooterCSS
    },
    {
      baseClassName: 'shepherd-header',
      name: 'shepherdHeader',
      styleGenerator: shepherdHeaderCSS
    }
  ];

  components.forEach(({ baseClassName, name, styleGenerator }) => {
    styles[name] = nano.rule(styleGenerator(variables), baseClassName).trim();
  });

  return styles;
}
