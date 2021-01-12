import React, { memo } from 'react'
import { Button } from 'antd'

export default memo(function () {

    return (
        <>
            <p>
                <Button type="primary">默认按钮</Button>
                <Button type="warning">警告按钮</Button>
                <Button type="primary" danger>危险按钮</Button>
                <Button disabled>禁用按钮</Button>
            </p>

            <p>
                <Button type="primary-sub" >默认按钮</Button>
                <Button type="warning-sub" >警告按钮</Button>
                <Button danger>危险按钮</Button>
                <Button type="disabled-sub" disabled>禁用按钮</Button>
            </p>

            <p>
                <Button type="primary" shape="round" >默认按钮</Button>
                <Button type="warning" shape="round" >警告按钮</Button>
                <Button type="danger" shape="round" danger>危险按钮</Button>
                <Button type="disabled" shape="round" disabled>禁用按钮</Button>
            </p>

        </>
    )
})
