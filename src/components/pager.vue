<template>
  <div class="g-pager" @click="closeAllPopup()">
    <ul>
      <!--<li @mouseenter="hoverElem(0)" @mouseleave="unHoverElem()" @click="choosePage($event, 0)">-->
        <!--<div class="left">-->
          <!--<div class="left-inner">-->
            <!--<div class="arrow-up animated-2" transition="arrowUp" v-show="pageHovered==0" @click="swiftUp(0)" v-hover.literal="点击与上一页交换">-->
              <!--<icon name="arrow-up"></icon>-->
            <!--</div>-->
            <!--<p>1</p>-->
            <!--<div class="arrow-down animated-2" transition="arrowDown" v-show="pageHovered==0" @click="swiftDown(0)" v-hover.literal="点击与下一页交换">-->
              <!--<icon name="arrow-down"></icon>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="main"></div>-->
        <!--<div class="right">-->
          <!--<div class="right-inner">-->
            <!--<div class="close animated-2" transition="pageClose" v-show="pageHovered==0" @click="removePage(0)" v-hover.literal="点击删除当前页">-->
              <!--<icon name="remove"></icon>-->
            <!--</div>-->
            <!--<div class="copy animated-2" transition="pageCopy" v-show="pageHovered==0" @click="copyPage(0)" v-hover.literal="点击复制当前页">-->
              <!--<icon name="clipboard"></icon>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</li>-->
      <li v-for="page in sTemplates.pages" track-by="$index" @mouseenter="hoverElem($index)" @mouseleave="unHoverElem()" :class="{'active':(activePage==$index)}" @click="choosePage($index)">
        <div class="left">
          <div class="left-inner">
            <div class="arrow-up animated-2" transition="arrowUp" v-show="pageHovered==$index" @click="swiftUp($index)" v-hover.literal="点击与上一页交换">
              <icon name="arrow-up"></icon>
            </div>
            <p v-text="$index+1"></p>
            <div class="arrow-down animated-2" transition="arrowDown" v-show="pageHovered==$index" @click="swiftDown($index)" v-hover.literal="点击与下一页交换">
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
        return this.$parent.active;
      },
    },
    components: {
      Icon,
    },
    methods: {
      closeAllPopup: function closeAllPopup() {
        this.$parent.closeAllPopup();
      },
      hoverElem: function hoverElem(index) {
        this.pageHovered = index;
      },
      unHoverElem: function unHoverElem() {
        this.pageHovered = -1;
      },
      choosePage: function choosePage(index) {
        this.$parent.active = index;
      },
      swiftUp: function swiftUp(index) {
        console.log(index);
        alert('swift with up: ');
      },
      swiftDown: function swiftDown(index) {
        console.log(index);
        alert('swift with down: ');
      },
      removePage: function removePage(index) {
        /**
         * 删除某一页
         */
        const pagesLen = this.$parent.sTemplates.pages.length;
        if (pagesLen < 2) {
          alert('请留一页');
        }
        this.$parent.sTemplates.pages.splice(index, 1);
//        if (index === this.$parent.active) {
//
//        }
      },
      copyPage: function copyPage(index) {
        console.log(index);
        alert('copy page');
      },
      addBlankPage: function addBlankPage() {
        /**
         * 新增一页
         */
        this.$parent.sTemplates.pages.push({
          bg: {
            type: 'color',   // color: 背景色, image: 背景图
            value: '#fff',  // 背景 色值或图片地址
          },
          components: [],
        });
        this.$parent.active = this.$parent.sTemplates.pages.length - 1;
      },
    },
  };
</script>
