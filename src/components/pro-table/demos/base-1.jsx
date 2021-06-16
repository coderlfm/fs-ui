import { memo, useState, useEffect, useRef } from 'react';
import { FsTable, FsForm } from 'fs-pro-ui';
import { Button, Modal, Space, message, Form } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons'

// import { request, createAreaApi, editAreaApi, removeAreaApi, createShopApi } from '@/services'
import { request } from '../../../utils/request';

// import FsForm from '@/components/context/form'
// import './index.less'

const { confirm } = Modal;

const title = '区域';
const shopTitle = '门店';

const searchformProps = {
  search: [
    {
      wrap: {
        key: 'area_name',
        name: 'area_name',
        label: `${title}名称`,
        type: 'input',
      },
      props: { placeholder: `请输入${title}名称` },
    },
  ],
};

export default memo(function () {
  const form = useRef({});

  const [areaVisible, setAreaVisible] = useState(false); // 新增和编辑表单的弹出框
  const [areaFormInitialVal, setAreaFormInitialVal] = useState({}); // 新增编辑 from 表单的初始值
  const [reset, setReset] = useState(false); // 刷新表格

  const isEdit = Object.keys(areaFormInitialVal).length; //是否编辑状态

  useEffect(() => {
    form.current.resetFields();
  }, [areaVisible]);

  /**
   * 编辑与提交
   * @param {*} values
   * @param {*} cb
   */
  const submit = async (values, cb) => {
    if (isEdit) {
      console.log('编辑', values);
    } else {
      console.log('创建', values);

      // const { code, data, msg } = await createAreaApi(values);
      // if (!code) {
      //   message.success('操作成功');
      //   resetForm();
      //   setReset(!reset);
      //   cb && cb();
      // } else { message.warning(msg || '请求超时'); }
    }
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    // 先重置初始值, 再重置表单
    setAreaFormInitialVal({});
    setAreaVisible(false);
  };

  const columns = [
    {
      title: `${title}id`,
      key: 'area_id',
      dataIndex: 'area_id',
    },
    {
      title: `${title}名称`,
      key: 'area_name',
      dataIndex: 'area_name',
    },

    {
      title: `排序`,
      key: 'rank',
      dataIndex: 'rank',
    },

    {
      title: '操作',
      key: 'action',
      dataIndex: '',
      render: (row) => (
        <Space>
          <a
            onClick={() => {
              setAreaVisible(true);
              setAreaFormInitialVal(row);
            }}
          >
            编辑
          </a>
          {/* <a onClick={() => handleDelCar(row)}>删除</a> */}
        </Space>
      ),
    },
  ];

  const tableTools = {
    title: `${title}列表`,
    actions: [
      {
        render: (rows) => (
          <Button type="primary" onClick={() => setAreaVisible(true)}>
            新增
          </Button>
        ),
      },
    ],
  };

  const editformProps = {
    search: [
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'area_name',
          name: 'area_name',
          label: `${title}名称`,
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: `请输入${title}名称` },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'rank',
          name: 'rank',
          label: `排序`,
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: `请输入该区域排序，数字越小，排序越前`, type: 'number' },
      },
      !isEdit && {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'is_create',
          name: 'is_create',
          label: '是否新增门店',
          type: 'select',
        },
        props: {
          placeholder: '否',
          enum: [
            { value: 1, label: '是' },
            { value: 2, label: '否' },
          ],
        },
      },
    ],
    config: {
      // 底部布局
      tailLayout: { wrapperCol: { offset: 6 } },
      showBorder: false,
      submit: { text: isEdit ? '保存修改' : '新增' },
      reset: isEdit ? false : '',
    },
    layoutConfig: {
      layout: 'horizontal',
      labelCol: { xs: { span: 24 }, sm: { span: 6 } },
      initialValues: areaFormInitialVal,
    },
  };

  return (
    <div className="area-manage-wrap">
      <FsTable
        title={`${title}管理`}
        columns={columns}
        request={request}
        url="area/list"
        rowKey="area_id"
        tableTools={tableTools}
        formProps={searchformProps}
        reset={reset}
      />

      <Modal
        onOk={() => {}}
        maskClosable={false}
        footer={null}
        title={`${isEdit ? '编辑' : '新增'}${title}`}
        visible={areaVisible}
        onCancel={resetForm}
        forceRender
      >
        <FsForm form={form} formProps={editformProps} submit={submit} />
      </Modal>
    </div>
  );
});
