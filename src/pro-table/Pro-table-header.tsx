import React, { memo, useState, useEffect } from 'react';
import { Tabs, Button, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { tabsType } from './type';
import './pro-table-header.less';

const { TabPane } = Tabs;
interface HeaderProps {
  title: string;
  tabs?: tabsType;
  firstTabsChange: (
    key: string | number | undefined,
    value: string | number | undefined,
  ) => void;
  secondTabsChange: (
    key: string | number | undefined,
    value: string | number | undefined,
  ) => void;
}

export default memo(function (props: HeaderProps) {
  const { title, tabs, firstTabsChange, secondTabsChange } = props;

  const [firstTab, setFirstTab] = useState(tabs?.firstTabs?.defaultKey || '1'); // 一级菜单active
  const [secondTab, setSecondTab] = useState(tabs?.secondTabs?.defaultKey || 1); // 二级菜单active
  const [rotate, setRotate] = useState(tabs?.secondTabs?.defaultOpen ? 0.5 : 0); // 旋转角度

  useEffect(() => {
    /// 实现动态修改 二级defaultKey 后不刷新的问题
      if(tabs?.secondTabs?.defaultKey !== secondTab){
        setSecondTab(tabs?.secondTabs.defaultKey || 1);// 避免ts报错
      }
      if(tabs?.firstTabs?.defaultKey !== secondTab){
        setFirstTab(tabs?.firstTabs.defaultKey || '1');// 避免ts报错
      }
  }, [tabs])

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
    setFirstTab(value+'');
    // console.log(value);
    
    // console.log('一级切换111', tabs?.secondTabs?.defaultKey);
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
  
  return (
    <header className="pro-table-header-wrap">
      <h2>{title || ''}</h2>
      {tabs && tabs.firstTabs && (
        <section className="first">
          <Tabs
            activeKey={firstTab}
            defaultActiveKey={tabs.firstTabs.defaultKey}
            onChange={e => tabFirstTabsChange(tabs.firstTabs.key, e)}
          >
            {tabs.firstTabs.data.map(item => (
              <TabPane tab={item.label} key={item.key} />
            ))}
          </Tabs>
        </section>
      )}

      {tabs && tabs.secondTabs && (
        <section className="second">
          <span>{tabs.secondTabs.title}：</span>
          <Row  className={rotate ? "second-content second-content-active" : "second-content"} gutter={[0, 16]}>
            {tabs.secondTabs.data.map((item, index) => {
              if (rotate) {
                return (
                  <Button
                    className="second-btn"
                    size="small"
                    type={secondTab === item.key ? 'primary' : 'text'}
                    onClick={() =>
                      tabSecondTabsChange(tabs.secondTabs.key, item.key)
                    }
                  >
                    {item.label}
                  </Button>
                );
              } else {
                return (
                  <Button
                    className="second-btn"
                    size="small"
                    type={secondTab === item.key ? 'primary' : 'text'}
                    onClick={() =>
                      tabSecondTabsChange(tabs.secondTabs.key, item.key)
                    }
                  >
                    {item.label}
                  </Button>
                );
              }
            })}
          </Row>

          <div className="toggle-wrap">
            {/* <div>
              <Button type="link">编辑</Button>
            </div> */}
            <div className="toggle-item">
              <Button
                type="link"
                onClick={() => (rotate ? setRotate(0) : setRotate(0.5))}
              >
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
