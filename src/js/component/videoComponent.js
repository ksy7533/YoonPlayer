import Const from '../const';

class VideoComponent {
  constructor(wrapperPlayer, cloneContainer) {
    this.wrapperPlayer = wrapperPlayer;
    this.container = cloneContainer;

    this._init();
  }

  get wrapperVideo() {
    return this.wrapper;
  }

  set wrapperVideo(wrapperVideo) {
    this.wrapper = wrapperVideo;
  }

  _init() {
    this.wrapperVideo = this._render();
  }

  _render() {
    const wrapperVideo = document.createElement('DIV');
    wrapperVideo.classList.add(`${Const.PLAYER_PREFIX_NAME}-video-wrap`);
    wrapperVideo.appendChild(this.container);
    return wrapperVideo;
  }
}

export default VideoComponent;

