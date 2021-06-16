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
          key: 'shop_ids',
          name: 'shop_ids',
          label: '门店权限',
          type: 'treeselect',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: {
          placeholder: '请选择门店',
          showCheckedStrategy: 'SHOW_ALL',
          treeCheckable: true,
          maxTagCount: 15,
          treeData: [
            {
              title: '厦门市',
              key: '9',
              value: '9',
              children: [
                {
                  title: '厦门翔安保时捷中心',
                  key: '28',
                  value: '28',
                },
                {
                  title: '厦门鹭江保时捷中心',
                  key: '29',
                  value: '29',
                },
              ],
            },
            {
              title: '福州市',
              key: '3',
              value: '3',
              children: [
                {
                  title: '福州闽江保时捷中心',
                  key: '1',
                  value: '1',
                },
                {
                  title: '福州台江保时捷中心',
                  key: '2',
                  value: '2',
                },
              ],
            },
          ],
          // defaultValue: activityFormInitialVal.shop_ids || []
        },
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
