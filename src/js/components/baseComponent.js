import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

class BaseComponent {
  constructor(params) {
    this.wrapperPlayer = params.wrapperPlayer; // Player wrapper element
  }

  renderWrapper(wrapperName) {
    const wrapper = document.createElement('DIV');
    wrapper.classList.add(`${PLAYER_PREFIX_NAME}-${wrapperName}-wrap`);
    return wrapper;
  }

  /**
   * abstract method
   */
  render() {}
}

export default BaseComponent;
