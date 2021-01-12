import React, { memo } from 'react'
import { Tabs } from "antd";

const { TabPane } = Tabs;

export default memo(function () {
    return (
        <div className="page-container-wrap">
            <div className="page-container-header"></div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                    Tab 1
                </TabPane>
                <TabPane tab="Tab 2" disabled key="2">
                    Tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Tab 3
                </TabPane>
            </Tabs>

        </div>
    )
})
