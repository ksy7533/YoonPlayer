import BaseComponent from './baseComponent';
import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

class ControllerComponent extends BaseComponent {
  constructor(params) {
    super(params.wrapperPlayer);

    this._init();
  }

  _init() {
    this.wrapperElement = this._render();
  }

  _render() {
    const wrapperVideo = document.createElement('DIV');
    wrapperVideo.classList.add(`${PLAYER_PREFIX_NAME}-controller-wrap`);
    return wrapperVideo;
  }
}

export default ControllerComponent;

