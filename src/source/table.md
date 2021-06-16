## table

## index.jsx

```jsx | pure
import React, { memo, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Table, message, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import Form from '../pro-form';
import ProTableHeader from './Pro-table-header';

import 'antd/dist/antd.less';
import './index.less';

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
```

## index.less

```less | pure
#pro-table-base {
  background-color: #f0f2f5;
}

.pro-table-wrap {
  height: 100%;
  // background-color: #eee;
  // border: 1px solid blue;

  .pro-table-body-wrap {
    border-radius: 4px;
    overflow: hidden;

    .ant-table-cell {
      text-align: center;
    }
    .expander-content-wrap {
      text-align: left;
    }
  }

  // 工具栏
  .pro-table-tools {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    // padding: 12px 0;
    padding-right: 24px;

    > .pro-table-tools-title {
      display: flex;
      align-items: center;
      margin: 16px 0;

      > span:first-child {
        width: 4px;
        height: 16px;
        background: #d8d8d8 linear-gradient(315deg, #35fcff 0%, #0443fc 100%);
        border-radius: 2px;
        margin-right: 10px;
      }

      > span:last-child {
        font-size: 18px;
        font-weight: 600;
        color: #000000;
        line-height: 24px;
      }
    }
    // 工具栏actions
    .pro-table-tools-actions-wrap {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      button {
        margin: 12px 5px;
        border-radius: 4px;
        // padding: 6px 13px;
      }
      > div:last-child button {
        margin-right: 0;
      }
    }
  }

  > .ant-table-wrapper {
    border-radius: 4px;
    overflow: hidden;
  }

  .ant-table-pagination {
    background: #fff;
    margin: 0;
    padding: 16px;
  }
}
```

### ProTableHeader.jsx

```jsx | pure
import React, { memo, useState, useEffect } from 'react';
import { Tabs, Button, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './pro-table-header.less';

const { TabPane } = Tabs;

export default memo(function (props) {
  const { title, tabs, firstTabsChange, secondTabsChange } = props;

  const [firstTab, setFirstTab] = useState(tabs?.firstTabs?.defaultKey || '1'); // 一级菜单active
  const [secondTab, setSecondTab] = useState(tabs?.secondTabs?.defaultKey || 1); // 二级菜单active
  const [rotate, setRotate] = useState(tabs?.secondTabs?.defaultOpen ? 0.5 : 0); // 旋转角度

  useEffect(() => {
    /// 实现动态修改 二级defaultKey 后不刷新的问题
    if (tabs?.secondTabs && tabs?.secondTabs?.defaultKey !== secondTab) {
      setSecondTab(tabs?.secondTabs.defaultKey || 1); // 避免ts报错
    }
    if (tabs?.firstTabs && tabs?.firstTabs?.defaultKey !== secondTab) {
      setFirstTab(tabs?.firstTabs.defaultKey || '1'); // 避免ts报错
    }
  }, [tabs]);

  /**
   * 一级tabs切换
   * @param key
   */
  const tabFirstTabsChange = (key, value) => {
    //该处为解决 antd 默认将 activeKey转成string型
    if (typeof tabs?.firstTabs?.defaultKey === 'number') {
      value = parseFloat(value);
    }
    firstTabsChange(key, value);
    setFirstTab(value + '');

    setSecondTab(tabs?.secondTabs?.defaultKey || 1);
  };

  /**
   * 二级tabs切换
   * @param key
   */
  const tabSecondTabsChange = (key, value) => {
    secondTabsChange(key, value);
    setSecondTab(value);
  };

  // console.log('tabs.firstTabs.defaultKey', tabs?.firstTabs.defaultKey);

  // console.log(title);

  return (
    <header className="pro-table-header-wrap">
      <h2>{title || ''}</h2>
      {tabs && tabs.firstTabs && (
        <section className="first">
          <Tabs
            activeKey={firstTab}
            defaultActiveKey={tabs.firstTabs.defaultKey}
            onChange={(e) => tabFirstTabsChange(tabs?.firstTabs?.key, e)}
            onTabClick={(key, e) => {
              console.log('key', key, e);
            }}
          >
            {tabs.firstTabs.data.map((item) => (
              <TabPane tab={item.label} key={item.key} />
            ))}
          </Tabs>
        </section>
      )}

      {tabs && tabs.secondTabs && (
        <section className="second">
          <span>{tabs.secondTabs.title}：</span>
          <Row className={rotate ? 'second-content second-content-active' : 'second-content'}>
            {tabs.secondTabs.data.map((item, index) => {
              if (rotate) {
                return (
                  <div className="second-btn-wrap">
                    <Button
                      className="second-btn"
                      size="small"
                      type={secondTab === item.key ? 'primary' : 'text'}
                      onClick={() => tabSecondTabsChange(tabs?.secondTabs?.key, item.key)}
                    >
                      {item.label}
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div className="second-btn-wrap">
                    <Button
                      className="second-btn"
                      size="small"
                      type={secondTab === item.key ? 'primary' : 'text'}
                      onClick={() => tabSecondTabsChange(tabs?.secondTabs?.key, item.key)}
                    >
                      {item.label}
                    </Button>
                  </div>
                );
              }
            })}
          </Row>

          <div className="toggle-wrap">
            {/* <div>
              <Button type="link">编辑</Button>
            </div> */}
            <div className="toggle-item">
              <Button type="link" onClick={() => (rotate ? setRotate(0) : setRotate(0.5))}>
                {rotate ? '收起' : '展开'}
                <DownOutlined
                  style={{
                    transition: 'all 0.3s ease 0s',
                    transform: `rotate(${rotate}turn)`,
                  }}
                />
              </Button>
            </div>
          </div>
        </section>
      )}
    </header>
  );
});
```

### ProTableHeader.less

```less | pure
@primary-color: #1890ff;

/*  底部横条 */
.ant-tabs-ink-bar {
  height: 4px !important;
  background: linear-gradient(315deg, #35fcff 0%, #0443fc 100%) !important;
  border-radius: 2px !important;
}

.pro-table-header-wrap {
  font-weight: bolder;

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  > h2 {
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 24px;
    // margin: 16px 0;
    margin-bottom: 16px;
  }

  > section {
    padding: 0 24px;
    background-color: #fff;
    .ant-tabs-nav {
      height: 100%;
    }
  }

  .first {
    // border-bottom: 5px solid #f0f2f5;
    border-radius: 4px;
    margin-bottom: 4px;
    // height: 58px;
    display: flex;
    font-weight: 600;

    .ant-tabs-tab-btn {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
    }

    // // 激活标签
    // .ant-tabs-tab-active .ant-tabs-tab-btn {
    //   color: #1890ff !important;
    //   font-weight: 600 !important;
    // }

    // // 底部横条
    // .ant-tabs-ink-bar {
    //   height: 4px;
    //   background: linear-gradient(315deg, #35fcff 0%, #0443fc 100%);
    //   border-radius: 2px;
    // }
  }

  .second {
    // 此处不能写死
    min-height: 48px;
    padding-top: 10px;
    display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    font-weight: 500;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    > span,
    .toggle-wrap {
      text-align: center;
      line-height: 48px;
    }

    .second-content {
      flex-basis: 0;
      flex-grow: 1;
      height: 48px;
      overflow: hidden;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      // padding-top: 8px;

      .second-btn-wrap {
        height: 48px;
        display: flex;
      }

      .second-btn {
        border-radius: 12px;
        margin: auto;
        color: rgba(0, 0, 0, 0.65);
      }

      .ant-btn-primary {
        color: #fff;
      }
    }

    .second-content-active {
      height: 100%;
    }

    //  toggle
    .toggle-wrap {
      display: flex;
      .anticon-down {
        color: @primary-color;
      }

      button {
        padding-top: 0;
        margin-right: 0;
        .anticon-down {
          line-height: 0;
          > svg {
            line-height: 0;
          }
        }
      }
    }

    .toggle-wrap:last-child button {
      padding-right: 0;
    }
  }
}
```
