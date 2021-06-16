import { memo, useRef } from 'react';
import { FsForm } from 'fs-pro-ui';

export default memo(function () {
  const form = useRef();
  const submit = async (values, cb) => {
    console.log(values);
  };

  const editformProps = {
    search: [
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'nickname',
          name: 'nickname',
          label: '昵称',
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: `请输入昵称` },
      },
    ],
    config: {
      // 底部布局
      tailLayout: { wrapperCol: { offset: 5 } },
      showBorder: false,
      submit: { text: '提交' },
    },
    layoutConfig: {
      layout: 'horizontal',
      labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    },
  };

  return <FsForm form={form} formProps={editformProps} submit={submit} />;
});
