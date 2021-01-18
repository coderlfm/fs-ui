import React, { memo, useState } from 'react'
import { Checkbox } from 'antd'

export default memo(function () {

    const [indeterminate, setIndeterminate] = useState(true);
    const [check, setCheck] = useState(true);

    return (
        <>
            <Checkbox />
            <Checkbox indeterminate={indeterminate} onChange={() => setIndeterminate(!indeterminate)} />
            <Checkbox checked={check} onChange={() => setCheck(!check)} />
            <br/><br/>
            
            <Checkbox disabled />
            <Checkbox checked={check} disabled/>
            
        </>
    )
})
