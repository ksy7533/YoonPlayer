import '../css/base.scss';
import {throttle} from './util';

// dom
const $video = document.querySelector('video');
const $controller = document.querySelector('#controller');
const $barTrack = document.querySelector('#bar-track');
const $wrapBar = document.querySelector('#wrap-bar');
const $playBar = document.querySelector('#play-bar');
const $thumbBar = document.querySelector('#thumb-bar');
const $loadedBar = document.querySelector('#loaded-bar');
const $trackPoint = document.querySelector('#track-point');
// variable
let isSeeking = false; // track bar 탐색중인가
// options
$video.controls = true; // controller 노출

// event init
const initEvent = () => {
  $controller.addEventListener('click', function(e) {
    const eventTarget = e.target;
    switch (eventTarget.id) {
      case 'btn-play':
        handleEvent.play();
        break;
      case 'btn-stop':
        handleEvent.stop();
        break;
      case 'btn-pause':
        handleEvent.pause();
        break;
      case 'btn-volume-down':
        handleEvent.volumeDown();
        break;
      case 'btn-volume-up':
        handleEvent.volumeUp();
        break;
      case 'btn-mute':
        handleEvent.volumeMute();
        break;
      case 'btn-full-screen':
        handleEvent.fullscreen();
        break;
      default:
        break;
    }
  });

  $video.addEventListener('loadeddata', (e) => {
    renderLoadedBar(setPercentOfLoading(0));
  });

  $video.addEventListener('progress', () => {
    
    let bufferIndex = 0;
    const currentTime = $video.currentTime;
    const buffered = $video.buffered;
    const bufferLength = buffered.length;
    console.log(bufferLength)
    if(bufferLength === 0) return;
    for(let i = 0; i < bufferLength - 1; i++) {
      if(!(buffered.start(bufferIndex) <= currentTime && buffered.end(bufferIndex) >= currentTime)) {
        bufferIndex++;
      }
    }
    renderLoadedBar(setPercentOfLoading(bufferIndex));
  });

  $video.addEventListener('durationchange', () => {
    renderCurrentTime();
    renderTotalTime();
  });

  $video.addEventListener('timeupdate', function (){
    renderTrackPlayBar();
    renderCurrentTime();
  });

  $wrapBar.addEventListener('mouseleave', function(e) {
    renderThumbBar(0);
  });

  $wrapBar.addEventListener('mousemove', throttle(function(e) {
    if(isSeeking) { // 탐색중일 떄는 thumbBar가 렌더링 되지 않는다.
      renderThumbBar(0);
      return;
    }
    const percent = calculatePecentOfPointOffsetX(e);
    renderThumbBar(percent);
  }, 10));

  $wrapBar.addEventListener('mousedown', function(e) {
    e.stopPropagation();
    if(isSeeking) return;
    isSeeking = true;
    calculateCurrentTime(e);
    renderTrackPlayBar();
    document.addEventListener('mousemove', handlePointMoveEvent);
  });

  document.addEventListener('mouseup', function(e) {
    e.stopPropagation();
    if(!isSeeking) return;
    isSeeking = false;
    document.removeEventListener('mousemove', handlePointMoveEvent);
  });
};

const handlePointMoveEvent = (e) => {
  if(!isSeeking) return;
  calculateCurrentTime(e);
  renderTrackPlayBar();
}

// event handler
const handleEvent = {
  play() {
    $video.play();
  },

  pause() {
    $video.pause();
  },

  stop() {
    $video.pause();
    $video.currentTime = 0;
  },

  volumeUp() {
    if($video.volume === 1) return;
    $video.volume = ($video.volume + 0.2).toFixed(1);
  },

  volumeDown() {
    if($video.volume === 0) return;
    $video.volume = ($video.volume - 0.2).toFixed(1);
  },

  volumeMute() {
    $video.muted = !$video.muted;
  },

  fullscreen() {
    if ($video.requestFullscreen) {
      $video.requestFullscreen();
    } else if ($video.mozRequestFullScreen) { /* Firefox */
      $video.mozRequestFullScreen();
    } else if ($video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      $video.webkitRequestFullscreen();
    } else if ($video.msRequestFullscreen) { /* IE/Edge */
      $video.msRequestFullscreen();
    }
  }
};

/* 값 계산 */
// currentTime 계산하기
const calculateCurrentTime = (e) => {
  const percent = calculatePecentOfPointOffsetX(e);
  const duration = $video.duration;
  const currentTime = duration * percent;
  $video.currentTime = currentTime;
};

/* wrapBar에서 마우스 이벤트가 발생하는 위치를 pecent로 계산 */
const calculatePecentOfPointOffsetX = (e) => {
  const wrapBarWidth = $wrapBar.getBoundingClientRect().width;
  const wrapBarPositionX = $wrapBar.getBoundingClientRect().x;
  const pageX = e.pageX;
  let pointOffsetX = pageX - wrapBarPositionX;
  if(wrapBarWidth < pointOffsetX) {
    pointOffsetX = wrapBarWidth;
  } else if(0 > pointOffsetX) {
    pointOffsetX = 0;
  }
  return pointOffsetX / wrapBarWidth;
};

const setPlayTimeFormat = (time) => {
  return Math.floor(time);
}

const setPercentOfLoading = (bufferIndex) => {
  return 100 * ($video.buffered.end(bufferIndex) / $video.duration);
};

const setPosition = () => {
  const currentTime = $video.currentTime;
  const duration = $video.duration;
  return 100 * (currentTime / duration);
};

/* 렌더 */
// track-bar play-bar 렌더링
const renderTrackPlayBar = () => {  
  $playBar.style.width = setPosition() + '%';
  $trackPoint.style.left = setPosition() + '%';
};

const renderThumbBar = (percent) => {
  $thumbBar.style.width = (100 * percent)+ '%';
};

const renderLoadedBar = (percentOfLoading) => {
  $loadedBar.style.width = percentOfLoading + '%';
};

const renderCurrentTime = () => {
  const $currentTime = document.querySelector('#current-time');
  $currentTime.innerHTML = setPlayTimeFormat($video.currentTime);
};

const renderTotalTime = () => {
  const $totalTime = document.querySelector('#total-time');
  $totalTime.innerHTML = setPlayTimeFormat($video.duration);
};

initEvent();






// $video.addEventListener('loadstart', () => {
//   console.log('loadstart');
// });

// $video.addEventListener('durationchange', () => {
//   console.log('durationchange');
// });

// $video.addEventListener('loadedmetadata', () => {
//   console.log('loadedmetadata');
// });

// $video.addEventListener('loadeddata', () => {
//   console.log('loadeddata');
// });

// $video.addEventListener('progress', () => {
//   console.log('progress');
// });

// $video.addEventListener('canplay', () => {
//   console.log('canplay');
// });

// $video.addEventListener('loacanplaythroughdedmetadata', () => {
//   console.log('canplaythrough');
// });

// $video.addEventListener('timeupdate', () => {
//   console.log('timeupdate');
//   console.dir($video)
// });

