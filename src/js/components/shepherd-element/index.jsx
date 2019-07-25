import preact from 'preact';
import ShepherdContent from '../shepherd-content';
import { isUndefined } from '../../utils/type-check';

const { Component } = preact;

const KEY_TAB = 9;
const KEY_ESC = 27;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export default class ShepherdElement extends Component {
  constructor(props) {
    super(props);

    this.step = props.step;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // Get all elements that are focusable
    const focusableElements = this.element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    const [firstFocusableElement] = focusableElements;
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    this.focusableElements = focusableElements;
    this.firstFocusableElement = firstFocusableElement;
    this.lastFocusableElement = lastFocusableElement;
  }

  render(props) {
    const { classes, classPrefix, descriptionId, labelId, step, styles } = props;
    const dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };

    return <div
      aria-describedby={!isUndefined(step.options.text) ? descriptionId : null}
      aria-labeledby={step.options.title ? labelId : null}
      className={classes + styles.element}
      {...dataStepId}
      onKeyDown={this.handleKeyDown}
      ref={(c) => this.element = c}
      role='dialog'
      tabindex='0'
    >
      <ShepherdContent
        classPrefix={classPrefix}
        descriptionId={descriptionId}
        labelId={labelId}
        step={step}
        styles={styles}
      />
    </div>;
  }

  /**
   * Setup keydown events to allow closing the modal with ESC
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   *
   * @private
   */
  handleKeyDown(e) {
    switch (e.keyCode) {
      case KEY_TAB:
        if (this.focusableElements.length === 1) {
          e.preventDefault();
          break;
        }
        // Backward tab
        if (e.shiftKey) {
          if (document.activeElement === this.firstFocusableElement) {
            e.preventDefault();
            this.lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === this.lastFocusableElement) {
            e.preventDefault();
            this.firstFocusableElement.focus();
          }
        }
        break;
      case KEY_ESC:
        this.step.cancel();
        break;
      case LEFT_ARROW:
        this.step.tour.back();
        break;
      case RIGHT_ARROW:
        this.step.tour.next();
        break;
      default:
        break;
    }
  }
}
