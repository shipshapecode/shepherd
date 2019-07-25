import preact from 'preact';
import ShepherdFooter from './shepherd-footer';
import ShepherdHeader from './shepherd-header';
import ShepherdText from './shepherd-text';
import { isUndefined } from '../../utils/type-check';

const { Component } = preact;

export default class ShepherdContent extends Component {
  render(props) {
    const { classPrefix, descriptionId, labelId, step, styles } = props;

    return <div
      className={styles.content.trim()}
    >
      <ShepherdHeader
        labelId={labelId}
        step={step}
        styles={styles}
      />

      {ShepherdContent._addShepherdText(descriptionId, step, styles)}

      {ShepherdContent._addShepherdFooter(classPrefix, step, styles)}
    </div>;
  }

  static _addShepherdText(descriptionId, step, styles) {
    if (!isUndefined(step.options.text)) {
      return <ShepherdText
        descriptionId={descriptionId}
        step={step}
        styles={styles}
      />;
    }

    return null;
  }

  static _addShepherdFooter(classPrefix, step, styles) {
    if (Array.isArray(step.options.buttons) && step.options.buttons.length) {
      return <ShepherdFooter
        classPrefix={classPrefix}
        step={step}
        styles={styles}
      />;
    }

    return null;
  }
}

