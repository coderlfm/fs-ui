import React, { memo, useState } from 'react'
import { Form, Select } from 'antd'
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select;

export default memo(function () {

    const [suffixIcon, setSuffixIcon] = useState(<CaretRightOutlined />)

    const changeSelectIcon = (open) => {
        if (open) {
            setSuffixIcon(<CaretDownOutlined />)
        } else {
            setSuffixIcon(<CaretRightOutlined />)
        }
    }

    return (
        <div>

            <Form.Item label="必填状态" name="select" rules={[{ required: true, message: 'required' }]}>

                <Select defaultValue="lucy" style={{ width: 120 }} suffixIcon={suffixIcon} onDropdownVisibleChange={changeSelectIcon}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </Form.Item>


            <Form.Item label="错误提示" validateStatus="error" help="错误/缺少内容提示" >

                <Select defaultValue="lucy" style={{ width: 120 }} suffixIcon={suffixIcon} onDropdownVisibleChange={changeSelectIcon}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                
            </Form.Item>
        </div>
    )
})
