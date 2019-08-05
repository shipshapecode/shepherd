import preact from 'preact';

const { Component } = preact;

export default class ShepherdButton extends Component {
  render(props) {
    const { classPrefix, config, step, styles } = props;
    const { action, classes, secondary, text } = config;

    return <button
      className={(classes || '') + styles.button + (secondary ? ` ${classPrefix}shepherd-button-secondary` : '')}
      onClick={action ? action.bind(step.tour) : null}
      tabindex='0'>
      {text}
    </button>;
  }
}
