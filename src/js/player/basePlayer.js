import { VideoComponent, ControllerComponent } from '../component';
import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

/**
 * Player 기본 옵션
 */
let default_option = {
  device: 'pc', // 디바이스 기기
  isPoster: false, // poster 노출 여부
};

/**
 * Player 기본 클래스
 */
class BasePlayer {
  constructor(container, option) {
    this.container = container;
    this.option = Object.assign(default_option, option);

    this._init();
  }

  /**
   * class 초기화
   */
  _init() {
    this._renderWrapper();
  }

  /**
   * Player 전체를 감싸는 wrapper 렌더링
   */
  _renderWrapper() {
    const wrapperPlayer = document.createElement('DIV');
    wrapperPlayer.classList.add(`${PLAYER_PREFIX_NAME}-player-wrap`);
    const cloneContainer = this.container.cloneNode(true);
    const parentOfContainer = this.container.parentElement;
    parentOfContainer.removeChild(this.container);
    parentOfContainer.appendChild(wrapperPlayer);

    this._renderBasicComponent({wrapperPlayer, cloneContainer});
  }

  /**
   * Player에서 기본적으로 필요한 콤포넌트 렌더링
   */
  _renderBasicComponent({wrapperPlayer, cloneContainer}) {
    let arrComponent = [];
    arrComponent.push(new VideoComponent({wrapperPlayer, cloneContainer}));
    arrComponent.push(new ControllerComponent({wrapperPlayer}));
    arrComponent.forEach(component => wrapperPlayer.appendChild(component.wrapperElement));
  }

  /**
   * Player에서 사용될 video data array를 받는 함수
   */
  setData(videoList) {
    const videoWrapper = document.querySelector(`.${PLAYER_PREFIX_NAME}-video-wrap`);
    const video = videoWrapper.querySelector('video');
    const elSource = document.createElement('source');
    elSource.setAttribute('src', videoList[0].src);
    elSource.setAttribute('type', videoList[0].type);
    video.appendChild(elSource);
  }
}

export default BasePlayer;