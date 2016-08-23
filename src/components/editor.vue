<template>
  <div id="editor" class="g-editor" @click="closeAllPopup()">
    <div id="scene" :style="{width: scene.width+'px', 'background-image': (sTemplates.pages[activePage].bg.type=='image'?'url('+sTemplates.pages[activePage].bg.value+')':''), 'background-color': (sTemplates.pages[activePage].bg.type=='color'?sTemplates.pages[activePage].bg.value:'#fff')}">

    </div>
  </div>
</template>
<style lang="scss" scoped>
  #editor {
    width: calc(100% - 414px);
    height: calc(100% - 52px);
    display: flex;
    background-color: lightgray;
    position: absolute;
    left: 150px;
    top: 52px;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    #scene {
      position: relative;
      height: 80%;
      background-color: green;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
<script>
  export default {
    data() {
      const self = this;
      let scene;
      let sceneBox;
      window.onload = function onload() {
        scene = document.querySelector('#scene');
        sceneBox = scene.getBoundingClientRect();
        self.scene.width = (320 / 568 * sceneBox.height);
      };
      window.onresize = function onresize() {
        scene = document.querySelector('#scene');
        sceneBox = scene.getBoundingClientRect();
        self.scene.width = (320 / 568 * sceneBox.height);
      };
      return {
        scene: {
          width: 320,
        },
      };
    },
    computed: {
      activePage: function activePage() {
        return this.$parent.active;
      },
      sTemplates: function sTemplates() {
        return this.$parent.sTemplates;
      },
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
      'append-component': function appenComponent(content) {
        const scene = document.querySelector('#scene');
        scene.innerHTML += content;
        this.$compile(scene);
      },
    },
  };
</script>
