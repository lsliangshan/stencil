<template>
  <div class='render'></div>
  <div class='config'></div>
</template>
<style lang='scss' scoped>
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
  const template = {
    type: 'com-form',
    title: '表单',
    icon: 'icon-font',
    desc: '',
    allowBorder: true,
    class: 'animated',
    animation: {
      name: '',               // 动画的class名
      delay: 0,              // 动画延迟加载时间
      infinity: false,        // 动画执行是否无限循环
      type: -1,
    },
    items: [
      {
        label: '姓名',
        name: 'username',
        type: 'text',
        placeholder: '请输入姓名',
        available: 1,           // 控件还能被添加几次
        required: true,     // 是否必填
        ban: {
          change: false,
          remove: false,
          cancel: false,
        },
      },
      {
        label: '手机号',
        name: 'phonenum',
        type: 'phonenum',
        placeholder: '请输入手机号码',
        available: 1,           // 控件还能被添加几次
        required: true,     // 是否必填
        validation: [
          {
            regexp: '^1[34578][0-9]{9}$',
            message: '手机号不正确',
          },
        ],
        ban: {
          change: true,
          remove: true,
          cancel: true,
        },
      },
      {
        label: '验证码',
        name: 'verifycode',
        type: 'verifycode',
        placeholder: '验证码',
        available: 1,           // 控件还能被添加几次
        required: false,     // 是否必填
        ban: {
          change: false,
          remove: false,
          cancel: false,
        },
      },
    ],
    submit: {
      label: '提交',
      name: 'submit',
      type: 'submit',
      bgColor: '#337ab7',
    },
    successInfo: {
      tip: '恭喜您提交成功!',
    },
    defaultStyle: {
      width: '100%',
      height: '100%',
      fontSize: '100%',
      lineHeight: 1.5,
      left: '0%',
      top: '0%',
      textAlign: 'left',
      color: '#000000',
      zIndex: 1500,
      position: 'absolute',
      fontWeight: 'normal',            // 'normal' 不加粗; 'bold' 加粗;
      fontStyle: 'normal',        // 'normal': 正常; 'italic' 斜体;
      // 'none': 无; 'underline' 下划线; ('line-through' 贯穿线; 'overline': 上划线 暂不支持)
      textDecoration: 'none',
      borderRadius: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      transform: 'rotate(0)',
      webkitTransform: 'rotate(0)',
      mozTransform: 'rotate(0)',
      oTransform: 'rotate(0)',
      opacity: 1,
      borderWidth: '0px',
      borderStyle: 'solid',
      borderColor: '#c8c8c8',
    },
  };
  export default {
    data() {
      this.init();
      return {
        template: {},
      };
    },
    components: {
    },
    methods: {
      init: function init() {
        this.addComponent({
          title: '表单',
          icon: 'th-list',
          type: 'com-form',
        });
      },
      closeAllPopup: function closeAllPopup() {
        this.$parent.closeAllPopup();
      },
      addComponent: function addComponent(data) {
        this.$parent.addComponent(data);
      },
      createForm: function createForm(data) {
        this.$dispatch('add-component', data);
        this.render(data);
      },
      render: function render(data) {
        console.log(data);
        const templateHtml = '<h1>HELLO</h1>';
        this.closeAllPopup();
        this.$dispatch('show-component', templateHtml);
      },
    },
    events: {
      'com-create': function comCreate(type) {
        if (type === 'com-form') {
          this.createForm(template);
        }
      },
      'com-render': function comRender(data) {
        if (data.type === 'com-form') {
          this.render(data);
        }
      },
    },
  };
</script>
