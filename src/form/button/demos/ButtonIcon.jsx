/**
 * title: 图标按钮
 * desc: 在这个例子中， useRequest 接收了一个异步函数 `getUsername` ，在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 `loading` , `data` , `error` 等状态。
 */

import React, { memo } from 'react'
import { Button, Radio } from 'antd'
import { BulbOutlined } from '@ant-design/icons'

export default memo(function () {
    return (
        <>
            <Button type="primary" icon={<BulbOutlined />}>按钮</Button>
            <Button type="primary" shape="round" icon={<BulbOutlined />}>按钮</Button>
            <Button type="primary-sub" icon={<BulbOutlined />}>按钮</Button>
            <br /><br />

            <Button disabled type="primary" icon={<BulbOutlined />}>按钮</Button>
            <Button disabled type="primary" shape="round" icon={<BulbOutlined />}>按钮</Button>
            <Button disabled type="primary-sub" icon={<BulbOutlined />}>按钮</Button>
            <br /><br /><br />

            
            <Button type="primary" loading>加载中</Button>
            <br /><br /><br />

            <Radio.Group defaultValue="0" buttonStyle="solid">
                <Radio.Button value="0">商家</Radio.Button>
                <Radio.Button value="1">上架</Radio.Button>
                <Radio.Button value="2">下架</Radio.Button>
            </Radio.Group>

        </>
    )
})
