<template>
  <div id="ls-alert" v-show="alert.show">
    <div class="ls-alert-inner" v-show="alert.show">
      <div class="ls-alert-title" :class="theme" v-text="alert.title"></div>
      <div class="ls-alert-content" :class="theme" v-text="alert.message"></div>
      <div class="ls-alert-btns">
        <div class="ls-btn btn-ok" :class="theme" v-text="alert.ok" @click="ok()"></div>
        <div class="ls-btn btn-cancel" v-text="alert.cancel" v-show="alert.cancel!=''" @click="cancel()"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  #ls-alert {
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    width: 100%;
    height: 100%;
    top: 0;
    .ls-alert-inner {
      width: 80%;
      max-width: 300px;
      background-color: #fff;
      -webkit-box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
      -moz-box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
      box-shadow: 0 0 10px 5px rgba(0,0,0,0.1);
      .ls-alert-title {
        line-height: 40px;
        padding-left: 10px;
        color: #fff;
        &.alert-danger {
          background-color: #c12e2a;
        }
        &.alert-success {
          background-color: #419641;
        }
        &.alert-warning {
          background-color: #eb9316;
        }
        &.alert-info {
          background-color: #2aabd2;
        }
        &.alert-primary {
          background-color: #265a88;
        }
      }
      .ls-alert-content {
        line-height: 24px;
        padding: 15px 10px;
        font-size: 15px;
        text-align: center;
        &.alert-danger {
          color: #c12e2a;
        }
        &.alert-success {
          color: #419641;
        }
        &.alert-warning {
          color: #eb9316;
        }
        &.alert-info {
          color: #2aabd2;
        }
        &.alert-primary {
          color: #265a88;
        }
      }
      .ls-alert-btns {
        padding: 10px 10px 10px 10px;
        text-align: center;
        .ls-btn {
          padding: 6px 16px;
          margin: 0 auto;
          display: inline-block;
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          &.alert-danger {
            background-color: #c12e2a;
            &:hover {
              background-color: darken(#c12e2a, 10%);
            }
          }
          &.alert-success {
            background-color: #419641;
            &:hover {
              background-color: darken(#419641, 10%);
            }
          }
          &.alert-warning {
            background-color: #eb9316;
            &:hover {
              background-color: darken(#eb9316, 10%);
            }
          }
          &.alert-info {
            background-color: #2aabd2;
            &:hover {
              background-color: darken(#2aabd2, 10%);
            }
          }
          &.alert-primary {
            background-color: #265a88;
            &:hover {
              background-color: darken(#265a88, 10%);
            }
          }
          &.btn-cancel {
            background-color: gray;
            &:hover {
              background-color: darken(gray, 10%);
            }
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        theme: 'alert-info',
        callback: '',
        cancelCallback: '',
      };
    },
    computed: {
      alert: function alert() {
        return this.$parent.alert;
      },
    },
    components: {
    },
    methods: {
      hideAlert: function hideAlert() {
        this.$parent.alert.show = false;
      },
      ok: function ok() {
        let args = [];
        this.$parent.alert.show = false;
        let callback = this.callback;
        if (callback !== '') {
          if (typeof callback === 'string') {
            if (callback.indexOf('(') > -1) {
              args = callback.substring(callback.indexOf('(') + 1, callback.indexOf(')')).split(',');
              callback = callback.substring(0, callback.indexOf('('));
              window[callback].call(this, args);
            } else {
              window[callback].call(this);
            }
          } else if (typeof callback === 'function') {
            callback();
          }
        }
      },
      cancel: function cancel() {
        this.$parent.alert.show = false;
        let args = [];
        let callback = this.cancelCallback;
        if (callback !== '') {
          if (typeof callback === 'string') {
            if (callback.indexOf('(') > -1) {
              args = callback.substring(callback.indexOf('(') + 1, callback.indexOf(')')).split(',');
              callback = callback.substring(0, callback.indexOf('('));
              window[callback].call(this, args);
            } else {
              window[callback].call(this);
            }
          } else if (typeof callback === 'function') {
            callback();
          }
        }
      },
    },
    events: {
      'show-alert': function showAlert(opts, callback, cancelCallback) {
        const type = opts.type || 0;
        switch (type) {
          case 0:
          case 'success':
            this.theme = 'alert-success';
            break;
          case 1:
          case 'error':
            this.theme = 'alert-danger';
            break;
          case 2:
          case 'warning':
            this.theme = 'alert-warning';
            break;
          case 3:
          case 'info':
            this.theme = 'alert-info';
            break;
          case 4:
          case 'primary':
            this.theme = 'alert-primary';
            break;
          default :
            this.theme = 'alert-danger';
            break;
        }
        this.$parent.alert.message = opts.content;
        this.$parent.alert.show = true;
        this.$parent.alert.title = opts.title || '提示';
        this.$parent.alert.ok = opts.ok || '确认';
        this.$parent.alert.cancel = opts.cancel || '';
        this.callback = callback || '';
        this.cancelCallback = cancelCallback || '';
      },
      'hide-alert': function hideAlert() {
        this.$parent.alert.show = false;
      },
    },
  };
</script>
