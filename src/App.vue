<template>
  <div id="app">
    <editor-header></editor-header>
    <editor-pager></editor-pager>
    <editor-config></editor-config>
    <editor></editor>
    <!--<img class="logo" src="./assets/logo.png">-->
    <!--<hello></hello>-->
    <!--<p>-->
      <!--Welcome to your Vue.js app!-->
    <!--</p>-->
    <!--<p>-->
      <!--To get a better understanding of how this boilerplate works, check out-->
      <!--<a href="http://vuejs-templates.github.io/webpack" target="_blank">its documentation</a>.-->
      <!--It is also recommended to go through the docs for-->
      <!--<a href="http://webpack.github.io/" target="_blank">Webpack</a> and-->
      <!--<a href="http://vuejs.github.io/vue-loader/" target="_blank">vue-loader</a>.-->
      <!--If you have any issues with the setup, please file an issue at this boilerplate's-->
      <!--<a href="https://github.com/vuejs-templates/webpack" target="_blank">repository</a>.-->
    <!--</p>-->
    <!--<p>-->
      <!--You may also want to checkout-->
      <!--<a href="https://github.com/vuejs/vue-router/" target="_blank">vue-router</a> for routing and-->
      <!--<a href="https://github.com/vuejs/vuex/" target="_blank">vuex</a> for state management.-->
    <!--</p>-->
    <com-form></com-form>
  </div>
</template>

<script>
import EditorHeader from './components/header.vue';
import EditorPager from './components/pager.vue';
import EditorConfig from './components/config.vue';
import Editor from './components/editor.vue';

import ComForm from './components/system/comForm.vue';

export default {
  components: {
    EditorHeader,
    EditorPager,
    EditorConfig,
    Editor,
    ComForm,
  },
  data() {
    return {
      components: [
//        {
//          title: '互动',
//          icon: 'thumbs-up',
//          type: 'com-support',
//        },
      ],   // 组件库里的组件
      pagers: {
        active: 0,
      },
      sTemplates: {   // 模板数据
        pages: [
          {
            bg: {
              type: 'image',   // color: 背景色, image: 背景图
//              value: 'http://img5q.duitang.com/uploads/item/201406/28/20140628141956_ZvJGR.thumb.700_0.jpeg',  // 背景 色值或图片地址
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
      console.log(data);
      this.sTemplates = data;
    },
    'add-component': function updateTemplates(data) {
      this.sTemplates.pages[this.active].components.push(data);
      console.log(JSON.stringify(this.sTemplates));
    },
    'show-component': function showComponent(content) {
      this.appendComponent(content);
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
