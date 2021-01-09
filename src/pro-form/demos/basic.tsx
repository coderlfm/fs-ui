import React, { memo } from 'react';
import Form from '../index';

// 表单配置
const formProps = {
  search: [
    {
      wrap: {
        key: 'product_name',
        name: 'product_name',
        label: '商品名称',
        type: 'input',
        col: {
          xs: 24,
          sm: 8,
          xl: 6,
        },
      },
      props: {
        placeholder: '请输入商品名称',
      },
    },
  ],
  config: {
    submit: {
      text: '查询',
    },
    reset: {
      text: '重置',
    },
  },
  layoutConfig: {
    layout: 'inline',
  },
};

export default memo(function() {
  /**
   * 过滤搜索值
   * @param {Object} values
   */
  const submit = values => {
    return values;
  };

  return (
    <div>
      <Form formProps={formProps} submit={submit} circle={true} />
    </div>
  );
});
