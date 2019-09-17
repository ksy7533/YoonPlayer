import { VideoComponent } from '../component';
import Const from '../const';

let default_option = {
  device: 'pc', // 디바이스 기기
  isPoster: false, // poster 노출 여부
};

class PlayerBase {
  constructor(container, option) {
    this.container = container;
    this.option = Object.assign(default_option, option);

    this._init();
  }

  _init() {
    this._render();
  }

  _render() {
    const wrapperPlayer = document.createElement('DIV');
    wrapperPlayer.classList.add(`${Const.PLAYER_PREFIX_NAME}-player-wrap`);
    const cloneContainer = this.container.cloneNode(true);
    const parentOfContainer = this.container.parentElement;
    parentOfContainer.removeChild(this.container);
    parentOfContainer.appendChild(wrapperPlayer);

    const videoComponent = new VideoComponent(wrapperPlayer, cloneContainer);
    wrapperPlayer.appendChild(videoComponent.wrapper);
  }

  setData() { // 노출시킬 함수
    console.log('setData');
  }
}

export default PlayerBase;