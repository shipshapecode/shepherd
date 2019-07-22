import preact from 'preact';
import ShepherdButton from './shepherd-button.jsx';

const { Component, render } = preact;

class ShepherdFooter extends Component {
  render(props) {
    const { classPrefix, options, styles } = props;
    return <footer className={styles.footer.trim()}>
      {this._addButtons(classPrefix, options, styles)}
    </footer>;
  }

  _addButtons(classPrefix, options, styles) {
    return options.buttons.map((config) => {
      return <ShepherdButton classPrefix={classPrefix} config={config} styles={styles}/>;
    });
  }
}

export default function createFooter(content, classPrefix, options, styles) {
  return render(
    <ShepherdFooter classPrefix={classPrefix} options={options} styles={styles}/>,
    content
  );
}
