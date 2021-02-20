export interface tableDataType {
  list: Array<dataType>;
  page?: number;
  pageSize?: number;
  total?: number;
}

/**
 * 请求参数
 */
export interface reqType {
  page: number;
  pageSize: number;
  search?: object;
}

export interface dataType {
  key?: string;
  name?: string;
  age?: number;
  address?: string;
}

interface tabsDataType {
  label: string | undefined;
  key: string | undefined;
}

export interface propsTpe {
  // 标题
  title: string;

  // 行配置
  columns: [];

  // tabs配置
  tabs: {
    defauleKey: string | undefined;
    onChange: () => void;
    data: Array<tabsDataType>;
  };

  request: any;

  // 表单配置
  formProps: any;

  // 请求地址
  url: string;

  // 唯一key
  rowKey: string | ((record:object) => string);

  // 刷新
  reset: boolean;
}
