import React, { memo, useEffect, useState } from 'react';
import { Table } from 'fs-pro-ui';
// import Table from '../index';
import { Button } from 'antd';
import request from '../../utils/request';
import { propsType, tabsType } from '../type';

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

/**
 * 过滤搜索值
 * @param {Object} values
 */
const preSubmit = async values => {
  console.log('values', values);
  return Promise.resolve(values);
};

export default memo(function() {
  const [firstfaultKey, setFirstDefaultKey] = useState('');
  const [secondDefaultKey, setSecondDefaultKey] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFirstDefaultKey('4');
    }, 1000);
  }, []);

  // console.log('secondDefaultKey', secondDefaultKey);

  const tabs: tabsType = {
    firstTabs: {
      key: 'channel',
      onChange: (key, value, reqValue) => {
        return { ...reqValue, page: 1 };
      },
      defaultKey: firstfaultKey,
      data: [
        {
          label: '全部',
          key: '1',
        },
        {
          label: '频道名称1',
          key: '2',
        },
        {
          label: '频道名称2',
          key: '3',
        },
        {
          label: '频道名称3',
          key: '4',
        },
      ],
    },
    secondTabs: {
      title: '频道',
      key: 'channel',
      onChange: false,
      defaultKey: firstfaultKey,
      data: [
        {
          label: '全部',
          key: undefined,
        },
        {
          label: '频道名称1',
          key: '2',
        },
        {
          label: '频道名称2',
          key: '3',
        },
        {
          label: '频道名称3',
          key: '4',
        },
        {
          label: '全部',
          key: '5',
        },
        {
          label: '频道名称1',
          key: '6',
        },
        {
          label: '频道名称2',
          key: '7',
        },
        {
          label: '频道名称3',
          key: '8',
        },
        {
          label: '全部',
          key: '9',
        },
        {
          label: '频道名称1',
          key: '10',
        },
        {
          label: '频道名称2',
          key: '11',
        },
        {
          label: '频道名称3',
          key: '12',
        },
      ],
    },
  };

  // 表格行配置
  const columns: propsType['columns'] = [
    {
      title: 'd id',
      dataIndex: 'order_id',
      align: 'center',
    },
    {
      title: '商品名称',
      dataIndex: 'product_name',
      ellipsis: true,
      width: 300,
    },
    {
      title: '商品价格',
      dataIndex: 'market_price',
    },
  ];

  // 表格工具
  const tableTools = {
    title: '京东商品列表',
    actions: [
      {
        render: rows => {
          return <Button type="primary">同步</Button>;
        },
      },
      {
        render: rows => <Button type="primary">新增</Button>,
      },
    ],
  };

  return (
    <div>
      <Table
        request={request}
        url="order/list"
        title={() => '京东商品'}
        requestData={{ section_id: 2 }}
        tabs={tabs}
        tableTools={tableTools}
        formProps={formProps}
        columns={columns}
        rowKey="order_id"
        preSubmit={preSubmit}
        otherTableProps={{
          pullRefresh: true,
        }}
        scroll={{ y: 300 }}
      />
    </div>
  );
});
