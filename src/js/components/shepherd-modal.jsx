import preact from 'preact';

const { Component } = preact;

export default class ShepherdModal extends Component {
  constructor(props) {
    super(props);

    this.closeModalOpening = this.closeModalOpening.bind(this);
    this.positionModalOpening = this.positionModalOpening.bind(this);
    this.closeModalOpening();
  }

  render(props, state) {
    return <svg
      id='shepherdModalOverlayContainer'
      style='display: block;'
    >
      <defs>
        <mask height='100%' id='shepherdModalMask' width='100%' x='0' y='0'>
          <rect
            fill='#FFFFFF'
            height='100%'
            id='shepherdModalMaskRect'
            width='100%'
            x='0'
            y='0'
          />
          <rect
            fill='#000000'
            id='shepherdModalMaskOpening'
            height={state.openingProperties.height}
            x={state.openingProperties.x}
            y={state.openingProperties.y}
            width={state.openingProperties.width}
          />
        </mask>
      </defs>
      <rect height='100%' width='100%' x='0' y='0' mask='url(#shepherdModalMask)'/>
    </svg>;
  }

  closeModalOpening() {
    this.setState({
      openingProperties: {
        height: 0,
        x: 0,
        y: 0,
        width: 0
      }
    });
  }

  /**
   * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
   * @param {HTMLElement} targetElement The element the opening will expose
   * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
   */
  positionModalOpening(targetElement, modalOverlayOpeningPadding = 0) {
    if (targetElement.getBoundingClientRect) {
      const { x, y, width, height, left, top } = targetElement.getBoundingClientRect();

      // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
      this.setState({
        openingProperties: {
          x: (x || left) - modalOverlayOpeningPadding,
          y: (y || top) - modalOverlayOpeningPadding,
          width: (width + (modalOverlayOpeningPadding * 2)),
          height: (height + (modalOverlayOpeningPadding * 2))
        }
      });
    }
  }
}
