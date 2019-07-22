import preact from 'preact';

const { Component, render } = preact;

class ShepherdHeader extends Component {
  constructor(props) {
    super(props);

    this.step = props.step;

    this.cancelStep = this.cancelStep.bind(this);
  }

  render(props) {
    const { labelId, options, styles } = props;
    const { showCancelLink, title } = options;
    return <header className={styles.header.trim()}>
      {this.constructor._addTitle(title, labelId, styles)}
      {this._addCancelLink(showCancelLink, styles)}
    </header>;
  }

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  cancelStep(e) {
    e.preventDefault();
    this.step.cancel();
  }

  static _addTitle(title, labelId, styles) {
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

  _addCancelLink(showCancelLink, styles) {
    if (showCancelLink) {
      return <a
        href=''
        className={styles['cancel-link'].trim()}
        onClick={this.cancelStep}
      />;
    }

    return null;
  }
}

export default function createHeader(content, options, styles, labelId, step) {
  return render(
    <ShepherdHeader labelId={labelId} options={options} step={step} styles={styles}/>,
    content
  );
}
