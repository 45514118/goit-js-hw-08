import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const currentTime = JSON.parse(localStorage.getItem('videoplayer-current-time')) || 0;
player.setCurrentTime(currentTime);

const onPlay = throttle(() => {
  player.getCurrentTime().then(sec => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(sec));
  });
}, 1000);

player.on('timeupdate', onPlay);
