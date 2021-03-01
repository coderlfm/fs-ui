import React from 'react';

import { ReactElement } from 'react/index';
import { ColumnsType, TableProps } from 'antd/es/table/Table';
import { PanelRender } from 'rc-table/lib/interface';

export interface tableDataType {
  list: Array<dataType>;
  page?: number;
  page_size?: number;
  total?: number;
}

/**
 * 请求参数
 */
export interface reqType {
  page: number;
  page_size: number;
  search?: object;
  // 板块id
  section_id?: string | undefined | number;
  sort?: {
    crate_id: String;
  };
}

export interface dataType {
  key?: string;
  name?: string;
  age?: number;
  address?: string;
}

interface tabsDataType {
  // section_name: string | undefined | number,
  // section_id: string | undefined | number,
  label: string;
  status?: string | undefined;
  key: string | undefined | number;
}

interface tabsItemType {
  defaultKey: string | undefined;

  onChange?:
    | undefined
    | ((
        key: string | number | undefined,
        value: string | number | undefined,
        reqData: object,
      ) => any)
    | boolean;

  title?: string;

  // 传给后端的key
  key: string;

  data: Array<tabsDataType>;

  //二级菜单响应式配置
  col?: any; //响应式配置

  // 二级菜单默认展开
  defaultOpen?: boolean;
}

export interface tabsType {
  firstTabs?: tabsItemType;
  secondTabs?: tabsItemType;
}

/**
 * 工具栏类型
 */
interface toolType {
  title?: string;
  buttons?: () => ReactElement;
  render: (selectRows: Array<any>) => ReactElement;
}

export interface propsType<RecordType extends object = any>
  extends TableProps<RecordType> {
  /**
   *
   * @description 标题
   */
  // @override
  // title: PanelRender<RecordType>;

  /**
   * 行配置
   */

  // columns: ColumnsType<object>;

  /**
   * tabs配置
   */

  tabs?: tabsType;

  /**
   * 表单配置
   */
  formProps: any;

  /**
   * 工具栏配置
   */

  tableTools?: {
    /**
     * 工具栏标题
     */
    title: string;
    /**
     * 工具栏按钮
     */
    actions: Array<toolType>;
  };

  request: any;

  /**
   * 搜索前过滤
   */

  preSubmit?: (values: any) => any;

  /**
   * 请求地址
   */

  url: string;

  /**
   * 自定义请求数据
   */

  requestData?: any;

  /**
   * 是否开启选中
   */

  row?: undefined;

  /**
   * 唯一key
   */

  rowKey: string | (() => string);

  /**
   * 刷新
   */

  reset?: boolean;

  /**
   * 成功回调
   */
  successCb?: Function;

  /**
   * 是否分页
   * ! 暂时未添加
   */
  paginationFlag?: boolean;

  /**
   * 表格其它配置项
   */
  // declare function Table<RecordType extends object = any>(props: TableProps<RecordType>): JSX.Element;
  otherTableProps?: {
    /**
     * 行配置
     */

    columns: ColumnsType<object>;

    /**
     * 唯一key
     */

    rowKey: string | (() => string);

    /**
     * 表格改变
     */
    onChange: (pagination: any, filters: any, sorter: any, extra: any) => void;

    /**
     * 展开项
     */
    expandable: any;

    /**
     * 行点击
     */
    onRow: any;

    /**
     * 下拉刷新
     */
    pullRefresh: {
      offsetBottom?: 10;
      throttleDelay?: number;
      onChange?: () => void;
    };
  };
}
