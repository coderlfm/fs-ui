import React, { memo, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Table, message, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import Form from '../pro-form';
import ProTableHeader from './Pro-table-header';

// import 'antd/dist/antd.css';
import './index.less';
// import 'antd/lib/table/style/index.less';
import 'antd/dist/antd.css';

const tableDataDefault = { list: [], page: 1, page_size: 10 };

const reqDataDefault = {
  //请求参数
  page: 1,
  page_size: 10,
  search: {},
  sort: { create_at: 'desc' },
};

function onChange(pagination, filters, sorter, extra) {
  // console.log('params', pagination, filters, sorter, extra);
}

export default memo(function (props) {
  const { tabs, title, tableTools, preSubmit, requestData, request, otherTableProps, ...other } = props;

  const tabsReqInit = useRef(null);
  const isPullRefresh = useRef(false); // 是否

  const [tableData, setTableData] = useState(tableDataDefault); // 表格数据
  const [selectRows, setSelectRows] = useState([]); // 被选中的行数据对象数组
  const [selectRowKeys, setSelectRowKeys] = useState([]); // 被选中行的keys
  // debugger
  const [reqData, setReqData] = useState({ ...reqDataDefault, ...requestData }); // 请求数据
  const [loading, setLoading] = useState(true); // loading

  /**
   * 请求数据
   */
  useEffect(() => {
    setLoading(true);
    initData();
  }, [reqData, props.reset]);

  useEffect(() => {
    if (tabs && Object.keys(tabs).length) {
      tabsReqInit.current = getTabsInitReq(tabs);
      if (Object.keys(tabs).length === 1) {
        if (Object.keys(tabsReqInit.current).length) {
          setReqData({
            ...reqData,
            search: { ...reqData.search, ...tabsReqInit.current },
          });
        }
      } else {
        if (Object.keys(tabsReqInit.current).length === 2) {
          setReqData({
            ...reqData,
            search: { ...reqData.search, ...tabsReqInit.current },
          });
        }
      }
    }
  }, [tabs]);

  /**
   * 初始化请求
   * @param data 请求参数，默认为
   */
  const initData = async (data = reqData) => {
    !loading && setLoading(true);

    if (typeof preSubmit === 'function') {
      const result = await preSubmit(data);
      if (result === false) return;
      // 防止preSubmit没有返回数据
      data = result || data;
    }

    // debugger;
    const res = await request({ url: props.url, method: 'post', data });

    if (res.code === 0) {
      if (isPullRefresh.current) {
        isPullRefresh.current = false;
        setTableData({
          ...tableData,
          ...res.data,
          list: [...tableData.list, ...res.data.list],
        });
      } else {
        setTableData({ ...tableData, ...res.data });
      }
    } else if (res.code === '0') {
      if (isPullRefresh.current) {
        isPullRefresh.current = false;
        setTableData({
          ...tableData,
          ...res.data,
          list: [...tableData.list, ...res.result.list],
        });
      } else {
        setTableData({ ...tableData, ...res.result });
      }
    } else {
      message.warning(res.msg || '请求超时');
    }
    setLoading(false);
  };

  /**
   * 表单搜索
   * 此处可过滤数据并可等待其中异步操作，所以此过滤需要返回一个promise
   */
  const submit = async (values) => {
    const search = Object.keys(values).length ? { ...reqData.search, ...values } : values;
    //过滤为空的数据
    Object.keys(values).length && Object.keys(search).forEach((item) => !search[item] && delete search[item]);
    setReqData({ ...reqData, search, page: 1 });
  };

  /**
   * 分页器事件
   * @param page
   * @param page_size
   */
  const handlePageChange = (page, page_size) => setReqData({ ...reqData, page, page_size });

  /**
   * 分页器配置
   */
  const pagination = {
    onChange: handlePageChange,
    onShowSizeChange: handlePageChange,
    total: tableData.total,
    pageSize: tableData.page_size,
    current: tableData.page,
    showSizeChanger: true,
    showTotal: (total) => `共${total}条`,
  };

  /**
   * 一级tabs切换，传入onChange函数则会将该函数的返回值设为请求参数
   * @param key key值
   * @param value value
   */
  const firstTabsChange = (key, value) => {
    // 默认为当前选中的值若无手动选中，则为二级tabs默认值
    const secondValue = reqData.search[tabs?.secondTabs?.key || '']
      ? reqData.search[tabs?.secondTabs?.key || '']
      : tabs?.secondTabs?.data.find((item) => item.key === tabs?.secondTabs?.defaultKey)?.key;

    const reqValue = {
      ...reqData,
      search: { [tabs?.secondTabs?.key || '']: secondValue, [key]: value },
    };

    // debugger
    // const reqValue = { ...reqData, search: { [key]: value } }
    if (typeof tabs?.firstTabs?.onChange === 'function') {
      const result = tabs?.firstTabs.onChange(key, value, reqValue);
      result ? setReqData({ ...result }) : setReqData(reqValue);
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
  const secondTabsChange = (key, value) => {
    // 默认为当前选中的值若无手动选中，则为一级tabs默认值
    const firstTabsValue = reqData.search[tabs?.firstTabs?.key || '']
      ? reqData.search[tabs?.firstTabs?.key || '']
      : tabs?.firstTabs?.data?.find((item) => item.key === tabs?.firstTabs?.defaultKey)?.key;

    const reqValue = {
      ...reqData,
      search: { [tabs?.firstTabs?.key || '']: firstTabsValue, [key]: value },
    };

    if (typeof tabs?.secondTabs?.onChange === 'function') {
      const result = tabs?.secondTabs.onChange(key, value, reqValue);
      result ? setReqData({ ...result }) : setReqData(reqValue);
      return;
    }
    setReqData(reqValue);
    // console.log('secondTabsChange', key, value);
  };

  // 多选配置
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys: selectRowKeys,
    hideOnSinglePage: true,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectRowKeys(selectedRowKeys);
      setSelectRows(selectedRows);
    },
  };

  return (
    // <ConfigProvider locale={zhCN}>
    <div className="pro-table-wrap">
      <ProTableHeader title={title} tabs={tabs} firstTabsChange={firstTabsChange} secondTabsChange={secondTabsChange} />
      {Object.keys(props.formProps).length > 0 && (
        <Form formProps={props.formProps} submit={submit} circle={tabs && tabs.secondTabs ? false : true} resetIsRequest={true} />
      )}
      <div
        className="pro-table-body-wrap"
        // onScrollCapture={e => onScrollEvent(e)}
      >
        {tableTools && renderTools(tableTools, selectRows)}

        <Table
          {...otherTableProps}
          columns={props.columns}
          dataSource={tableData.list}
          rowKey={props.rowKey}
          rowSelection={props.row && rowSelection}
          size="middle"
          onChange={onChange}
          loading={loading}
          pagination={otherTableProps?.pullRefresh ? false : pagination}
          {...other}
        />
      </div>
    </div>
    // {/* </ConfigProvider> */}
  );
});

/**
 * 渲染表格工具栏
 * @param tableTools 表格tools工具栏配置
 * @param selectRows 当前选中行数据
 */
const renderTools = (tableTools, selectRows) => {
  const antion = (action) => {
    const oldEl = action?.render(selectRows);
    return React.cloneElement(oldEl, {
      onClick(e) {
        // 重写 onClick
        if (action.verify && selectRows.length === 0) {
          message.warning('请勾选需要操作的表格行');
          return;
        }
        oldEl.props.onClick && oldEl.props.onClick(e);
      },
    });
  };

  return (
    <div className="pro-table-tools">
      <div className="pro-table-tools-title">
        {tableTools?.title && (
          <>
            <span></span>
            <span>{tableTools.title}</span>
          </>
        )}
      </div>
      <div className="pro-table-tools-actions-wrap">
        {tableTools?.actions?.map((item, index) => (
          <div key={index}>{antion(item)}</div>
        ))}
      </div>
    </div>
  );
};

/**
 * 获取tabs默认请求数据
 * @param tabs tabs配置值
 */
const getTabsInitReq = (tabs) => {
  let tabsReq = {};

  //一级tabs默认请求数据
  if (tabs.firstTabs?.defaultKey !== null) {
    tabsReq = {
      [tabs.firstTabs?.key]: tabs.firstTabs?.data.find((item) => item.key === tabs.firstTabs.defaultKey)?.key,
    };
  } else {
    tabsReq = { [tabs.firstTabs?.key]: tabs.firstTabs?.data[0]?.key };
  }

  //二级tabs默认请求数据
  if (tabs.secondTabs?.defaultKey !== null) {
    tabsReq = {
      ...tabsReq,
      [tabs.secondTabs?.key]: tabs.secondTabs?.data.find((item) => item.key === tabs.secondTabs.defaultKey)?.key,
    };
  } else {
    tabsReq = {
      ...tabsReq,
      [tabs.secondTabs?.key]: tabs.secondTabs?.data[0]?.key,
    };
  }

  /**
   * 过滤空值
   */
  Object.keys(tabsReq).forEach((item) => {
    !tabsReq[item] && delete tabsReq[item];
  });

  return tabsReq;
};

// /**
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
