import { memo } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './index.less';
export default memo(function({ formTableArr = [], formName = 'users' }) {
  return (
    <>
      <Form.List name={formName} style={{ border: '1px solid #f40' }}>
        {(fields, { add, remove }) => (
          <>
            <div className="form-table-title">
              {formTableArr.map(item => {
                return (
                  <div key={item.name}>
                    <span>{item.title}</span>
                  </div>
                );
              })}
              <div></div>
            </div>
            {fields.map(field => (
              <Space key={field.key} align="baseline">
                {formTableArr.map(item => {
                  return (
                    <Form.Item
                      {...field}
                      name={[field.name, item.name]}
                      fieldKey={[field.fieldKey, item.name]}
                      rules={[...item.rules]}
                    >
                      <Input placeholder={item.name} bordered={false} />
                    </Form.Item>
                  );
                })}
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            {/* <Form.Item> */}
            <Button
              type="primary"
              size="middle"
              style={{ width: '80px', marginTop: '20px', textAlign: 'center' }}
              onClick={() => add()}
              block
            >
              添加
            </Button>
            {/* </Form.Item> */}
          </>
        )}
      </Form.List>
    </>
    // </Form>
  );
});

// import { memo } from 'react'
// import { Card } from 'antd';
// import './index.less'

// export default memo(function () {
//     return (
//         <div>
//             111111
//         </div>
//     )
// })

// import React, { useContext, useState } from 'react';
// import {
//     Form, Input, Button, Space,
// } from 'antd';
// import { MinusCircleOutlined } from '@ant-design/icons';
// import './index.less';

// const AddSkuList = (props) => {
//     //   const {
//     //     addSkuList1,
//     //   } = useContext(AddProductStore);
//     const [addSku, setAddSku] = useState({ user: [{ spec_desc: "", sku_price: "", sku_stock: "" }] })
//     return (
//         <Form>
//             <Form.List name="user" wrapperCol={{ span: 24 }} style={{ width: '100%' }}>
//                 {(fields, { add, remove }) => (
//                     <>
//                         {fields.map((field) => (
//                             <Space
//                                 key={field.key}
//                                 align="baseline"
//                             >
//                                 <Form.Item
//                                     {...field}
//                                     name={[field.name, 'spec_desc']}
//                                     fieldKey={[field.fieldKey, 'spec_desc']}
//                                     rules={[{ required: true, message: '规格名称不能为空' }]}
//                                 >
//                                     <Input
//                                         // placeholder="请输入规格名称"
//                                         allowClear
//                                         bordered={false}
//                                     />
//                                 </Form.Item>
//                                 <Form.Item
//                                     {...field}
//                                     name={[field.name, 'sku_price']}
//                                     fieldKey={[field.fieldKey, 'sku_price']}
//                                     rules={[{ required: true, message: '对应售价不能为空' }, { pattern: /^(\+)?\d+(\.\d+)?$/, message: '请输入数字' }]}
//                                 >
//                                     <Input
//                                         // placeholder="请输入对应售价"
//                                         allowClear
//                                         bordered={false}
//                                     />
//                                 </Form.Item>
//                                 <Form.Item
//                                     {...field}
//                                     // style={{ border: '1px solid #f40', width: '100%', flex: 1 }}
//                                     name={[field.name, 'sku_stock']}
//                                     fieldKey={[field.fieldKey, 'sku_stock']}
//                                     rules={[{ required: true, message: '对应库存不能为空' }, { pattern: /^(0|\+?[1-9][0-9]*)$/, message: '请输入整数' }]}
//                                 >
//                                     <Input
//                                         // placeholder="请输入对应库存"
//                                         allowClear
//                                         bordered={false}
//                                     />
//                                 </Form.Item>
//                                 <MinusCircleOutlined onClick={() => remove(field.name)} className="other-name" />
//                             </Space>
//                         ))}
//                         <Form.Item>
//                             <Button
//                                 style={{ width: '60px', marginTop: '20px', textAlign: 'center' }}
//                                 type="primary"
//                                 size="middle"
//                                 onClick={() => {
//                                     setAddSku({ user: [...addSku.user, { spec_desc: "1", sku_price: "1", sku_stock: "1" }] });
//                                     // console.log("添加")
//                                     // console.log('判断验证通过···');
//                                     // ref.current.validateFields().then(() => {
//                                     //     // console.log('数据验证通过', values);
//                                     //     // addSkuList1(values);
//                                     //     // add();
//                                     // }, () => {
//                                     //     // 数据验证失败
//                                     //     // messageLock.lock = false;
//                                     //     console.log('数据验证失败');
//                                     // });
//                                 }}
//                                 block
//                             >
//                                 添加
//             </Button>
//                         </Form.Item>
//                     </>
//                 )}
//             </Form.List>
//         </Form>);
// };
// export default AddSkuList;
