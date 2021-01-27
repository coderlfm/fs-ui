import React, { memo, useState, useEffect } from 'react';
import { Tabs, Button, Row, Col, Grid } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { tabsType } from './type';
import './pro-table-header.less';

const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
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

const colSettingDefault = { xs: 12, sm: 8, md: 8, lg: 6, xl: 3, xxl: 2 }; // 列默认配置

export default memo(function(props: HeaderProps) {
  const screens = useBreakpoint();
  const { title, tabs, firstTabsChange, secondTabsChange } = props;

  const [secondTab, setSecondTab] = useState(tabs?.secondTabs?.defaultKey || 1); // 二级菜单active
  const [rotate, setRotate] = useState(tabs?.secondTabs?.defaultOpen ? 0.5 : 0); // 旋转角度
  const [hiddenNum, setHiddenNum] = useState(8); // 隐藏条数
  const [colSetting] = useState({
    ...colSettingDefault,
    ...tabs?.secondTabs?.col,
  }); // 列配置

  const screenlist = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']; // 响应尺寸

  useEffect(() => {
    setHiddenNum(computeHideNum(screens));
  }, [screens]);

  /**
   * 计算隐藏行
   * @param screens 当前屏幕尺寸
   */
  const computeHideNum = screens => {
    let hideNum = 8;

    for (let i = 0; i < screenlist.length; i++) {
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
  const tabFirstTabsChange = (key, value) => {
    //该处为解决 antd 默认将 activeKey转成string型
    if (typeof tabs?.secondTabs?.defaultKey === 'number') {
      value = parseFloat(value);
    }
    firstTabsChange(key, value);
    console.log('一级切换111', tabs?.secondTabs?.defaultKey);
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

  return (
    <header className="pro-table-header-wrap">
      <h2>{title || ''}</h2>
      {tabs && tabs.firstTabs && (
        <section className="first">
          <Tabs
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
          <Row className="second-content" gutter={[0, 16]}>
            {tabs.secondTabs.data.map((item, index) => {
              if (rotate) {
                return (
                  <Col key={item.key} {...colSetting}>
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
                  </Col>
                );
              } else {
                if (index < hiddenNum) {
                  return (
                    <Col key={item.key} {...colSetting}>
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
                    </Col>
                  );
                } else {
                  return null;
                }
              }
            })}
          </Row>

          <div className="toggle-wrap">
            <div>
              <Button type="link">编辑</Button>
            </div>
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
