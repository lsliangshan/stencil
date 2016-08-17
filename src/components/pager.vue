<template>
  <div class="g-pager" @click="closeAllPopup()">

  </div>
</template>
<style lang="scss" scoped>
  .g-pager {
    width: 150px;
    height: calc(100% - 52px);
    display: inline-block;
    background-color: lightblue;
    position: absolute;
    left: 0;
    top: 52px;
    z-index: 3000;
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
