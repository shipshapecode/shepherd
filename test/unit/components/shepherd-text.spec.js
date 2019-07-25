import preact from 'preact';
import ShepherdText from '../../../src/js/components/shepherd-content/shepherd-text';
import { expect } from 'chai';

describe('components/ShepherdText', () => {
  const styles = {
    text: ' shepherd-text'
  };

  it('adds plain text to the content', () => {
    const step = {
      options: {
        text: 'I am some test text.'
      }
    };

    const textComponent = <ShepherdText step={step} styles={styles}/>;
    expect(textComponent).to.include('I am some test text.');
  });

  it('applies HTML element directly to content', () => {
    const step = {
      options: {
        text: '<p>I am some test text.</p>'
      }
    };

    const textComponent = <ShepherdText step={step} styles={styles}/>;
    expect(textComponent).to.include(<p>I am some test text.</p>);
  });

  it('applies the text from a function', () => {
    const step = {
      options: {
        text: () => 'I am some test text.'
      }
    };

    const textComponent = <ShepherdText step={step} styles={styles}/>;
    expect(textComponent).to.include('I am some test text.');
  });
});
