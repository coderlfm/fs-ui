import React, { memo, useRef, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

export default memo(function() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus({ cursor: 'all' });
  });

  // console.log('inputRef', inputRef);

  return (
    <>
      <Form.Item label="正常可输入状态">
        <Input placeholder="请输入内容" />
      </Form.Item>

      <Form.Item label="正常可输入状态-聚焦">
        <Input placeholder="请输入内容" ref={inputRef} />
      </Form.Item>

      <Form.Item label="正常可输入状态-已输">
        <Input value="文字内容" />
      </Form.Item>

      <Form.Item
        label="正常可输入状态-必填"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="请输入内容" />
      </Form.Item>

      <Form.Item
        label="错误提示"
        validateStatus="error"
        help="错误/缺少内容提示"
      >
        <Input placeholder="请输入内容" id="error" />
      </Form.Item>

      <Form.Item label="禁用状态">
        <Input placeholder="请输入内容" disabled />
      </Form.Item>
    </>
  );
});
