import preact from 'preact';
import ShepherdFooter from './shepherd-footer.jsx';
import ShepherdHeader from './shepherd-header.jsx';
import ShepherdText from './shepherd-text.jsx';
import { isUndefined } from '../utils/type-check';

const { Component } = preact;

export default class ShepherdContent extends Component {
  render(props) {
    const { classPrefix, descriptionId, labelId, options, step, styles } = props;

    return <div
      className={styles.content.trim()}
    >
      <ShepherdHeader
        labelId={labelId}
        options={options}
        step={step}
        styles={styles}
      />

      {this._addShepherdText(descriptionId, options, step, styles)}

      {this._addShepherdFooter(classPrefix, options, styles)}
    </div>;
  }

  _addShepherdText(descriptionId, options, step, styles) {
    if (!isUndefined(options.text)) {
      return <ShepherdText
        descriptionId={descriptionId}
        options={options}
        step={step}
        styles={styles}
      />;
    }

    return null;
  }

  _addShepherdFooter(classPrefix, options, styles) {
    if (Array.isArray(options.buttons) && options.buttons.length) {
      return <ShepherdFooter
        classPrefix={classPrefix}
        options={options}
        styles={styles}
      />;
    }

    return null;
  }
}

