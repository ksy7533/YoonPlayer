class BaseComponent {
  constructor(params) {
    this.wrapperPlayer = params.wrapperPlayer; // Player wrapper element
    this.wrapper = null; // 렌더링된 wrapper element
  }

  get wrapperElement() {
    return this.wrapper;
  }

  set wrapperElement(element) {
    this.wrapper = element;
  }

  /**
   * abstract method
   */
  _init() {}

  /**
   * abstract method
   */
  _render() {}
}

export default BaseComponent;