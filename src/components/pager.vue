<template>
  <div class="g-pager" @click="closeAllPopup()">
    <ul>
      <li v-for="page in sTemplates.pages" track-by="$index" @mouseenter="hoverElem($index)" @mouseleave="unHoverElem()" :class="{'active':(activePage==$index)}" @click="choosePage($index)">
        <div class="left">
          <div class="left-inner">
            <div class="arrow-up animated-2" transition="arrowUp" v-show="pageHovered==$index && $index!=0" @click="swiftUp($index)" v-hover.literal="点击与上一页交换">
              <icon name="arrow-up"></icon>
            </div>
            <p v-text="$index+1"></p>
            <div class="arrow-down animated-2" transition="arrowDown" v-show="pageHovered==$index && $index!=(sTemplates.pages.length-1)" @click="swiftDown($index)" v-hover.literal="点击与下一页交换">
              <icon name="arrow-down"></icon>
            </div>
          </div>
        </div>
        <div class="main" :style="{'background-image': (page.bg.type=='image'?'url('+page.bg.value+')':''), 'background-color': (page.bg.type=='color'?page.bg.value:'#fff')}"></div>
        <div class="right">
          <div class="right-inner">
            <div class="close animated-2" transition="pageClose" v-show="pageHovered==$index" @click="removePage($index)" v-hover.literal="点击删除当前页">
              <icon name="remove"></icon>
            </div>
            <div class="copy animated-2" transition="pageCopy" v-show="pageHovered==$index" @click="copyPage($index)" v-hover.literal="点击复制当前页">
              <icon name="clipboard"></icon>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pager-footer" v-hover.literal="点击新增一页" @click="addBlankPage()">
      <icon name="plus"></icon>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/css/theme.scss";
  .g-pager {
    width: 150px;
    height: calc(100% - 52px);
    display: inline-block;
    position: absolute;
    left: 0;
    top: 52px;
    z-index: 3000;
    ul {
      width: 100%;
      height: calc(100% - 48px);
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #e6e6e6;
      margin-bottom: 0;
      li {
        width: 100%;
        height: 150px;
        cursor: pointer;
        list-style: none;
        margin-bottom: 4px;
        .left {
          width: 35px;
          height: 100%;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          float: left;
          pointer-events: none;
          .left-inner {
            pointer-events: auto;
            .arrow-up, .arrow-down {
              display: flex;
              justify-content: center;
              align-items: center;
              color: #e8e8e8;
              svg {
                height: 20px;
              }
            }
            p {
              text-align: center;
            }
          }
        }
        .main {
          width: 80px;
          height: 142px;
          display: inline-flex;
          margin-top: 4px;
          background-color: #fff;
          float: left;
          pointer-events: none;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .right {
          display: inline-flex;
          float: left;
          width: 35px;
          height: 100%;
          overflow: hidden;
          position: relative;
          pointer-events: none;
          .right-inner {
            pointer-events: auto;
            .close {
              position: absolute;
              width: 28px;
              height: 28px;
              background-color: $theme;
              color: #fff;
              border-radius: 50%;
              right: -8px;
              top: -8px;
              display: flex;
              align-items: center;
              justify-content: center;
              svg {
                margin-left: -4px;
                margin-top: 4px;
              }
            }
            .copy {
              position: absolute;
              top: 66px;
              /*line-height: 150px;*/
              right: 4px;
            }
          }
        }
        &:hover {
           background-color: #ccc;
          .left {
            color: #fff;
          }
        }
        &.active {
           background-color: #aaa;
          .left {
            color: #fff;
          }
         }
      }
    }
    .pager-footer {
      width: 100%;
      height: 48px;
      background-color: $theme;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        width: 28px;
        height: 28px;
        color: #fff;
        pointer-events: none;
      }
      &:hover {
        background-color: $theme_active;
       }
    }
  }
</style>
<script>
  import Icon from '../../node_modules/vue-awesome/src/components/Icon';

  export default {
    data() {
      return {
        pageHovered: -1,
      };
    },
    computed: {
      sTemplates: function sTemplates() {
        return this.$parent.sTemplates;
      },
      activePage: function activePage() {
        return this.$parent.pages.active;
      },
    },
    components: {
      Icon,
    },
    methods: {
      showAlert: function showAlert(opts, callback) {
        this.$parent.showAlert(opts, callback);
      },
      hideAlert: function hideAlert() {
        this.$parent.hideAlert();
      },
      closeAllPopup: function closeAllPopup() {
        /**
         * 关闭所有弹框
         */
        this.$parent.closeAllPopup();
      },
      hoverElem: function hoverElem(index) {
        this.pageHovered = index;
      },
      unHoverElem: function unHoverElem() {
        this.pageHovered = -1;
      },
      choosePage: function choosePage(index) {
        /**
         * 选择某一页
         * index: 待选择页面的索引值
         */
        this.$parent.pages.active = index;
      },
      swiftUp: function swiftUp(index) {
        /**
         * 与上一页交换
         * index: 待交换页面的索引值
         */
        const sTemplates = this.$parent.sTemplates;
        if (index > 0) {
          sTemplates.pages.splice(index - 1, 0, sTemplates.pages.splice(index, 1)[0]);
        }
      },
      swiftDown: function swiftDown(index) {
        /**
         * 与下一页交换
         * index: 待交换页面的索引值
         */
        const sTemplates = this.$parent.sTemplates;
        if (index < sTemplates.pages.length) {
          sTemplates.pages.splice(index + 1, 0, sTemplates.pages.splice(index, 1)[0]);
        }
      },
      removePage: function removePage(index) {
        /**
         * 删除某一页
         * index: 待删除页面的索引值
         */
        const self = this;
        const pagesLen = this.$parent.sTemplates.pages.length;
        const okCallback = function okCallback() {
          if (pagesLen < 2) {
            self.showAlert({
              title: '提示',
              content: '至少留一页!',
              ok: '好的',
              cancel: '',
              type: 'error',
            });
          } else {
            if (index === self.$parent.pages.active) {
              if (index === 0) {
                self.$parent.pages.active = 0;
              } else {
                self.$parent.pages.active -= 1;
              }
            }
            self.$parent.sTemplates.pages.splice(index, 1);
          }
        };
        this.showAlert({
          title: '提示',
          content: '确认删除?',
          ok: '是的',
          cancel: '再想想',
          type: 'info',
        }, okCallback);
      },
      copyPage: function copyPage(index) {
        /**
         * 复制某一页
         * index: 待复制页面的索引值
         */
        const self = this;
        const sTemplates = this.$parent.sTemplates;
        sTemplates.pages.splice(index, 0, sTemplates.pages[index]);
        const changeActive = function changeActive() {
          self.$parent.pages.active = index + 1;
        };
        setTimeout(changeActive, 20);
      },
      addBlankPage: function addBlankPage() {
        /**
         * 新增一页
         * 在当前页后新增一页
         * 默认新增一页背景色为#FFF的页面
         */
        this.$parent.sTemplates.pages.splice(this.$parent.pages.active + 1, 0, {
          bg: {
            type: 'color',   // color: 背景色, image: 背景图
            value: '#FFF',  // 背景 色值或图片地址
          },
          components: [],
        });
        this.$parent.pages.active += 1;
      },
    },
  };
</script>
