import preact from 'preact';

const { Component } = preact;

export default class ShepherdModal extends Component {
  render() {
    return <svg
      id='shepherdModalOverlayContainer'
      style='display: block;'
    >
      <defs>
        <mask height='100%' id='shepherdModalMask' width='100%' x='0' y='0'>
          <rect fill='#FFFFFF' height='100%' id='shepherdModalMaskRect' width='100%' x='0' y='0'/>
          <rect fill='#000000' id='shepherdModalMaskOpening'/>
        </mask>
      </defs>
      <rect height='100%' width='100%' x='0' y='0' mask='url(#shepherdModalMask)'/>
    </svg>;
  }
}
