import Vue from 'vue';
import App from './App';
import $ from 'jquery';

Vue.transition('slide', {
  enterClass: 'fadeInLeft',
  leaveClass: 'slideOutLeftBig',
});
Vue.transition('arrowUp', {
  enterClass: 'fadeInDown',
  leaveClass: 'fadeOutUp',
});
Vue.transition('arrowDown', {
  enterClass: 'fadeInUp',
  leaveClass: 'fadeOutDown',
});
Vue.transition('pageClose', {
  enterClass: 'fadeInDownLeft',
  leaveClass: 'fadeOutUpRight',
});
Vue.transition('pageCopy', {
  enterClass: 'fadeInUpLeft',
  leaveClass: 'fadeOutDownRight',
});

Vue.directive('hover', {
  update: function update(value) {
    const self = this;
    const BODY = {
      width: $(window).width(),
      height: $(window).height(),
    };

    const mouseMoveFunc = function mouseMoveFunc(event) {
      const hoverTips = document.querySelector('#ls-hover-tips');
      const eClientX = event.clientX + 15;
      const eClientY = event.clientY + 15;
      if (!hoverTips) {
        $('head').eq(0).append(`
          <style>
            #ls-hover-tips {
              position: absolute;
              z-index: 9999;
              padding: 6px 10px;
              max-width: 150px;
              border-radius: 4px;
              background-color: rgba(0, 0, 0, 0);
              pointer-events: none;
              display: none;
              font-size: 13px;
              color: #fff5ea;
              line-height: 1.5;
              left: ${eClientX}px;
              top: ${eClientY}px;
            }
            #ls-hover-tips p {
              margin: 0;
              color: #fff;
              opacity: 1;
            }
          </style>
        `);
        $('body').append(`
          <div id="ls-hover-tips">
            <p>${value || self.expression}</p>
          </div>
        `);
      } else {
        const hoverTipsBox = hoverTips.getBoundingClientRect();
        const $left = (BODY.width > eClientX + 150) ? eClientX : (eClientX - hoverTipsBox.width);
        hoverTips.style.display = 'block';
        hoverTips.style.left = `${$left}px`;
        hoverTips.style.top = `${eClientY}px`;
        hoverTips.innerHTML = `
          <p>${value || self.expression}</p>
        `;

        const hoverTimeout = function hoverTimeout() {
          hoverTips.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        };

        setTimeout(hoverTimeout, 1);
      }
    };

    const mouseLeaveFunc = function mouseLeaveFunc() {
      const hoverTips = document.querySelector('#ls-hover-tips');
      if (!!hoverTips) {
        hoverTips.parentNode.removeChild(hoverTips);
      }
    };

    this.el.addEventListener('mousemove', mouseMoveFunc, false);
    this.el.addEventListener('mouseleave', mouseLeaveFunc, false);
  },
});

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});
