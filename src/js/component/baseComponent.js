class BaseComponent {
  constructor(params) {
    this.wrapperPlayer = params.wrapperPlayer; // Player wrapper element
  }

  /**
   * abstract method
   */
  render() {}
}

export default BaseComponent;
