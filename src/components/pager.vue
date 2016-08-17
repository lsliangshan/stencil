<template>
  <div class="g-pager" @click="closeAllPopup()">
    <ul>
      <li @mouseenter="hoverElem(0)" @mouseleave="unHoverElem()" @click="choosePage($event, 0)">
        <div class="left">
          <div class="left-inner">
            <div class="arrow-up animated-2" transition="arrowUp" v-show="pageHovered==0" @click="swiftUp(0)">
              <icon name="arrow-up"></icon>
            </div>
            <p>1</p>
            <div class="arrow-down animated-2" transition="arrowDown" v-show="pageHovered==0" @click="swiftDown(0)">
              <icon name="arrow-down"></icon>
            </div>
          </div>
        </div>
        <div class="main"></div>
        <div class="right">
          <div class="right-inner">
            <div class="close animated-2" transition="pageClose" v-show="pageHovered==0" @click="removePage(0)">
              <icon name="remove"></icon>
            </div>
            <div class="copy animated-2" transition="pageCopy" v-show="pageHovered==0" @click="copyPage(0)">
              <icon name="clipboard"></icon>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="pager-footer">
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
      choosePage: function choosePage(target, index) {
        target.target.classList.add('active');
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
        console.log(index);
        alert('remove page');
      },
      copyPage: function copyPage(index) {
        console.log(index);
        alert('copy page');
      },
    },
  };
</script>
