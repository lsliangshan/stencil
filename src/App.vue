<template>
  <div id="app">
    <editor-header></editor-header>
    <editor-pager></editor-pager>
    <editor-config></editor-config>
    <editor></editor>
    <com-form></com-form>
  </div>
  <alert></alert>
  <toast></toast>
</template>

<script>
import EditorHeader from './components/header.vue';
import EditorPager from './components/pager.vue';
import EditorConfig from './components/config.vue';
import Editor from './components/editor.vue';

import Alert from './components/utils/alert.vue';
import Toast from './components/utils/toast.vue';

import ComForm from './components/system/comForm.vue';

export default {
  components: {
    EditorHeader,
    EditorPager,
    EditorConfig,
    Editor,
    ComForm,
    Alert,
    Toast,
  },
  data() {
    return {
      alert: {
        message: '这是内容',      // 弹框内容
        title: '提示',            // 弹框标题
        show: false,            // 是否显示弹框
        ok: '确认',             // 确认按钮上的文字
        cancel: '',             // 取消按钮上的文字
      },
      components: [
//        {
//          title: '互动',
//          icon: 'thumbs-up',
//          type: 'com-support',
//        },
      ],   // 组件库里的组件
      coms: {},
      pagers: {
        active: 0,
      },
      sTemplates: {   // 模板数据
        pages: [
          {
            bg: {
              type: 'image',   // color: 背景色, image: 背景图
              value: 'static/img/bg.jpg',  // 背景 色值或图片地址
            },
            components: [],
          },
          {
            bg: {
              type: 'color',   // color: 背景色, image: 背景图
              value: 'red',  // 背景 色值或图片地址
            },
            components: [],
          },
        ],
        bgAnimation: '',    // 背景切换动画
      },
      active: 0,    // 当前页面索引值
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
    showAlert: function lsAlert(opts, callback, cancelCallback) {
      this.$broadcast('show-alert', opts, callback, cancelCallback);
    },
    hideAlert: function hideAlert() {
      this.$broadcast('hide-alert');
    },
    showToast: function showToast(opts) {
      this.$broadcast('show-toast', opts);
    },
    addText: function addText(text) {
      this.components = text;
    },
    /**
     * API
     */
    closeAllPopup: function closeAllPopup() {
      /**
       * 关闭所有弹出窗口
       */
      this.$broadcast('close-popup');
    },
    addComponent: function addComponent(data) {
      /**
       * 向组件库里添加一个组件
       * data: 组件基本数据 { title: '组件名称', icon: '组件图标', type: '组件类型' }
       */
      if (this.components.indexOf(data) < 0) {
        this.components.push(data);
      }
    },
    comCreate: function comCreate(type) {
      /**
       * 创建组件
       * type: 组件类型
       */
      this.$broadcast('com-create', type);
    },
    render: function render(data) {
      /**
       * 渲染组件
       * data: 组件数据
       */
      this.$broadcast('com-render', data);
    },
    appendComponent: function appendComponent(content) {
      /**
       * 显示组件
       */
      this.$broadcast('append-component', content);
    },
  },
  events: {
    'update-templates': function updateTemplates(data) {
      this.sTemplates = data;
    },
    'add-component': function updateTemplates(data) {
      this.sTemplates.pages[this.active].components.push(data);
    },
    'show-component': function showComponent(content) {
      this.appendComponent(content);
    },
    'show-config': function showConfig(content) {
      this.$broadcast('append-config', content);
    },
  },
};
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
html {
  height: 100%;
}

body {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: 0;
  /*max-width: 600px;*/
  font-family: Source Sans Pro, Helvetica, sans-serif;
  height: 100%;
  overflow-y: hidden;
  /*text-align: center;*/
  /*background-color: #8fd7b3;*/
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
