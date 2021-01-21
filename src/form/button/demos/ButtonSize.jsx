/**
 * title: 不同大小按钮
 * desc: 小按钮  常用于筛选条件, 默认按钮  常用于查询带icon的按钮, 大按钮 常用于文字较多带有重要意义的地方
 */

import React, { memo } from 'react'
import { Button } from 'antd'

export default memo(function () {
    return (
        <>
            <Button size="small" type="primary" >小按钮</Button>
            <Button size="small" type="primary" shape="round" >小按钮</Button>
            <Button size="small" type="primary-sub" >小按钮</Button>
            <br /><br />

            <Button size="default" type="primary" >默认按钮</Button>
            <Button size="default" type="primary" shape="round" >默认按钮</Button>
            <Button size="default" type="primary-sub" >默认按钮</Button>
            <br /><br />

            <Button size="large" type="primary" >大按钮</Button>
            <Button size="large" type="primary" shape="round" >大按钮</Button>
            <Button size="large" type="primary-sub" >大按钮</Button>
            <br /><br />

        </>
    )
})
