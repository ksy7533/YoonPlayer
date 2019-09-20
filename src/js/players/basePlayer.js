import { VideoComponent, ControllerComponent } from '../components';
import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

/**
 * Player 기본 옵션
 */
const defaultOption = {
  device: 'pc', // 디바이스 기기
  isPoster: false, // poster 노출 여부
};

class BasePlayer {
  /**
   * Player 기본 클래스
   * @param {HTMLVideoElement} container video 엘리멘트
   * @param {Object} option player option 값
   */
  constructor(container, option) {
    this.video = container; // 현재 재생중인 비디오 객체
    this.option = Object.assign(defaultOption, option);

    this.videoComponent = null; // video component 객체
    this.controllerComponent = null; // controller component 객체
    this.arrComponent = []; // component 객체의 배열
    this._init();
  }

  /**
   * class 초기화
   */
  _init() {
    this._registerComponent();
    this._renderWrapper();
  }

  /**
   * 각 Component 객체를 생성하여 배열에 담아둔다
   */
  _registerComponent() {
    const { video } = this;
    this.videoComponent = new VideoComponent({ video });
    this.controllerComponent = new ControllerComponent({ video });
    this.arrComponent.push(this.videoComponent);
    this.arrComponent.push(this.controllerComponent);
  }

  /**
   * Player 전체를 감싸는 wrapper 렌더링
   */
  _renderWrapper() {
    const wrapperPlayer = document.createElement('DIV');
    wrapperPlayer.classList.add(`${PLAYER_PREFIX_NAME}-player-wrap`);
    const parentOfContainer = this.video.parentElement;
    parentOfContainer.removeChild(this.video);
    parentOfContainer.appendChild(wrapperPlayer);
    this._renderBasicComponent({ wrapperPlayer });
  }

  /**
   * Player에서 기본적으로 필요한 콤포넌트 렌더링
   * @param {Object} param.wrapperPlayer player를 감싸주는 wrapper
   */
  _renderBasicComponent({ wrapperPlayer }) {
    this.arrComponent.forEach((component) => wrapperPlayer.appendChild(component.render()));
  }

  /**
   * Player에서 사용될 video data array를 받는 함수
   * @param {Array} videoList video data array
   */
  setData(videoList) {
    this.video.setAttribute('src', videoList[0].src);
    this.video.setAttribute('type', videoList[0].type);
  }
}

export default BasePlayer;
