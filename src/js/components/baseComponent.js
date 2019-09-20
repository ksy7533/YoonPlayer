import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

class BaseComponent {
  /**
   * component들의 기본 클래스
   * @param {HTMLVideoElement} video video 엘리멘트
   */
  constructor(video) {
    this.video = video;
  }

  /**
   * 해당 컴포넌트를 감싸주는 wrapper를 렌더링한다.
   * @param {String} wrapperName wrapper이름
   */
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
