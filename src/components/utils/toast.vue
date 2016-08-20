<template>
  <div id="ls-toast-container">
    <div class="ls-toast-container-inner"></div>
  </div>
</template>
<style lang="scss">
  #ls-toast-container {
    position: fixed;
    background-color: transparent;
    z-index: 999999;
    width: 400px;
    height: 100%;
    /*max-height: 60%;*/
    padding: 0;
    top: 0;
    right: 16px;
    pointer-events: none;
    .ls-toast-container-inner {
      height: auto;
      min-height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .ls-toast {
      position: relative;
      color: #fff;
      display: none;
      margin: 16px 0 0 0;
      border-radius: 4px;
      opacity: 0.93;
      width: 280px;
      float: right;
      &.toast-danger {
        background-color: #c12e2a;
        background: -webkit-linear-gradient(top, lighten(#c12e2a, 30%), #c12e2a);
        background: -o-linear-gradient(top, lighten(#c12e2a, 30%), #c12e2a);
        background: linear-gradient(top, lighten(#c12e2a, 30%), #c12e2a);
      }
      &.toast-success {
        background: #419641;
        background: -webkit-linear-gradient(top, lighten(#419641, 30%), #419641);
        background: -o-linear-gradient(top, lighten(#419641, 30%), #419641);
        background: linear-gradient(top, lighten(#419641, 30%), #419641);
      }
      &.toast-warning {
        background-color: #eb9316;
        background: -webkit-linear-gradient(top, lighten(#eb9316, 30%), #eb9316);
        background: -o-linear-gradient(top, lighten(#eb9316, 30%), #eb9316);
        background: linear-gradient(top, lighten(#eb9316, 30%), #eb9316);
      }
      &.toast-info {
        background-color: #2aabd2;
        background: -webkit-linear-gradient(top, lighten(#2aabd2, 30%), #2aabd2);
        background: -o-linear-gradient(top, lighten(#2aabd2, 30%), #2aabd2);
        background: linear-gradient(top, lighten(#2aabd2, 30%), #2aabd2);
      }
      .ls-toast-inner {
        height: auto;
        padding: 26px 16px 26px 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        pointer-events: auto;
        .ls-toast-icon {
          width: 32px;
          height: 32px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          display: inline-block;
        }
        .ls-toast-text {
          width: 208px;
          display: inline-block;
          margin-left: 8px;
          position: relative;
          text-align: justify;
          line-height: 1.2;
        }
        .ls-toast-close {
          position: absolute;
          right: 8px;
          top: 4px;
          font-size: 20px;
          cursor: pointer;
        }
      }
    }
  }
</style>
<script>
  import $ from 'jquery';
  export default {
    data() {
      return {
        theme: 'toast-info',
        callback: '',
        cancelCallback: '',
        settings: {
          animation: 'fadeIn',    // 入场动画
          duration: 3000,           // Toast显示持续时间
          content: '',              // Toast内容
          type: 'info',             // Toast类型
          sticky: false,            // 是否自动隐藏
          position: 'top-right',    // Toast显示位置
        },
      };
    },
    methods: {
      getUID: function getUID(prefix) {
        const pre = prefix || '';
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        const resultFunc = function resultFunc() {
          return `${pre}${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
        };
        return (resultFunc)();
      },
      animateIn: function animateIn(id, opts) {
        const self = this;
        let animationTimeout = null;
        let animationOutTimeout = null;
        const toast = document.querySelector(`#${id}`);
        const animationFunc = function animationFunc() {
          toast.style.display = 'block';
          if (!toast.classList.contains(opts.animation)) {
            toast.classList.add(opts.animation);
          }
          clearTimeout(animationTimeout);
        };
        animationTimeout = setTimeout(animationFunc, 20);
        if (!opts.sticky && opts.duration) {
          const animationOutFunc = function animationOutFunc() {
            self.animateOut(id, opts);
            clearTimeout(animationOutTimeout);
          };
          animationOutTimeout = setTimeout(animationOutFunc, opts.duration);
        }
      },
      animateOut: function animateOut(id, opts) {
        const $toast = $(`#${id}`);
        const $toastInner = $toast.find('.ls-toast-inner').eq(0);
        $toast.removeClass(opts.animation);
        const toastRemove = function toastRemove() {
          $toast.remove();
        };
        const toastCallback = function toastCallback() {
          $toast.animate({
            height: '0px',
            margin: '0px',
            opacity: 0,
          }, 'slow', toastRemove);
        };
        $toastInner.animate({
          opacity: 0,
        }, 400, toastCallback);
      },
      createToast: function createToast(opts) {
        const self = this;
        const type = opts.type || 0;
        switch (type) {
          case 0:
          case 'success':
            this.theme = 'toast-success';
            break;
          case 1:
          case 'error':
            this.theme = 'toast-danger';
            break;
          case 2:
          case 'warning':
            this.theme = 'toast-warning';
            break;
          case 3:
          case 'info':
            this.theme = 'toast-info';
            break;
          default :
            this.theme = 'toast-info';
            break;
        }

        const UID = this.getUID('toast-');

        let toastContainer = document.querySelector('#ls-toast-container');
        let toastContainerInner = null;
        if (!toastContainer) {
          toastContainer = document.createElement('div');
          toastContainer.id = 'ls-toast-container';
          document.body.appendChild(toastContainer);

          toastContainerInner = document.createElement('div');
          toastContainerInner.className = 'ls-toast-container-inner';
          toastContainer.appendChild(toastContainerInner);
        } else {
          toastContainerInner = toastContainer.querySelector('.ls-toast-container-inner');
        }
        const toast = document.createElement('div');
        toast.id = UID;
        toast.className = `ls-toast ${this.theme} animated-2`;
        toastContainerInner.appendChild(toast);

        const toastInner = document.createElement('div');
        toastInner.className = 'ls-toast-inner';
        toast.appendChild(toastInner);

        const iconUrl = `static/img/${opts.type}.png`;
        const toastIcon = document.createElement('div');
        toastIcon.className = 'ls-toast-icon';
        toastIcon.style.backgroundImage = `url('${iconUrl}')`;
        toastInner.appendChild(toastIcon);

        const toastText = document.createElement('p');
        toastText.className = 'ls-toast-text';
        toastText.innerHTML = opts.content;
        toastInner.appendChild(toastText);

        const toastClose = document.createElement('div');
        toastClose.className = 'ls-toast-close';
        toastClose.innerHTML = '&times;';
        toastInner.appendChild(toastClose);

        const hideToast = function hideToast() {
          self.animateOut(UID, opts);
        };
        toastClose.addEventListener('click', hideToast, false);
        let showToastTimeout = null;
        const showToastFunc = function showToastFunc() {
          self.animateIn(UID, opts);
          clearTimeout(showToastTimeout);
        };
        showToastTimeout = setTimeout(showToastFunc, 100);

        return toast;
      },
    },
    events: {
      'show-toast': function showToast(opts) {
        this.createToast(opts);
      },
    },
  };
</script>
