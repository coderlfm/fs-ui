import React, { memo } from 'react';
import { AddForm } from 'fs-pro-ui';

export default memo(function Base() {
  const formProps = {
    propTitle: '添加表单',
    // initValue: 'initValue',
    formArr: [
      {
        title: '基本信息',
        search: [
          {
            // wrap 是放在form item上的属性
            wrap: {
              key: 'app_id',
              name: 'app_id',
              label: 'app_id',
              type: 'input',
              rules: [{ required: true }],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            // 放在元素上的属性
            props: {
              placeholder: '请输入app_id',
            },
          },
          {
            wrap: {
              key: 'link',
              name: 'link',
              label: '跳转链接',
              type: 'textarea',
              rules: [{ required: true }],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            props: {
              placeholder: '请输入跳转链接',
            },
          },
          {
            wrap: {
              key: 'start_at',
              name: 'start_at',
              label: '上线时间',
              type: 'rangepicker',
              rules: [{ required: true }],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            // 放在元素上的属性
            props: {
              // placeholder: '',
              // showtime: true,
            },
          },
          {
            wrap: {
              key: 'type',
              name: 'type',
              label: 'banner类型',
              type: 'select',
              rules: [{ required: true }],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            props: {
              placeholder: '请选择banner类型',
              enum: [
                { value: '1', label: '内部网页' },
                { value: '2', label: 'h5网页' },
                { value: '3', label: '外部小程序' },
              ],
            },
          },
          {
            wrap: {
              key: 'rank',
              name: 'rank',
              label: '排序',
              type: 'input',
              rules: [
                { required: true },
                { pattern: /^(0|\+?[1-9][0-9]*)$/, message: '请输入整数' },
              ],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            // 放在元素上的属性
            props: {},
          },
          {
            // wrap 是放在form item上的属性
            wrap: {
              key: 'pic',
              name: 'pic',
              label: () => 'banner图',
              type: 'proupload',
              rules: [{ required: true, message: '请上传banner图' }],
              labelCol: {
                span: 6,
              },
              wrapperCol: {
                span: 18,
              },
            },
            props: {
              //请求的参数
              imageParams: 'imageParams',
              //请求地址
              actionUrl: 'https://luckycat-mini.oss-cn-chengdu.aliyuncs.com',
              //图片前的域名
              imgUrl: 'https://luckycat-mini.oss-cn-chengdu.aliyuncs.com/',
              // 是否是只上传一张图片 1只上传一张 多张不传这个参数
              is_only: 1,
              //图片的文件路径
              fileUrl: 'dense-diary-manager/banner/',
              //接受什么格式的图片
              accept: '.jpg',
              // 初始列表
              enum: [
                {
                  path:
                    'https://img14.360buyimg.com/n2/jfs/t1/132854/40/308/80278/5ecbafd9Efa0864db/4bf83e80de2c6bba.jpg',
                  is_cover: 0,
                },
              ],
            },
          },
        ],
      },
    ],
    config: [
      {
        text: '提交',
        type: 'submit',
        wrap: {
          type: 'primary',
        },
        onBtnClick: async value => {
          // submitFn(value);
        },
      },
      {
        text: '取消',
        type: 'reset',
        wrap: {},
        onBtnClick: value => {
          // localStorage.removeItem("banner_edit_msg", "")
          // history.replace("/system/banner");
        },
      },
    ],
    // layoutConfig:{
    //     onFieldsChange(changedFields, allFields){
    //         console.log("字段变化了",changedFields, allFields)
    //     }
    // }
  };

  return (
    <div>
      <AddForm {...formProps}></AddForm>
    </div>
  );
});
