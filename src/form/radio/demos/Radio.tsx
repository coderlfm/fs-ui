import React, { memo } from 'react'
import { Radio } from 'antd'

const options = [
    { label: '是', value: 1 },
    { label: '否', value: 0 },
];
const optionsDisabled = [
    { label: '是', value: 1, disabled: true },
    { label: '否', value: 0, disabled: true },
];
export default memo(function () {


    return (
        <>

            <Radio.Group options={options} defaultValue={1} />
            <br /><br />

            <Radio.Group options={optionsDisabled} defaultValue={0} />
            <br />
        </>
    )
})
