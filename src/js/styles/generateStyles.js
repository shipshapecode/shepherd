import variables from './variables';
import { shepherdActiveCSS } from './components/shepherd-active';
import { shepherdButtonCSS } from './components/shepherd-button';
import { shepherdCancelLinkCSS } from './components/shepherd-cancel-link';
import { shepherdElementCSS } from './components/shepherd-element';
import { shepherdFooterCSS } from './components/shepherd-footer';
import { shepherdHeaderCSS } from './components/shepherd-header';
import { shepherdTextCSS } from './components/shepherd-text';
import { setupNano } from './nano';
import themes from './themes';

export function generateStyles(options) {
  if (options.theme) {
    Object.assign(variables, themes[options.theme]);
  }

  if (options.styleVariables) {
    Object.assign(variables, options.styleVariables);
  }

  const nano = setupNano(options.classPrefix);
  const styles = {};
  const components = [
    {
      baseClassName: 'shepherd-active',
      name: 'shepherdActive',
      styleGenerator: shepherdActiveCSS
    },
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
      baseClassName: 'shepherd-element',
      name: 'shepherdElement',
      styleGenerator: shepherdElementCSS
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
    },
    {
      baseClassName: 'shepherd-text',
      name: 'shepherdText',
      styleGenerator: shepherdTextCSS
    }
  ];

  components.forEach(({ baseClassName, name, styleGenerator }) => {
    styles[name] = nano.rule(styleGenerator(variables), baseClassName).trim();
  });

  return styles;
}
