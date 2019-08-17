import preact from 'preact';

const { Component } = preact;

export default class ShepherdHeader extends Component {
  constructor(props) {
    super(props);

    this.step = props.step;

    this.cancelStep = this.cancelStep.bind(this);
  }

  render(props) {
    const { labelId, step, styles } = props;
    const { cancelIcon, title } = step.options;
    return <header className={styles.header.trim()}>
      {this.constructor._addTitle(labelId, styles, title)}
      {this._addCancelLink(cancelIcon, styles)}
    </header>;
  }

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  cancelStep(e) {
    e.preventDefault();
    this.step.cancel();
  }

  static _addTitle(labelId, styles, title) {
    if (title) {
      return <h3
        id={labelId}
        className={styles.title.trim()}
      >
        {title}
      </h3>;
    }

    return null;
  }

  /**
   * If enabled, add the cancel "x" icon
   * @param {object} cancelIcon The options for the cancel icon
   * @param styles
   * @return {null|*}
   * @private
   */
  _addCancelLink(cancelIcon, styles) {
    if (cancelIcon.enabled) {
      return <button
        aria-label={cancelIcon.label ? cancelIcon.label : 'Close Tour'}
        className={styles['cancel-icon'].trim()}
        onClick={this.cancelStep}
        type='button'
      >
        <span aria-hidden='true'>&times;</span>
      </button>;
    }

    return null;
  }
}
