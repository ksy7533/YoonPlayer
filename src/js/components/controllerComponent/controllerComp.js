import BaseComponent from '../baseComponent';
import controllerTemplate from './controllerTemplate';

class ControllerComponent extends BaseComponent {
  /**
   * 컨트롤러 콤포넌트
   * @param {HTMLVideoElement} params.video 비디오 엘리멘트
   */
  constructor(params) {
    super(params.video);
  }

  /**
   * 컨트롤러 콤포넌트 렌더
   */
  render() {
    this.wrapper = super.renderWrapper('controller');
    this.wrapper.innerHTML = controllerTemplate;
    this._attachEvent();
    return this.wrapper;
  }

  /**
   * 콤포넌트 이벤트 바인드
   */
  _attachEvent() {
    this.wrapper.addEventListener('click', (event) => {
      const { target } = event;
      switch (target.id) {
        case 'btn-play':
          this.handlePlayButton();
          break;
        default:
          break;
      }
    });
  }

  /**
   * playButton 핸들러
   */
  handlePlayButton() {
    this.video.play();
  }
}

export default ControllerComponent;
