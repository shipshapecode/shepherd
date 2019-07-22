import preact from 'preact';
import { isFunction } from '../utils/type-check';

const { Component, render } = preact;

class ShepherdText extends Component {
  render(props) {
    const { descriptionId, options, styles } = props;
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

export default function createText(content, descriptionId, options, step, styles) {
  return render(
    <ShepherdText descriptionId={descriptionId} options={options} step={step} styles={styles}/>,
    content
  );
}
