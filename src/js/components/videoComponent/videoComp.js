import BaseComponent from '../baseComponent';

class VideoComponent extends BaseComponent {
  /**
   * 비디오 콤포넌트
   * @param {HTMLVideoElement} params.video 비디오 엘리멘트
   */
  constructor(params) {
    super(params.video);
  }

  /**
   * 비디오 콤포넌트 렌더
   */
  render() {
    const wrapper = super.renderWrapper('video');
    wrapper.appendChild(this.video);
    return wrapper;
  }
}

export default VideoComponent;
