import preact from 'preact';
import { isFunction } from '../utils/type-check';

const { Component } = preact;

export default class ShepherdText extends Component {
  render(props) {
    const { descriptionId, options, step, styles } = props;
    let { text } = options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    return <div
      className={styles.text.trim()}
      dangerouslySetInnerHTML={{ __html: text }}
      id={descriptionId}
    />;
  }
}
