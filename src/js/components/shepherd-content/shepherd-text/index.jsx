import preact from 'preact';
import { isElement, isFunction } from '../../../utils/type-check';

const { Component } = preact;

export default class ShepherdText extends Component {
  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const { step } = this.props;
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if (isElement(text)) {
      this.base.appendChild(text);
    }
  }

  render(props) {
    const { descriptionId, step, styles } = props;
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    return <div
      className={styles.text.trim()}
      dangerouslySetInnerHTML={{ __html: !isElement(text) ? text : null }}
      id={descriptionId}
    />;
  }
}
