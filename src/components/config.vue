<template>
  <div class="g-config" @click="closeAllPopup()">

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
  }
</style>
<script>
  export default {
    data() {
      return {
      };
    },
    components: {
    },
    methods: {
      closeAllPopup: function closeAllPopup() {
        this.$parent.closeAllPopup();
      },
    },
  };
</script>
