<template>
  <div class="g-head">
    <div class="nav-header">
      <div class="brand-wrapper">
        <a href="#/" class="brand-icon"></a>
      </div>
      <div class="brand-text-wrapper">
        <a href="#/" class="brand-text">Stencil5</a>
      </div>
    </div>
    <div class="toolbar">
      <ul>
        <li>
          <a href="javascript:void(0)" @click="addText()">
            <icon name="text-width"></icon>
            <span class="ml8">文本</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="addImage()">
            <icon name="file-image-o"></icon>
            <span class="ml8">图片</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="toggleComponents()">
            <icon name="th-large"></icon>
            <span class="ml8">组件库</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="addMusic()">
            <icon name="music"></icon>
            <span class="ml8">音乐</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="operations">
      <ul>
        <li>
          <a href="javascript:void(0)" @click="addMusic()">
            <icon name="save"></icon>
            <span class="ml8">保存</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="addMusic()">
            <icon name="eye"></icon>
            <span class="ml8">预览</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" @click="addMusic()">
            <icon name="send"></icon>
            <span class="ml8">发布</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="components-container animated" v-show="componentsContainer.shown" transition="slide">
    <ul>
      <li v-for="com in components" track-by="$index" :type="com.type" @click="comCreate(com.type)">
        <div class="wrapper">
          <icon :name="com.icon"></icon>
        </div>
        <p v-text="com.title"></p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .ml8 {
    margin-left: 8px;
  }
  body {
    font-family: Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",sans-serif;
  }
  .g-head {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 52px;
    background-color: #1c2b36;
    color: #7793a7;
    white-space: nowrap;
    z-index: 9000;

    .nav-header {
      display: inline-block;
      width: 200px;
      height: 100%;
      cursor: pointer;
      float: left;
    }
    .brand-wrapper {
      display: inline-flex;
      width: 52px;
      height: 52px;
      align-items: center;
      justify-content: center;
      float: left;
    }
    .brand-icon {
      display: flex;
      width: 30px;
      height: 30px;
      background-image: url("../assets/logo.png");
      background-size: cover;
    }
    .brand-text-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      width: 148px;
      height: 52px;
      float: left;
    }
    .brand-text {
      font-size: 24px;
      color: #c4d0d9 !important;
    }
    .toolbar {
      display: inline-block;
      height: 52px;
      float: left;
      ul {
        list-style: none;
        height: 52px;
        line-height: 52px;
        li {
          padding-left: 16px;
          padding-right: 16px;
          height: 100%;
          display: inline-block;
          &:hover {
             background-color: rgba(0, 0, 0, .6);
          svg, span {
            color: #c4d0d9;
          }
          }
          a {
            height: 52px;
            display: inline-block;
          }
          svg, span {
            color: #fff;
            pointer-events: none;
          }
          span {
            float: left;
            line-height: 52px;
            display: inline-block;
          }
          svg {
            height: 52px;
            float: left;
            width: 18px;
          }
        }
      }
    }
    .operations {
      display: inline-block;
      height: 52px;
      float: right;
      ul {
        list-style: none;
        height: 52px;
        line-height: 52px;
      li {
        padding-left: 16px;
        padding-right: 16px;
        height: 100%;
        display: inline-block;
        &:hover {
          background-color: rgba(0, 0, 0, .6);
          svg, span {
            color: #c4d0d9;
          }
          }
          a {
            height: 52px;
            display: inline-block;
          }
          svg, span {
            color: #fff;
            pointer-events: none;
          }
          span {
            float: left;
            line-height: 52px;
            display: inline-block;
          }
          svg {
            height: 52px;
            float: left;
            width: 18px;
          }
        }
      }
    }
  }

  .components-container {
    position: absolute;
    width: 264px;
    height: calc(100% - 52px);
    display: inline-block;
    top: 52px;
    left: 150px;
    border-right: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 3px 10px 1px #c8c8c8;
    z-index: 2999;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 32%;
        float: left;
        margin-left: 1%;
        margin-top: 16px;
        list-style: none;
        text-align: center;
        cursor: pointer;
        &:hover {
          .wrapper {
            background-color: #eee;
            border: 2px solid #202a3a;
            svg {
              color: #202a3a;
            }
          }
         }
        p {
          margin: 4px 0 0 0;
        }
        .wrapper {
          padding: 4px;
        //width: 90%;
        //margin-left: 5%;
          width: 62px;
          height: 62px;
          margin: 0 auto;
          border: 2px dashed #c8c8c8;
          pointer-events: none;
          display: flex;
          justify-content: center;
          align-items: center;
          svg {
            width: 40px;
            height: 40px;
            margin: 0 auto;
            /*margin-top: 5px;*/
            /*background-color: whitesmoke;*/
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  @media (max-width: 745px) {
    .operations {
      display: none;
    }
  }
  @media (max-width: 480px) {
    .toolbar {
      display: none;
    }
  }
</style>
<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';

  export default {
    data() {
      return {
        components: this.$parent.components,
        componentsContainer: {
          shown: false,
        },
      };
    },
    components: {
      Icon,
    },
    methods: {
      addText: function addText() {
        this.$parent.addText('文本控件');
      },
      addImage: function addImage() {
        console.log('add image');
      },
      addMusic: function addMusic() {
        console.log('add music');
      },
      toggleComponents: function toggleComponents() {
        /**
         * 打开或关闭组件库
         * @type {boolean}
         */
        this.componentsContainer.shown = !this.componentsContainer.shown;
      },
      closeComponents: function closeComponents() {
        /**
         * 关闭组件库
         * @type {boolean}
         */
        this.componentsContainer.shown = false;
      },
      comCreate: function comCreate(type) {
        this.$parent.comCreate(type);
      },
    },
    events: {
      'close-popup': function closePopup() {
        // 关闭组件库窗口
        this.closeComponents();
      },
    },
  };
</script>
