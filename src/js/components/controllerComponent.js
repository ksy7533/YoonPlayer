import BaseComponent from './baseComponent';

class ControllerComponent extends BaseComponent {
  constructor(params) {
    super(params.wrapperPlayer);
  }

  render() {
    const wrapper = super.renderWrapper('controller');
    return wrapper;
  }
}

export default ControllerComponent;
