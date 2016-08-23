<template>
  <div class="g-config" @click="closeAllPopup()">
    <div class="header">
      <icon :name="header.icon"></icon>
      <span v-text="header.title"></span>
    </div>
    <div class="custom-config"></div>
    <div class="public-config">
      <pre>公共配置</pre>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .g-config {
    width: 264px;
    height: calc(100% - 52px);
    display: inline-block;
    background-color: lightblue;
    position: absolute;
    right: 0;
    top: 52px;
    z-index: 1000;
    border-left: 1px solid #c8c8c8;
    .header {
      width: 100%;
      height: 48px;
      line-height: 48px;
      padding: 0;
      margin: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e6e6e6;
      border-bottom: 1px solid #c8c8c8;
      svg {
        width: 18px;
        height: 18px;
      }
      span {
        margin-left: 8px;
        font-size: 16px;
        display: inline-block;
        font-weight: bold;
      }
    }
    .custom-config {
      width: 100%;
      height: auto;
    }
    .public-config {
      width: 100%;
      height: auto;
    }
  }
</style>
<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';
  export default {
    data() {
      return {
        header: {
          icon: 'th',
          title: '背景',
        },
      };
    },
    computed: {
      coms: function coms() {
        return this.$parent.coms;
      },
      pages: function pages() {
        return this.$parent.pages;
      },
      comCurrent: function comCurrent() {
        return this.$parent.comCurrent;
      },
      sTemplates: function sTemplates() {
        return this.$parent.sTemplates;
      },
    },
    components: {
      Icon,
    },
    methods: {
      closeAllPopup: function closeAllPopup() {
        this.$parent.closeAllPopup();
      },
    },
    events: {
      'append-config': function appenComponent(content) {
        const config = document.querySelector('.g-config .custom-config');
        config.innerHTML += content;
        this.$compile(config);
      },
      'set-config-header': function setConfigHeader(data) {
        this.header = data;
      },
    },
  };
</script>
