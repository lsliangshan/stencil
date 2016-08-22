<script>
  const getId = function getId(prefix) {
    const pre = prefix || '';
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    const resultFunc = function resultFunc() {
      return `${pre}${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    };
    return (resultFunc)();
  };
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
  const id = getId('form-');
  export default {
    data() {
      this.init();
      return {
        template: {},
        contentTemplate: `
          <div class='render k-component' id='content-${id}' v-hover.literal='这是一个表单组件'>
            <p style='color: red;'>DEMO!</p>
          </div>
        `,
        configTemplate: `
          <div class='config' id='config-${id}'></div>
        `,
      };
    },
    components: {
    },
    methods: {
      init: function init() {
        console.log(this.$parent);
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
      create: function create(data) {
        this.$dispatch('add-component', data);
        this.render(data);
      },
      render: function render() {
        const templateHtml = this.contentTemplate;
        this.closeAllPopup();
        this.$dispatch('show-component', templateHtml);
      },
    },
    events: {
      'com-create': function comCreate(type) {
        if (type === 'com-form') {
          this.create(template);
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
