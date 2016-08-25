<style lang="scss">
  .m0 {
    margin: 0;
  }
  .p0 {
    padding: 0;
  }
  .mt4 {
    margin-bottom: 4px;
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

  .form-config-item-select {
    width: 100%;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .config-placeholder {
    input {
      width: 100%;
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    a {
      display: inline-flex;
      margin: 0 10%;
      width: 80%;
      height: 24px;
      line-height: 24px;
      padding: 0 8px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      background-color: #fff;
      justify-content: center;
      align-items: center;
    }
  }
  .form-config-delete {
    /*margin-left: 8px;*/
    height: 24px;
    line-height: 24px;
    width: 24px;
    display: inline-flex;
    color: #888;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    svg {
      width: 20px;
      height: 20px;
      &:hover {
        color: #d77490;
      }
    }
  }
  .form-config-setting {
    margin-left: 8px;
    height: 24px;
    line-height: 24px;
    width: 24px;
    display: inline-block;
    text-align: center;
    border: 1px solid #c9c9c9;
    color: #888;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      color: #71cc79;
      border: 1px solid #71cc79;
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

  const allFormItems = [
    {
      label: '姓名',
      name: 'username',
      type: 'text',
      placeholder: '请输入姓名',
      available: 0,           // 控件还能被添加几次
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
      available: 0,           // 控件还能被添加几次
      required: true,
      validation: [
        {
          regexp: /^1[34578]\\\d{9}$/,
          message: '手机号不正确',
        },
      ],
      ban: {
        change: true,       // 禁止切换类型
        remove: true,       // 禁止删除
        cancel: true,        // 禁止取消 必填
      },
    },
    {
      label: '验证码',
      name: 'verifycode',
      type: 'verifycode',
      placeholder: '验证码',
      available: 0,           // 控件还能被添加几次
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '邮箱',
      name: 'email',
      type: 'text',
      placeholder: '请输入邮箱',
      available: 1,           // 控件还能被添加几次
      required: false,
      validation: [
        {
          regexp: /^(\\\w)+(\\\.\\\w+)*@(\\\w)+((\\\.\\\w+)+)$/,
          message: '邮箱不正确',
        },
      ],
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '地址',
      name: 'address',
      type: 'text',
      placeholder: '请输入地址',
      available: 1,           // 控件还能被添加几次
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '性别',
      name: 'sex',
      type: 'radio',
      available: 1,           // 控件还能被添加几次
      options: [
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
      ],
      activated: 0,
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '留言',
      name: 'feedback',
      type: 'textarea',
      placeholder: '请输入您的留言',
      available: 1,           // 控件还能被添加几次
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '自定义',
      name: 'customs',
      type: 'text',
      placeholder: '请输入自定义内容',
      available: 99,           // 控件还能被添加几次
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
    {
      label: '单选',
      name: 'select',
      type: 'select',
      placeholder: '单选',
      multiSelect: false,      // 是否为多选
      available: 99,           // 控件还能被添加几次
      options: [
        {
          label: '选项一',
          value: '选项一',
        },
        {
          label: '选项二',
          value: '选项二',
        },
      ],
      required: false,
      ban: {
        change: false,
        remove: false,
        cancel: false,
      },
    },
  ];

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
            <div class="row m0 p0 mt4" v-for="item in coms['${id}'].items" track-by="$index">
              <div class="col-xs-1 m0 p0">
                <input type="checkbox" :disabled="item.ban.change"
                  v-hover="item.ban.cancel?'必填,不能修改':'是否必填'"
                  :checked="item.required || item.ban.cancel"
                  @click="item.required=!item.required"
                  :style="{'cursor': item.ban.change?'not-allowed':'pointer'}">
              </div>
              <div class="col-xs-3 m0 p0">
                <select class="form-config-item-select" :data-index="$index"
                  :disabled="item.ban.change"
                  :style="{'cursor': item.ban.change?'not-allowed':'pointer'}"
                  >
                  <option v-for="option in coms['${id}'].allFormItems" :value="option.label"
                     :selected="option.label==item.label"
                     v-show="item.ban.change || !option.ban.change"
                     v-text="option.label"
                  ></option>
                </select>
              </div>
              <div class="col-xs-7 m0 p0 config-placeholder"
                v-if="item.type=='text' || item.type=='textarea'
                  || item.type=='phonenum' || item.type=='verifycode'">
                <input type="text" v-model="item.placeholder">
              </div>
              <div class="col-xs-7 m0 p0" v-if="item.type=='radio'"></div>
              <div class="col-xs-7 m0 p0 config-placeholder" v-if="item.type=='select'">
                <a href="javascript:void(0)">
                  <icon name="cog"></icon>设置选项
                </a>
              </div>
              <div class="col-xs-1 m0 p0 form-config-delete" v-if="!item.ban.remove">
                <icon name="trash-o"></icon>
              </div>
            </div>
            <div class="row m0 p0">
              <div class="col-xs-4 m0 p0">
                <a href="javascript:void(0)" class="btn btn-primary btn-sm form-item-add"
                  @click="coms['${id}'].addItem()"
          :disabled="sTemplates.pages[pages.active].components[comCurrent.active].items.length>=10"
                  >
                  添加字段
                </a>
              </div>
            </div>
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
        const self = this;
//        const sTemplates = this.$parent.sTemplates;
//        const pages = this.$parent.pages;
//        const comCurrent = this.$parent.comCurrent;
        this.$dispatch('add-component', data);
        this.$parent.coms[id] = data;
        this.$parent.coms[id].allFormItems = allFormItems;
        this.$parent.coms[id].addItem = function addItem() {
          self.$parent.coms[id].items.push({
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
          });
//          sTemplates.pages[pages.active].components[comCurrent.active].items.push({
//            label: '自定义',
//            name: 'customs',
//            type: 'text',
//            placeholder: '请输入自定义内容',
//            available: 99,           // 控件还能被添加几次
//            required: false,
//            ban: {
//              change: false,
//              remove: false,
//              cancel: false,
//            },
//          });
        };
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
