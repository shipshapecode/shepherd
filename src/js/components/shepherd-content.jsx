import preact from 'preact';
import ShepherdFooter from './shepherd-footer.jsx';
import ShepherdHeader from './shepherd-header.jsx';
import ShepherdText from './shepherd-text.jsx';
import { isUndefined } from '../utils/type-check';

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

      {this._addShepherdText(descriptionId, step, styles)}

      {this._addShepherdFooter(classPrefix, step, styles)}
    </div>;
  }

  _addShepherdText(descriptionId, step, styles) {
    if (!isUndefined(step.options.text)) {
      return <ShepherdText
        descriptionId={descriptionId}
        step={step}
        styles={styles}
      />;
    }

    return null;
  }

  _addShepherdFooter(classPrefix, step, styles) {
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

