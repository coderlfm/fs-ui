import React from 'react';
import { FormProps } from 'antd/es/form/Form';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ButtonProps } from 'antd/es/button/index';

export interface propsType {
  /**
   * 标题
   */
  propTitle: string | React.ReactNode;

  /**
   * 初始值
   */
  initValue?: Object;

  /**
   * 表单
   */
  formArr: Array<formItemType>;

  /**
   * 按钮配置项
   */
  config: Array<formconfigItemType>;

  /**
   * Form 配置项
   */
  layoutConfig?: FormProps;
}

/**
 * form Item
 */
export interface formItemType {
  /**
   * label标题
   */
  title: string | number | null | undefined;

  /**
   * 表单类型配置项
   */
  search: Array<formItemSearchType>;
}

interface formItemSearchType {
  /**
   * Form.Item 配置项
   */
  wrap: formItemSearchWrapType;

  /**
   * Form 渲染的props
   */
  props: any;
}

interface formItemSearchWrapType extends FormItemProps {
  type: formItemInputType;
}

/**
 * 按钮配置项
 */
interface formconfigItemType {
  /**
   * 按钮文字
   */
  text: string | number | null | undefined;

  /**
   * 按钮 props
   */
  wrap: ButtonProps;

  /**
   * 按钮类型
   */
  type: formconfigItemButtonType | undefined;

  /**
   * 按钮点击事件
   */
  onBtnClick: (value: any) => void;
}

/**
 * 按钮类型，枚举
 */
export enum formconfigItemButtonType {
  submit = 'submit',
  reste = 'reste',
}

/**
 * input框类型
 */
export enum formItemInputType {
  input = 'input',
  select = 'select',
  rangepicker = 'rangepicker',
  timepicker = 'timepicker',
  datepicker = 'datepicker',
  radio = 'radio',
  checkbox = 'checkbox',
  textarea = 'textarea',
  procheckbox = 'procheckbox',
  proupload = 'proupload',
  proformlist = 'proformlist',
}
