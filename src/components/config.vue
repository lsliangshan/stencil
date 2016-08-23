<template>
  <div class="g-config" @click="closeAllPopup()">
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
  export default {
    data() {
      return {
      };
    },
    computed: {
      coms: function coms() {
        return this.$parent.coms;
      },
    },
    components: {
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
    },
  };
</script>
