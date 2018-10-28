import wheelInit from './wheel/';
import initShowdown from './showdown/';
import '../styles/index.scss';

window.onload = () => {
  initShowdown();
  wheelInit();
}
