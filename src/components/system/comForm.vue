<style lang="scss">
  .m0 {
    margin: 0;
  }
  .p0 {
    padding: 0;
  }
  .form-mask {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    display: flex;
    align-items: center;
    form {
      width: 100%;
      .form-items {
        .form-item {
          margin: 0.08rem 10% auto 10%;
          padding: 0;
          width: 80%;
          height: 0.3rem;
          input {
            width: 100%;
            height: 0.3rem;
            /*line-height: 1.5;*/
            padding: 0 0.08rem;
            outline: none;
            border: none;
            border-radius: 0.04rem;
          }
          a {
            width: 90%;
            margin-left: 10%;
            height: 0.3rem;
            color: #fff;
            border: none;
            text-shadow: #000 0 0 3px;
            font-size: 0.14rem;
            padding: 0;
            outline: none;
            line-height: 0.3rem;
          }
          .check-status {
            position: absolute;
            right: 0.02rem;
            top: 0;
            display: inline;
            font-size: 0.14rem;
            color: red;
            vertical-align: middle;
            margin: 0;
            line-height: 0.3rem;
          }
        }
        .protocol {
          width: 80%;
          margin: 0.08rem 10% 0 10%;
          font-size: 0.14rem;
          a {
            padding: 0.08rem 0;
          }
        }
        .form-submit {
          margin: 0.08rem 10% auto 10%;
          padding: 0;
          width: 80%;
          height: 0.3rem;
          a {
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            outline: none;
            border: none;
            border-radius: 0.04rem;
            font-size: 0.16rem;
            color: #fff;
            text-shadow: #000 0 0 3px;
            padding: 0;
          }
        }
      }
    }
  }
</style>
<script>
  import Vue from 'vue';
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
  const id = getId('form-');
  Vue.directive('render-form-item', {
    params: ['data'],
    update: function update() {
      const self = this;
      const selfElem = self.el;
      const data = self.params.data;
      let renderTimeout = null;
      const renderFunc = function renderFunc() {
        let i = 0;
        let tempItem = null;
        const len = data.length;
        let itemType = null;
        for (i; i < len; i++) {
          tempItem = data[i];
          itemType = tempItem.type;
          switch (itemType) {
            case 'text':
              selfElem.innerHTML += `<f-text :data="coms['${id}'].items[${i}]"></f-text>`;
              break;
            case 'phonenum':
              selfElem.innerHTML += `<f-phone :data="coms['${id}'].items[${i}]"></f-phone>`;
              break;
//            case 'radio':
//              selfElem.innerHTML += `<f-radio :data="coms['${id}'].items[${i}]"></f-radio>`;
//              break;
//            case 'select':
//              selfElem.innerHTML += `<f-select :data="coms['${id}'].items[${i}]"></f-select>`;
//              break;
            case 'verifycode':
              selfElem.innerHTML += `<f-code :data-color="coms['${id}'].submit.bgColor"
                          :data="coms['${id}'].items[${i}]"></f-code>`;
              break;
//            case 'textarea':
//              selfElem.innerHTML += `<f-textarea :data="coms['${id}'].items[${i}]"></f-textarea>`;
//              break;
            default :
              break;
          }
        }
        self.vm.$compile(selfElem);
        clearTimeout(renderTimeout);
      };
      renderTimeout = setTimeout(renderFunc, 20);
    },
  });

  const fText = Vue.extend({
    props: ['data'],
    template: `
      <div class="row m0 p0">
        <div class="col-xs-12 form-item">
          <input type="text" :required="data.required" :name="data.name"
            :placeholder="data.placeholder">
          <p class="check-status" v-show="data.required">*</p>
        </div>
      </div>
    `,
  });

  const fPhone = Vue.extend({
    props: ['data'],
    template: `
      <div class="row m0 p0">
        <div class="col-xs-12 form-item">
          <input type="text" :required="data.required" :name="data.name"
            :placeholder="data.placeholder" v-input-type>
          <p class="check-status" v-show="data.required">*</p>
        </div>
      </div>
    `,
  });

  const fCode = Vue.extend({
    props: ['data', 'data-color'],
    template: `
      <div class="row m0 p0 form-item">
        <div class="col-xs-7 m0 p0">
          <input type="text" :required="data.required" :name="data.name"
            :placeholder="data.placeholder" v-input-type>
          <p class="check-status" v-show="data.required">*</p>
        </div>
        <div class="col-xs-5 m0 p0">
          <a href="javascript:void(0)" class="btn btn-sm" :style="{'background-color': dataColor}">
            获取
          </a>
        </div>
      </div>
    `,
  });

  const fSubmit = Vue.extend({
    props: ['data'],
    template: `
      <div class="row m0 p0">
        <div class="col-xs-12 form-submit">
          <a href="javascript:void(0)" class="btn btn-sm"
            :style="{'background-color': data.bgColor}"
            v-text="data.label"></a>
        </div>
      </div>
    `,
  });

  Vue.component('f-text', fText);
  Vue.component('f-phone', fPhone);
  Vue.component('f-code', fCode);
  Vue.component('f-submit', fSubmit);

  const template = {
    type: 'com-form',
    title: '表单',
    icon: 'th-list',
    desc: '',
    allowBorder: true,
    className: 'animated',
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
      fontSize: '0.14rem',
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
        contentTemplate: `
          <div class='k-component' id='content-${id}'
              style='margin: 0; position: absolute;'
              :style='{
                "width": coms["${id}"].defaultStyle.width,
                "height": coms["${id}"].defaultStyle.height
                }'
              v-hover.literal='这是一个表单组件'>
            <div class="form-mask" :style='[coms["${id}"].defaultStyle]'>
              <form method="post">
                <div class="form-items">
                  <div :data='coms["${id}"].items' v-render-form-item></div>
                  <slot>
                    <f-submit :data="coms['${id}'].submit"></f-submit>
                  </slot>
                  <div class="row m0 p0 protocol">
                    <div class="col-xs-12 m0 p0">
                      <a href="javascript:void(0)">活动协议</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        `,
        configTemplate: `
          <div class='config' id='config-${id}'>
            <input v-model='coms["${id}"].submit.bgColor'>
          </div>
        `,
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
      create: function create(data) {
        this.$dispatch('add-component', data);
        this.$parent.coms[id] = data;
        this.render(data);
      },
      render: function render() {
        const templateHtml = this.contentTemplate;
        const templateConfig = this.configTemplate;
        this.closeAllPopup();
        this.$dispatch('show-component', templateHtml);
        this.$dispatch('show-config', templateConfig);
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
