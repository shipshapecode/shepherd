import preact from 'preact';

const { Component } = preact;

export default class ShepherdButton extends Component {
  render(props) {
    const { classPrefix, config, styles } = props;
    const { action, classes, secondary, text } = config;

    return <button
      className={(classes || '') + styles.button + (secondary ? `${classPrefix}shepherd-button-secondary` : '')}
      onClick={action}
      tabindex='0'>
      {text}
    </button>;
  }
}
