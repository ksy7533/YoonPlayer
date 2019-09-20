import BasePlayer from './basePlayer';
/**
 * 기본 Player
 */

class DefaultPlayer extends BasePlayer {
  /**
   * 기본 플레이어 클래스
   * @param {HTMLVideoElement} container video 엘리멘트
   * @param {Object} option player option 값
   */
  constructor(container, option) {
    super(container, option);
  }
}

export default (container, option) => new DefaultPlayer(container, option);
