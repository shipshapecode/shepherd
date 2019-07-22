import preact from 'preact';
import ShepherdButton from './shepherd-button.jsx';

const { Component } = preact;

export default class ShepherdFooter extends Component {
  render(props) {
    const { classPrefix, options, styles } = props;
    return <footer className={styles.footer.trim()}>
      {this._addButtons(classPrefix, options, styles)}
    </footer>;
  }

  _addButtons(classPrefix, options, styles) {
    if (options.buttons) {
      return options.buttons.map((config) => {
        return <ShepherdButton classPrefix={classPrefix} config={config} styles={styles}/>;
      });
    }

    return null;
  }
}
