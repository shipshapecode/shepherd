import preact from 'preact';
import ShepherdContent from './shepherd-content.jsx';
import { isUndefined } from '../utils/type-check';

const { Component } = preact;

export default class ShepherdElement extends Component {
  render(props) {
    const { classes, classPrefix, descriptionId, labelId, options, step, styles } = props;
    const dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };

    return <div
      aria-describedby={!isUndefined(options.text) ? descriptionId : null}
      aria-labeledby={options.title ? labelId : null}
      className={classes}
      {...dataStepId}
      role='dialog'
      tabindex='0'
    >
      <ShepherdContent
        classPrefix={classPrefix}
        descriptionId={descriptionId}
        labelId={labelId}
        options={options}
        step={step}
        styles={styles}
      />
    </div>;
  }
}
