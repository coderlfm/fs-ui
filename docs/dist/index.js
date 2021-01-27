'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var antd = require('antd');
var zhCN = require('antd/es/locale/zh_CN');
var icons = require('@ant-design/icons');
require('antd/dist/antd.css');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var zhCN__default = /*#__PURE__*/_interopDefaultLegacy(zhCN);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*  激活标签 */\n.ant-tabs-tab-active .ant-tabs-tab-btn {\n  color: #1890ff !important;\n  font-weight: 600 !important;\n}\n/*  底部横条 */\n.ant-tabs-ink-bar {\n  height: 4px!important;\n  background: linear-gradient(315deg, #35fcff 0%, #0443fc 100%) !important;\n  border-radius: 2px!important;\n}\nbody button :not([class = ant-btn-circle]) {\n  border-radius: 4px !important;\n}\nbody button.ant-btn svg {\n  width: 16px;\n  height: 16px;\n}\nbody .ant-btn-warning {\n  background-color: #FF841B;\n  color: #fff;\n  border-color: #FF841B;\n}\nbody .ant-btn-warning:active {\n  background-color: #FF841B;\n  color: #fff;\n  border-color: #FF841B;\n}\nbody .ant-btn-warning:focus {\n  color: #fff;\n  background-color: #FF841B;\n  border-color: #FF841B;\n}\nbody .ant-btn-warning:hover {\n  color: #fff;\n  background-color: #f59c4f;\n  border-color: #f59c4f;\n}\nbody .ant-btn[disabled] {\n  color: #fff;\n  background: #bdbdbd;\n  border-color: #bdbdbd;\n}\nbody .ant-btn[disabled]:hover {\n  color: #fff;\n  background: #bdbdbd;\n  border-color: #bdbdbd;\n}\nbody .ant-btn-primary-sub {\n  color: #1890FF;\n  border-color: #1890FF;\n}\nbody .ant-btn-warning-sub {\n  color: #FF841B;\n  border-color: #FF841B;\n}\nbody .ant-btn-warning-sub:hover {\n  color: #f59c4f;\n  border-color: #f59c4f;\n}\nbody .ant-btn.ant-btn-disabled-sub {\n  background-color: #fff;\n  border-color: #bdbdbd;\n  color: #bdbdbd;\n}\nbody .ant-btn.ant-btn-disabled-sub:hover {\n  background-color: #fff;\n  border-color: #bdbdbd;\n  color: #bdbdbd;\n}\nbody .ant-btn {\n  padding: 6px 9px;\n  line-height: 1;\n}\nbody .ant-btn-sm {\n  padding: 0 15px;\n}\nbody .ant-btn-lg {\n  padding: 6px 16px;\n}\nbody .ant-input[disabled] {\n  border: 1px solid #f5f5f5;\n}\nbody .ant-radio-wrapper {\n  border-color: #A4A7A9;\n  border-radius: 50%;\n}\nbody .ant-radio-wrapper.ant-radio-wrapper-checked {\n  border-color: red;\n}\nbody .ant-radio-wrapper.ant-radio-wrapper-checked .ant-radio-inner {\n  background-color: #1890FF;\n}\nbody .ant-radio-wrapper.ant-radio-wrapper-checked .ant-radio-inner::after {\n  background-color: #fff;\n}\nbody .ant-radio-wrapper.ant-radio-wrapper-checked .ant-radio-disabled .ant-radio-inner {\n  background-color: #E9E9E9;\n}\nbody .ant-radio-wrapper.ant-radio-wrapper-checked .ant-radio-disabled .ant-radio-inner::after {\n  background-color: #D9D9D9;\n}\nbody .ant-radio-disabled .ant-radio-inner {\n  background-color: #E9E9E9;\n}\nbody .ant-radio-disabled .ant-radio-inner::after {\n  background-color: #D9D9D9;\n}\nbody .ant-checkbox-indeterminate .ant-checkbox-inner {\n  background-color: #1890FF;\n  border-color: #1890FF;\n}\nbody .ant-checkbox-indeterminate .ant-checkbox-inner::after {\n  height: 2px;\n  background-color: #fff;\n}\nbody .ant-select-arrow .anticon {\n  color: rgba(24, 144, 255, 0.5);\n}\nbody .ant-select-arrow .anticon-caret-down {\n  color: #1890FF;\n}\n";
styleInject(css_248z);

var css_248z$1 = "html .ant-btn,\nbody .ant-btn {\n  margin-right: 20px;\n  margin-bottom: 10px;\n}\n";
styleInject(css_248z$1);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var css_248z$2 = ".pro-table-form-wrap {\n  padding: 16px 24px 0;\n  background-color: #fff;\n  margin-bottom: 16px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.pro-table-form-wrap .ant-input-affix-wrapper {\n  border-radius: 4px;\n}\n.pro-table-form-wrap > .ant-col {\n  padding-bottom: 16px;\n}\n.pro-table-form-wrap .form-footer {\n  width: 100%;\n}\n.pro-table-form-wrap .form-footer .ant-form-item-control-input-content {\n  margin-top: 15px;\n  padding: 15px 0;\n  border-top-width: 1px;\n  border-top-color: #ddd;\n  border-top-style: dashed;\n  display: flex;\n  flex-direction: row-reverse;\n  align-items: flex-end;\n}\n.pro-table-form-wrap .form-footer .ant-form-item-control-input-content button {\n  width: 74px;\n  height: 32px;\n  border-radius: 4px;\n}\n.pro-table-form-circle {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n";
styleInject(css_248z$2);

var Option = antd.Select.Option;
var RangePicker = antd.DatePicker.RangePicker;
var tailLayout = {// wrapperCol: {
  //     // offset: 8,
  //     span: 24,
  // },
  // labelCol: {
  //     span: 24,
  //     flex: 2
  // }
};
var Form = /*#__PURE__*/React.memo(function (props) {
  var _formProps$config, _formProps$config$res, _formProps$config2, _formProps$config2$su, _formProps$config3, _formProps$config3$ot;

  var _Form$useForm = antd.Form.useForm(),
      _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var formProps = props.formProps,
      submit = props.submit,
      circle = props.circle;
  /**
   * 表单提交， 提交时会过滤空值
   * @param {Object} values
   */

  var onFinish = function onFinish(values) {
    var FormFields = form.getFieldsValue();
    var fields = {};

    for (var key in FormFields) {
      if (FormFields[key] !== undefined && FormFields[key] !== '') {
        fields[key] = FormFields[key];
      }
    }

    submit(fields);
  };
  /**
   * 表单重置
   */


  var onReset = function onReset() {
    var FormFields = form.getFieldsValue(); // console.log("重置前获取的数据111",FormFields);
    //这里加个标记判断是重置还是提交

    var obj = {};
    Object.keys(FormFields).map(function (item) {
      return obj[item] = '';
    }); // console.log("晴空数据",obj)

    form.resetFields();
    submit(obj);
  };

  return /*#__PURE__*/React__default['default'].createElement(antd.Form, Object.assign({
    layout: "inline",
    form: form,
    name: "control-hooks",
    onFinish: onFinish
  }, formProps === null || formProps === void 0 ? void 0 : formProps.layoutConfig, {
    className: "pro-table-form-wrap ".concat(circle ? 'pro-table-form-circle' : '')
  }), (formProps === null || formProps === void 0 ? void 0 : formProps.search) && renderForm(formProps.search), /*#__PURE__*/React__default['default'].createElement(antd.Form.Item, Object.assign({}, tailLayout, {
    className: "form-footer"
  }), /*#__PURE__*/React__default['default'].createElement(antd.Space, null, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    htmlType: "button",
    onClick: onReset,
    className: "btn-default"
  }, (formProps === null || formProps === void 0 ? void 0 : (_formProps$config = formProps.config) === null || _formProps$config === void 0 ? void 0 : (_formProps$config$res = _formProps$config.reset) === null || _formProps$config$res === void 0 ? void 0 : _formProps$config$res.text) || '重置'), /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    type: "primary",
    htmlType: "submit",
    className: "btn-primary"
  }, (formProps === null || formProps === void 0 ? void 0 : (_formProps$config2 = formProps.config) === null || _formProps$config2 === void 0 ? void 0 : (_formProps$config2$su = _formProps$config2.submit) === null || _formProps$config2$su === void 0 ? void 0 : _formProps$config2$su.text) || '查询'), formProps === null || formProps === void 0 ? void 0 : (_formProps$config3 = formProps.config) === null || _formProps$config3 === void 0 ? void 0 : (_formProps$config3$ot = _formProps$config3.otherBtn) === null || _formProps$config3$ot === void 0 ? void 0 : _formProps$config3$ot.map(function (item) {
    return /*#__PURE__*/React__default['default'].createElement(antd.Button, Object.assign({}, item.btnProps, {
      onClick: function onClick() {
        var FormFields = form.getFieldsValue();
        item.onBtnChange(FormFields);
      },
      className: "btn-primary",
      key: item
    }), item.text);
  }))));
});
/**
 * 渲染搜索表单
 * @param {Array} search 表单配置数组
 */

var renderForm = function renderForm(search) {
  /**
   * 渲染input类型
   * @param {String} type input类型
   * @param {Object} searchProps input配置项
   */
  var renderFormEle = function renderFormEle(type, searchProps) {
    type = type.toLowerCase();
    var ele;

    switch (type) {
      case 'input':
        ele = /*#__PURE__*/React__default['default'].createElement(antd.Input, Object.assign({
          allowClear: true
        }, searchProps));
        break;

      case 'select':
        ele = /*#__PURE__*/React__default['default'].createElement(antd.Select, Object.assign({
          allowClear: true
        }, searchProps), searchProps.enum.map(function (item) {
          return /*#__PURE__*/React__default['default'].createElement(Option, {
            value: item.value,
            key: item.value
          }, item.label);
        }));
        break;

      case 'rangepicker':
        ele = /*#__PURE__*/React__default['default'].createElement(RangePicker, Object.assign({
          allowClear: true
        }, searchProps));
        break;

      case 'timepicker ':
        ele = /*#__PURE__*/React__default['default'].createElement(antd.TimePicker, Object.assign({
          allowClear: true
        }, searchProps));
        break;

      default:
        ele = /*#__PURE__*/React__default['default'].createElement(antd.Input, Object.assign({
          allowClear: true
        }, searchProps));
    }

    return ele;
  };

  return search.map(function (item) {
    return /*#__PURE__*/React__default['default'].createElement(antd.Col, Object.assign({
      key: item.wrap.name,
      xs: 24,
      sm: 24,
      xl: 8
    }, item.wrap.col), /*#__PURE__*/React__default['default'].createElement(antd.Form.Item, Object.assign({
      colon: false
    }, item.wrap), renderFormEle(item.wrap.type, item.props)));
  });
};

var index = /*#__PURE__*/React.memo(function () {
  return /*#__PURE__*/React__default['default'].createElement("div", null);
});

var TabPane = antd.Tabs.TabPane;
var index$1 = /*#__PURE__*/React.memo(function () {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "page-container-wrap"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "page-container-header"
  }), /*#__PURE__*/React__default['default'].createElement(antd.Tabs, {
    defaultActiveKey: "1"
  }, /*#__PURE__*/React__default['default'].createElement(TabPane, {
    tab: "Tab 1",
    key: "1"
  }, "Tab 1"), /*#__PURE__*/React__default['default'].createElement(TabPane, {
    tab: "Tab 2",
    disabled: true,
    key: "2"
  }, "Tab 2"), /*#__PURE__*/React__default['default'].createElement(TabPane, {
    tab: "Tab 3",
    key: "3"
  }, "Tab 3")));
});

var css_248z$3 = ".pro-table-header-wrap {\n  font-weight: bolder;\n}\n.pro-table-header-wrap .ant-tabs-nav {\n  margin-bottom: 0;\n}\n.pro-table-header-wrap > h2 {\n  font-size: 20px;\n  font-family: PingFangSC-Semibold, PingFang SC;\n  font-weight: 600;\n  color: #000000;\n  line-height: 24px;\n  margin-bottom: 16px;\n}\n.pro-table-header-wrap > section {\n  padding: 0 24px;\n  background-color: #fff;\n}\n.pro-table-header-wrap > section .ant-tabs-nav {\n  height: 100%;\n}\n.pro-table-header-wrap .first {\n  border-radius: 4px;\n  margin-bottom: 4px;\n  height: 58px;\n  display: flex;\n  font-weight: 600;\n}\n.pro-table-header-wrap .first .ant-tabs-tab-btn {\n  font-size: 16px;\n  font-family: PingFangSC-Regular, PingFang SC;\n  font-weight: 400;\n  color: rgba(0, 0, 0, 0.65);\n  line-height: 22px;\n}\n.pro-table-header-wrap .second {\n  min-height: 48px;\n  padding-top: 10px;\n  display: flex;\n  font-weight: 500;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.pro-table-header-wrap .second .second-content {\n  flex-basis: 0;\n  flex-grow: 1;\n}\n.pro-table-header-wrap .second .second-content .second-btn {\n  border-radius: 12px;\n  margin: 0 14px;\n  color: rgba(0, 0, 0, 0.65);\n}\n.pro-table-header-wrap .second .second-content .ant-btn-primary {\n  color: #fff;\n}\n.pro-table-header-wrap .second .toggle-wrap {\n  display: flex;\n}\n.pro-table-header-wrap .second .toggle-wrap .anticon-down {\n  color: #1890ff;\n}\n.pro-table-header-wrap .second .toggle-wrap button {\n  padding-top: 0;\n}\n.pro-table-header-wrap .second .toggle-wrap button .anticon-down {\n  line-height: 0;\n}\n.pro-table-header-wrap .second .toggle-wrap button .anticon-down > svg {\n  line-height: 0;\n}\n";
styleInject(css_248z$3);

var TabPane$1 = antd.Tabs.TabPane;
var useBreakpoint = antd.Grid.useBreakpoint;
var colSettingDefault = {
  xs: 12,
  sm: 8,
  md: 8,
  lg: 6,
  xl: 3,
  xxl: 2
}; // 列默认配置

var ProTableHeader = /*#__PURE__*/React.memo(function (props) {
  var _tabs$secondTabs, _tabs$secondTabs2, _tabs$secondTabs3;

  var screens = useBreakpoint();
  var title = props.title,
      tabs = props.tabs,
      firstTabsChange = props.firstTabsChange,
      secondTabsChange = props.secondTabsChange;

  var _useState = React.useState((tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs = tabs.secondTabs) === null || _tabs$secondTabs === void 0 ? void 0 : _tabs$secondTabs.defaultKey) || 1),
      _useState2 = _slicedToArray(_useState, 2),
      secondTab = _useState2[0],
      setSecondTab = _useState2[1]; // 二级菜单active


  var _useState3 = React.useState((tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs2 = tabs.secondTabs) === null || _tabs$secondTabs2 === void 0 ? void 0 : _tabs$secondTabs2.defaultOpen) ? 0.5 : 0),
      _useState4 = _slicedToArray(_useState3, 2),
      rotate = _useState4[0],
      setRotate = _useState4[1]; // 旋转角度


  var _useState5 = React.useState(8),
      _useState6 = _slicedToArray(_useState5, 2),
      hiddenNum = _useState6[0],
      setHiddenNum = _useState6[1]; // 隐藏条数


  var _useState7 = React.useState(_objectSpread2(_objectSpread2({}, colSettingDefault), tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs3 = tabs.secondTabs) === null || _tabs$secondTabs3 === void 0 ? void 0 : _tabs$secondTabs3.col)),
      _useState8 = _slicedToArray(_useState7, 1),
      colSetting = _useState8[0]; // 列配置


  var screenlist = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']; // 响应尺寸

  React.useEffect(function () {
    setHiddenNum(computeHideNum(screens));
  }, [screens]);
  /**
   * 计算隐藏行
   * @param screens 当前屏幕尺寸
   */

  var computeHideNum = function computeHideNum(screens) {
    var hideNum = 8;

    for (var i = 0; i < screenlist.length; i++) {
      if (screens[screenlist[i]]) {
        hideNum = 24 / colSetting[screenlist[i]];
        break;
      }
    }

    return hideNum;
  };
  /**
   * 一级tabs切换
   * @param key
   */


  var tabFirstTabsChange = function tabFirstTabsChange(key, value) {
    var _tabs$secondTabs4, _tabs$secondTabs5, _tabs$secondTabs6;

    //该处为解决 antd 默认将 activeKey转成string型
    if (typeof (tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs4 = tabs.secondTabs) === null || _tabs$secondTabs4 === void 0 ? void 0 : _tabs$secondTabs4.defaultKey) === 'number') {
      value = parseFloat(value);
    }

    firstTabsChange(key, value);
    console.log('一级切换111', tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs5 = tabs.secondTabs) === null || _tabs$secondTabs5 === void 0 ? void 0 : _tabs$secondTabs5.defaultKey);
    setSecondTab((tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs6 = tabs.secondTabs) === null || _tabs$secondTabs6 === void 0 ? void 0 : _tabs$secondTabs6.defaultKey) || 1);
  };
  /**
   * 二级tabs切换
   * @param key
   */


  var tabSecondTabsChange = function tabSecondTabsChange(key, value) {
    secondTabsChange(key, value);
    setSecondTab(value);
  };

  return /*#__PURE__*/React__default['default'].createElement("header", {
    className: "pro-table-header-wrap"
  }, /*#__PURE__*/React__default['default'].createElement("h2", null, title || ''), tabs && tabs.firstTabs && /*#__PURE__*/React__default['default'].createElement("section", {
    className: "first"
  }, /*#__PURE__*/React__default['default'].createElement(antd.Tabs, {
    defaultActiveKey: tabs.firstTabs.defaultKey,
    onChange: function onChange(e) {
      return tabFirstTabsChange(tabs.firstTabs.key, e);
    }
  }, tabs.firstTabs.data.map(function (item) {
    return /*#__PURE__*/React__default['default'].createElement(TabPane$1, {
      tab: item.label,
      key: item.key
    });
  }))), tabs && tabs.secondTabs && /*#__PURE__*/React__default['default'].createElement("section", {
    className: "second"
  }, /*#__PURE__*/React__default['default'].createElement("span", null, tabs.secondTabs.title, "\uFF1A"), /*#__PURE__*/React__default['default'].createElement(antd.Row, {
    className: "second-content",
    gutter: [0, 16]
  }, tabs.secondTabs.data.map(function (item, index) {
    if (rotate) {
      return /*#__PURE__*/React__default['default'].createElement(antd.Col, Object.assign({
        key: item.key
      }, colSetting), /*#__PURE__*/React__default['default'].createElement(antd.Button, {
        className: "second-btn",
        size: "small",
        type: secondTab === item.key ? 'primary' : 'text',
        onClick: function onClick() {
          return tabSecondTabsChange(tabs.secondTabs.key, item.key);
        }
      }, item.label));
    } else {
      if (index < hiddenNum) {
        return /*#__PURE__*/React__default['default'].createElement(antd.Col, Object.assign({
          key: item.key
        }, colSetting), /*#__PURE__*/React__default['default'].createElement(antd.Button, {
          className: "second-btn",
          size: "small",
          type: secondTab === item.key ? 'primary' : 'text',
          onClick: function onClick() {
            return tabSecondTabsChange(tabs.secondTabs.key, item.key);
          }
        }, item.label));
      } else {
        return null;
      }
    }
  })), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "toggle-wrap"
  }, /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    type: "link"
  }, "\u7F16\u8F91")), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "toggle-item"
  }, /*#__PURE__*/React__default['default'].createElement(antd.Button, {
    type: "link",
    onClick: function onClick() {
      return rotate ? setRotate(0) : setRotate(0.5);
    }
  }, rotate ? '收起' : '展开', /*#__PURE__*/React__default['default'].createElement(icons.DownOutlined, {
    style: {
      transition: 'all 0.3s ease 0s',
      transform: "rotate(".concat(rotate, "turn)")
    }
  }))))));
});

var css_248z$4 = ".pro-table-wrap {\n  height: 100%;\n}\n.pro-table-wrap .pro-table-tools {\n  background-color: #fff;\n  display: flex;\n  justify-content: space-between;\n  padding: 12px 0;\n  padding-right: 24px;\n}\n.pro-table-wrap .pro-table-tools > .pro-table-tools-title {\n  display: flex;\n  align-items: center;\n}\n.pro-table-wrap .pro-table-tools > .pro-table-tools-title > span:first-child {\n  width: 4px;\n  height: 16px;\n  background: #d8d8d8 linear-gradient(315deg, #35fcff 0%, #0443fc 100%);\n  border-radius: 2px;\n  margin-right: 10px;\n}\n.pro-table-wrap .pro-table-tools > .pro-table-tools-title > span:last-child {\n  font-size: 18px;\n  font-weight: 600;\n  color: #000000;\n  line-height: 24px;\n}\n.pro-table-wrap .pro-table-tools .pro-table-tools-actions-wrap {\n  flex: 1;\n  display: flex;\n  justify-content: flex-end;\n}\n.pro-table-wrap .pro-table-tools .pro-table-tools-actions-wrap > div {\n  margin: 0 5px;\n}\n.pro-table-wrap > .ant-table-wrapper {\n  border-radius: 4px;\n  overflow: hidden;\n}\n.pro-table-wrap .ant-table-pagination {\n  background: #fff;\n  margin: 0;\n  padding: 16px;\n}\n";
styleInject(css_248z$4);

var tableDataDefault = {
  list: [],
  page: 1,
  page_size: 10
};

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

var index$2 = /*#__PURE__*/React.memo(function (props) {
  var tabs = props.tabs,
      title = props.title,
      tableTools = props.tableTools,
      preSubmit = props.preSubmit,
      requestData = props.requestData,
      request = props.request;
  var reqDataDefault = {
    //请求参数
    page: 1,
    page_size: 10,
    search: {},
    sort: {}
  };
  var tabsReqInit = React.useRef(null);

  var _useState = React.useState(tableDataDefault),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1]; // 表格数据


  var _useState3 = React.useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectRows = _useState4[0],
      setSelectRows = _useState4[1]; // 被选中的行数据对象数组


  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectRowKeys = _useState6[0],
      setSelectRowKeys = _useState6[1]; // 被选中行的keys


  var _useState7 = React.useState(_objectSpread2(_objectSpread2({}, reqDataDefault), requestData)),
      _useState8 = _slicedToArray(_useState7, 2),
      reqData = _useState8[0],
      setReqData = _useState8[1]; // 请求数据


  var _useState9 = React.useState(true),
      _useState10 = _slicedToArray(_useState9, 2),
      loading = _useState10[0],
      setLoading = _useState10[1]; // loading

  /**
   * 请求数据
   */


  React.useEffect(function () {
    setLoading(true);
    initData();
  }, [reqData, props.reset]);
  React.useEffect(function () {
    if (tabs && Object.keys(tabs).length) {
      tabsReqInit.current = getTabsInitReq(tabs);

      if (Object.keys(tabs).length === 1) {
        if (Object.keys(tabsReqInit.current).length) {
          setReqData(_objectSpread2(_objectSpread2({}, reqData), {}, {
            search: _objectSpread2(_objectSpread2({}, reqData.search), tabsReqInit.current)
          }));
        }
      } else {
        if (Object.keys(tabsReqInit.current).length === 2) {
          setReqData(_objectSpread2(_objectSpread2({}, reqData), {}, {
            search: _objectSpread2(_objectSpread2({}, reqData.search), tabsReqInit.current)
          }));
        }
      }
    }
  }, [tabs]);
  /**
   * 初始化请求
   * @param data 请求参数，默认为
   */

  var initData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data,
          result,
          res,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _args.length > 0 && _args[0] !== undefined ? _args[0] : reqData;
              !loading && setLoading(true);

              if (!(typeof preSubmit === 'function')) {
                _context.next = 7;
                break;
              }

              _context.next = 5;
              return preSubmit(data);

            case 5:
              result = _context.sent;
              // 防止preSubmit没有返回数据
              data = result || data;

            case 7:
              _context.next = 9;
              return request({
                url: props.url,
                method: 'post',
                data: data
              });

            case 9:
              res = _context.sent;

              if (res.code === 0) {
                setTableData(_objectSpread2(_objectSpread2({}, tableData), res.data));
              } else if (res.code === '0') {
                setTableData(_objectSpread2(_objectSpread2({}, tableData), res.result));
              } else {
                antd.message.warning(res.msg || '请求超时');
              }

              setLoading(false);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function initData() {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * 表单搜索
   * 此处可过滤数据并可等待其中异步操作，所以此过滤需要返回一个promise
   */


  var submit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(values) {
      var search, submitValue;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              search = _objectSpread2(_objectSpread2({}, reqData.search), values); //过滤为空的数据

              Object.keys(search).forEach(function (item) {
                !search[item] && delete search[item];
              });
              submitValue = _objectSpread2(_objectSpread2({}, reqData), {}, {
                search: search,
                page: 1
              }); // console.log('submitValue', submitValue);
              // if (typeof preSubmit === 'function') {
              //   const result = await preSubmit(submitValue);
              //   // 防止preSubmit没有返回数据
              //   submitValue = result || submitValue;
              // }

              setReqData(submitValue);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   * 分页器事件
   * @param page
   * @param page_size
   */


  var handlePageChange = function handlePageChange(page, page_size) {
    console.log(page, page_size);
    setReqData(_objectSpread2(_objectSpread2({}, reqData), {}, {
      page: page,
      page_size: page_size
    }));
  };
  /**
   * 分页器配置
   */


  var pagination = {
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
    total: tableData.total,
    pageSize: tableData.page_size,
    current: tableData.page,
    showSizeChanger: true,
    showTotal: function showTotal(total) {
      return "\u5171".concat(total, "\u6761");
    }
  };
  /**
   * 一级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
   * @param key key值
   * @param value value
   */

  var firstTabsChange = function firstTabsChange(key, value) {
    var _tabs$secondTabs, _tabs$secondTabs2, _tabs$secondTabs3, _tabs$secondTabs3$dat, _tabs$secondTabs4, _search;

    // 默认为当前选中的值若无手动选中，则为二级tabs默认值
    var secondValue = reqData.search[(tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs = tabs.secondTabs) === null || _tabs$secondTabs === void 0 ? void 0 : _tabs$secondTabs.key) || ''] ? reqData.search[(tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs2 = tabs.secondTabs) === null || _tabs$secondTabs2 === void 0 ? void 0 : _tabs$secondTabs2.key) || ''] : tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs3 = tabs.secondTabs) === null || _tabs$secondTabs3 === void 0 ? void 0 : (_tabs$secondTabs3$dat = _tabs$secondTabs3.data.find(function (item) {
      return item.key === (tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs.defaultKey);
    })) === null || _tabs$secondTabs3$dat === void 0 ? void 0 : _tabs$secondTabs3$dat.key;

    var reqValue = _objectSpread2(_objectSpread2({}, reqData), {}, {
      search: (_search = {}, _defineProperty(_search, (tabs === null || tabs === void 0 ? void 0 : (_tabs$secondTabs4 = tabs.secondTabs) === null || _tabs$secondTabs4 === void 0 ? void 0 : _tabs$secondTabs4.key) || '', secondValue), _defineProperty(_search, key, value), _search)
    }); // const reqValue = { ...reqData, search: { [key]: value } }


    if (typeof (tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.onChange) === 'function') {
      var result = tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.onChange(key, value, reqValue);
      result ? setReqData(_objectSpread2({}, result)) : setReqData(reqValue);
      return;
    }

    setReqData(reqValue);
  };
  /**
   * 二级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
   * 二级tabs切换会带上一级tabs的值
   * @param key key值
   * @param value value
   */


  var secondTabsChange = function secondTabsChange(key, value) {
    var _tabs$firstTabs$data$, _search2;

    // 默认为当前选中的值若无手动选中，则为一级tabs默认值
    var firstTabsValue = reqData.search[(tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.key) || ''] ? reqData.search[(tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.key) || ''] : tabs === null || tabs === void 0 ? void 0 : (_tabs$firstTabs$data$ = tabs.firstTabs.data.find(function (item) {
      return item.key === (tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.defaultKey);
    })) === null || _tabs$firstTabs$data$ === void 0 ? void 0 : _tabs$firstTabs$data$.key;

    var reqValue = _objectSpread2(_objectSpread2({}, reqData), {}, {
      search: (_search2 = {}, _defineProperty(_search2, (tabs === null || tabs === void 0 ? void 0 : tabs.firstTabs.key) || '', firstTabsValue), _defineProperty(_search2, key, value), _search2)
    });

    if (typeof (tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs.onChange) === 'function') {
      var result = tabs === null || tabs === void 0 ? void 0 : tabs.secondTabs.onChange(key, value, reqValue);
      result ? setReqData(_objectSpread2({}, result)) : setReqData(reqValue);
      return;
    }

    setReqData(reqValue); // console.log('secondTabsChange', key, value);
  }; // 多选配置


  var rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectRowKeys,
    hideOnSinglePage: true,
    onChange: function onChange(selectedRowKeys, selectedRows) {
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    }
  }; // console.log('tabs',tabs);

  return /*#__PURE__*/React__default['default'].createElement(antd.ConfigProvider, {
    locale: zhCN__default['default']
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "pro-table-wrap"
  }, /*#__PURE__*/React__default['default'].createElement(ProTableHeader, {
    title: title,
    tabs: tabs,
    firstTabsChange: firstTabsChange,
    secondTabsChange: secondTabsChange
  }), props.formProps ? /*#__PURE__*/React__default['default'].createElement(Form, {
    formProps: props.formProps,
    submit: submit,
    circle: tabs && tabs.secondTabs ? false : true
  }) : null, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "pro-table-body-wrap"
  }, tableTools && renderTools(tableTools, selectRows), /*#__PURE__*/React__default['default'].createElement(antd.Table, {
    columns: props.columns,
    dataSource: tableData.list,
    rowKey: props.rowKey,
    rowSelection: props.row && rowSelection,
    size: "middle",
    onChange: onChange,
    loading: loading,
    pagination: pagination
  }))));
});
/**
 * 渲染表格工具栏
 * @param tableTools 表格tools工具栏配置
 * @param selectRows 当前选中行数据
 */

var renderTools = function renderTools(tableTools, selectRows) {
  return /*#__PURE__*/React__default['default'].createElement("div", {
    className: "pro-table-tools"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: "pro-table-tools-title"
  }, (tableTools === null || tableTools === void 0 ? void 0 : tableTools.title) ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("span", null), /*#__PURE__*/React__default['default'].createElement("span", null, tableTools.title)) : null), /*#__PURE__*/React__default['default'].createElement("div", {
    className: "pro-table-tools-actions-wrap"
  }, tableTools === null || tableTools === void 0 ? void 0 : tableTools.actions.map(function (item, index) {
    return /*#__PURE__*/React__default['default'].createElement("div", {
      key: index
    }, item === null || item === void 0 ? void 0 : item.render(selectRows));
  })));
};
/**
 * 获取tabs默认请求数据
 * @param tabs tabs配置值
 */


var getTabsInitReq = function getTabsInitReq(tabs) {
  var _tabs$firstTabs, _tabs$secondTabs5;

  var tabsReq = {}; //一级tabs默认请求数据

  if (((_tabs$firstTabs = tabs.firstTabs) === null || _tabs$firstTabs === void 0 ? void 0 : _tabs$firstTabs.defaultKey) !== null) {
    var _tabs$firstTabs2, _tabs$firstTabs3, _tabs$firstTabs3$data;

    tabsReq = _defineProperty({}, (_tabs$firstTabs2 = tabs.firstTabs) === null || _tabs$firstTabs2 === void 0 ? void 0 : _tabs$firstTabs2.key, (_tabs$firstTabs3 = tabs.firstTabs) === null || _tabs$firstTabs3 === void 0 ? void 0 : (_tabs$firstTabs3$data = _tabs$firstTabs3.data.find(function (item) {
      return item.key === tabs.firstTabs.defaultKey;
    })) === null || _tabs$firstTabs3$data === void 0 ? void 0 : _tabs$firstTabs3$data.key);
  } else {
    var _tabs$firstTabs4, _tabs$firstTabs5, _tabs$firstTabs5$data;

    tabsReq = _defineProperty({}, (_tabs$firstTabs4 = tabs.firstTabs) === null || _tabs$firstTabs4 === void 0 ? void 0 : _tabs$firstTabs4.key, (_tabs$firstTabs5 = tabs.firstTabs) === null || _tabs$firstTabs5 === void 0 ? void 0 : (_tabs$firstTabs5$data = _tabs$firstTabs5.data[0]) === null || _tabs$firstTabs5$data === void 0 ? void 0 : _tabs$firstTabs5$data.key);
  } //二级tabs默认请求数据


  if (((_tabs$secondTabs5 = tabs.secondTabs) === null || _tabs$secondTabs5 === void 0 ? void 0 : _tabs$secondTabs5.defaultKey) !== null) {
    var _tabs$secondTabs6, _tabs$secondTabs7, _tabs$secondTabs7$dat;

    tabsReq = _objectSpread2(_objectSpread2({}, tabsReq), {}, _defineProperty({}, (_tabs$secondTabs6 = tabs.secondTabs) === null || _tabs$secondTabs6 === void 0 ? void 0 : _tabs$secondTabs6.key, (_tabs$secondTabs7 = tabs.secondTabs) === null || _tabs$secondTabs7 === void 0 ? void 0 : (_tabs$secondTabs7$dat = _tabs$secondTabs7.data.find(function (item) {
      return item.key === tabs.secondTabs.defaultKey;
    })) === null || _tabs$secondTabs7$dat === void 0 ? void 0 : _tabs$secondTabs7$dat.key));
  } else {
    var _tabs$secondTabs8, _tabs$secondTabs9, _tabs$secondTabs9$dat;

    tabsReq = _objectSpread2(_objectSpread2({}, tabsReq), {}, _defineProperty({}, (_tabs$secondTabs8 = tabs.secondTabs) === null || _tabs$secondTabs8 === void 0 ? void 0 : _tabs$secondTabs8.key, (_tabs$secondTabs9 = tabs.secondTabs) === null || _tabs$secondTabs9 === void 0 ? void 0 : (_tabs$secondTabs9$dat = _tabs$secondTabs9.data[0]) === null || _tabs$secondTabs9$dat === void 0 ? void 0 : _tabs$secondTabs9$dat.key));
  }
  /**
   * 过滤空值
   */


  Object.keys(tabsReq).forEach(function (item) {
    !tabsReq[item] && delete tabsReq[item];
  });
  return tabsReq;
}; // /**
//  * 判断tabs默认请求数据是否返回
//  */
// const checkTabsInitReq = (tabs) => {
//     const tabsLength = Object.keys(tabs).length;
//     let tabsReqInit = {};
//     if (tabsLength) {
//         tabsReqInit = getTabsInitReq(tabs)
//         if (Object.keys(tabsReqInit).length === tabsLength) {
//             // if (Object.keys(tabsReqInit).length) {
//             //     setReqData({ ...reqData, search: { ...reqData.search, ...tabsReqInit } })
//             // }
//         }
//     }
// }

exports.FSForm = Form;
exports.FSTable = index$2;
exports.Form = Form;
exports.Layout = index;
exports.PageContainer = index$1;
exports.ProTable = index$2;
exports.Table = index$2;
