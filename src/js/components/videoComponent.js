import BaseComponent from './baseComponent';

class VideoComponent extends BaseComponent {
  constructor(params) {
    super(params.wrapperPlayer);
    this.container = params.cloneContainer;
  }

  render() {
    const wrapper = super.renderWrapper('video');
    wrapper.appendChild(this.container);
    return wrapper;
  }
}

export default VideoComponent;
