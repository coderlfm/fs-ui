import React, { memo } from 'react'
import { Switch } from 'antd'

export default memo(function () {

    return (
        <>
            <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />&nbsp;
            <Switch checkedChildren="是" unCheckedChildren="否"  />
            <br /><br />
            <Switch disabled defaultChecked />&nbsp;
            <Switch disabled />

        </>
    )
})
