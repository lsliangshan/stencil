import Vue from 'vue';
import App from './App';

Vue.transition('slide', {
  enterClass: 'fadeInLeft',
  leaveClass: 'slideOutLeftBig',
});
/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
