import BaseComponent from './baseComponent';
import constName from '../const';

const {
  PLAYER_PREFIX_NAME,
} = constName;

class VideoComponent extends BaseComponent {
  constructor(params) {
    super(params.wrapperPlayer);
    this.container = params.cloneContainer;
  }

  render() {
    const wrapperVideo = document.createElement('DIV');
    wrapperVideo.classList.add(`${PLAYER_PREFIX_NAME}-video-wrap`);
    wrapperVideo.appendChild(this.container);
    return wrapperVideo;
  }
}

export default VideoComponent;

