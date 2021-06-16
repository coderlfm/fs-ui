import { memo, useState, useRef, useEffect } from 'react';
import { FsTable, FsForm } from 'fs-pro-ui';
import { Button, Modal, Space, message, Form, Input, Upload } from 'antd';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
// import { keepTwoDecimalFull, } from '@/utils/utils'

// import { request, getAliOSSDataApi, getBrandListApi, getCarCategoryListApi, createCarModelApi, editCarModelApi, } from '@/services'
import { request } from '../../../utils/request';

// import './index.less'

const { confirm } = Modal;

export default memo(function () {
  // const [id] = useState({ activity_id: window.location.hash.includes('?') ? window.location.hash.split('?')[1].split('=')[1] : undefined })

  const brand_id = window.location.hash.includes('?') ? window.location.hash.split('?')[1].split('=')[1] : undefined;

  const form = useRef({});

  const [carVisible, setCarVisible] = useState(false); // 新增和编辑表单的弹出框
  const [carFormInitialVal, setCarFormInitialVal] = useState({}); // 新增编辑 from 表单的初始值
  const [reset, setReset] = useState(false); // 刷新表格
  const [brandList, setBrandList] = useState([]); // 品牌列表
  const [carCategoryList, setCarCategoryList] = useState([]); // 车型列表列表

  const [OSSData, setOSSData] = useState(null); // 阿里云 oss 信息
  const [fileList, setFileList] = useState([]); // 上传图片列表

  const [previewImg, setPreviewImg] = useState(''); // 预览图片地址

  const isEdit = Object.keys(carFormInitialVal).length; //是否编辑状态

  useEffect(() => {
    form.current.resetFields();
  }, [carVisible]);

  useEffect(() => {
    // getBrandListApi({ page: 0 }).then(res => {
    //   if (!res.code) setBrandList(res.data.list.map(item => ({ value: item.brand_id, label: item.brand_name })))
    // })
    setBrandList(brandData.map((item) => ({ value: item.brand_id, label: item.brand_name })));

    // getCarCategoryListApi({ page: 0 }).then(res => {
    //   if (!res.code) setCarCategoryList(res.data.list.map(item => ({ value: item.car_cate_id, label: item.category_name })))
    // })
  }, []);

  useEffect(() => {
    // 只要弹出层处于打开并且 OSSDdata 为空时，或者 OSS 有值但是已经过期，就重新请求
    if (
      ((carVisible || Object.keys(carFormInitialVal).length) && !OSSData) ||
      ((carVisible || Object.keys(carFormInitialVal).length) && OSSData && Object.keys(OSSData).length && OSSData.expire * 1000 < Date.now())
    ) {
      // getAliOSSDataApi().then(res => {
      //   // console.log('res:', res);
      //   if (!res.code) setOSSData(res.data)
      // })
    }
  }, [carFormInitialVal, carVisible]);

  const submit = async (values, cb) => {
    // console.log('values:', values);

    if (isEdit) {
      // debugger
      // values.max_price = parseFloat(keepTwoDecimalFull(values.max_price)) * 100 + '';
      // values.min_price = parseFloat(keepTwoDecimalFull(values.min_price)) * 100 + '';

      if (!(typeof values.image === 'string')) {
        if (values.image.file.status !== 'done') {
          message.warning('请上传图片后再进行提交');
          return;
        }

        values.image = `/${values.image.file.url}`;
      }

      console.log(values);
      // values.image = values.image.file?.url || values.image;
      // const { code, data, msg } = await editCarModelApi({ car_model_id: carFormInitialVal.car_model_id, data: values })

      // if (!code) {
      //   message.success(msg || '操作成功')
      //   resetForm();
      //   setReset(!reset)
      // } else {
      //   message.warning(msg || '请求超时')
      // }
    } else {
      // debugger

      // values.max_price = parseFloat(keepTwoDecimalFull(values.max_price)) * 100 + '';
      // values.min_price = parseFloat(keepTwoDecimalFull(values.min_price)) * 100 + '';
      // values.image = 'test/' + values.image.file.uid

      values.image = `/${values.image.file.url}`;
      console.log(values);

      // const { code, data, msg } = await createCarModelApi({ data: values });
      // if (!code) {
      //   message.success('操作成功');
      //   resetForm();
      //   setReset(!reset);
      //   cb && cb();

      // } else {
      //   message.warning(msg || '请求超时')
      // }
    }

    // setBrandFormVisible(false);
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    // 先重置初始值, 再重置表单
    setCarFormInitialVal({});
    setFileList([]);
    setCarVisible(false);
  };

  const handleDelCar = (row) => {
    console.log('row', row);
  };

  const getExtraData = (file) => {
    return {
      key: (file.url = `jianfa/car_img_${file.url}`), // 修改 文件的url 地址
      OSSAccessKeyId: OSSData.accessid,
      accessid: OSSData.accessid,
      host: OSSData.host,
      policy: OSSData.policy,
      signature: OSSData.signature,
      expire: OSSData.expire,
      dir: OSSData.dir,
      'x-oss-security-token': OSSData['x-oss-security-token'],
      success_action_status: OSSData.success_action_status,
    };
  };

  const beforeUpload = async (file) => {
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      // console.log('到期了')
      // message.warning('上传时间已过期，请重新上传')
      // getAliOSSDataApi().then(res => {
      //   // console.log('res:', res);
      //   if (!res.code) setOSSData(res.data)
      // })
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + '_' + file.uid + suffix;
    file.url = OSSData.dir + filename;

    return file;
  };

  const searchformProps = {
    search: [
      // {
      //   wrap: {
      //     key: 'id',
      //     name: 'id',
      //     label: '车型id',
      //     type: 'input',
      //   },
      //   props: { placeholder: '请输入车型id', },
      // },
      {
        wrap: {
          key: 'brand_id',
          name: 'brand_id',
          label: '品牌',
          type: 'select',
        },
        props: {
          placeholder: '请选择品牌',
          enum: brandList,
          showSearch: true,
          optionFilterProp: 'label',
        },
      },
      {
        wrap: {
          key: 'car_cate_id',
          name: 'car_cate_id',
          label: '车型分类',
          type: 'select',
        },
        props: {
          placeholder: '请选择车型分类',
          enum: carCategoryList,
          showSearch: true,
          optionFilterProp: 'label',
        },
      },
    ],
    layoutConfig: {
      // layout: 'horizontal',
      // labelCol: { xs: { span: 24 }, sm: { span: 6 } },
      initialValues: { brand_id },
    },
  };

  const columns = [
    {
      title: '车型id',
      key: 'car_model_id',
      dataIndex: 'car_model_id',
    },
    {
      title: '车型名称',
      key: 'model_name',
      dataIndex: 'model_name',
    },
    // {
    //   title: '车型型号',
    //   key: 'category_name',
    //   dataIndex: 'category_name',
    // },
    {
      title: '车型图片',
      key: 'image_url',
      dataIndex: 'image_url',
      render: (url) => <img style={{ cursor: 'pointer', maxHeight: 150 }} onClick={() => setPreviewImg(url)} src={url} />,
    },
    {
      title: '价格区间',
      key: 'min_price-max_price',
      dataIndex: '',
      // render: (record) => `${keepTwoDecimalFull(record.min_price / 100)}w - ${keepTwoDecimalFull(record.max_price / 100)}w`
    },
    {
      title: '车型类别',
      key: 'category_name',
      dataIndex: 'category_name',
      render: (text, record) => (
        <>
          <div>{record.category_name}</div>
          <div>{record.category_name_2}</div>
        </>
      ),
    },
    {
      title: '品牌名称',
      key: 'brand_name',
      dataIndex: 'brand_name',
    },

    {
      title: '操作',
      key: 'action',
      dataIndex: '',
      render: (row) => (
        <Space>
          <a
            onClick={() => {
              setCarVisible(true);

              setCarFormInitialVal({
                ...row,
                min_price: row.min_price / 100,
                max_price: row.max_price / 100,
                car_cate_2_id: row.car_cate_2_id === '0' ? undefined : row.car_cate_2_id,
              });
              setFileList([
                {
                  name: row.image,
                  thumbUrl: row.image_url,
                  url: row.image,
                },
              ]); // 设置 logo 默认值
            }}
          >
            编辑
          </a>
          <a onClick={() => handleDelCar(row)}>删除</a>
        </Space>
      ),
    },
  ];

  const tableTools = {
    title: '车型列表',
    actions: [
      {
        render: (rows) => (
          <Button type="primary" onClick={() => setCarVisible(true)}>
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
          key: 'brand_id',
          name: 'brand_id',
          label: '车型品牌',
          type: 'select',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: {
          placeholder: '请选择品牌',
          enum: brandList,

          // enum: [
          //   { value: 1, label: '保时捷' },
          //   { value: 2, label: '宝马' },
          //   { value: 3, label: '奔驰' },
          // ]
        },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'car_cate_id',
          name: 'car_cate_id',
          label: '车型类别',
          type: 'select',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: {
          placeholder: '请选择类别',
          enum: carCategoryList,
        },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'car_cate_2_id',
          name: 'car_cate_2_id',
          label: '车型类别2',
          type: 'select',
          // rules: [{  message: '该项为必填' }],
        },
        props: {
          placeholder: '请选择类别2',
          enum: carCategoryList,
        },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'model_name',
          name: 'model_name',
          label: '车型名称',
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: '请输入车型名称' },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'car_price',
          // name: 'car_price',
          label: '价格区间',
          type: 'inputGroup',
          // noStyle: true,
          // rules: [{ required: true, message: '该项为必填' }]
        },
        props: {
          // placeholder: '此处需要新增组件',
          inputGroup: (
            <>
              <Form.Item name="min_price" key="min_price" noStyle rules={[{ required: true, message: '该项为必填' }]}>
                <Input style={{ width: 120, textAlign: 'center' }} addonAfter="万元" />
              </Form.Item>
              <Input
                className="site-input-split"
                key="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  border: 0,
                  pointerEvents: 'none',
                  margin: '0 10px',
                }}
                placeholder="~"
                disabled
              />
              <Form.Item name="max_price" key="max_price" noStyle rules={[{ required: true, message: '该项为必填' }]}>
                <Input addonAfter="万元" style={{ width: 120, textAlign: 'center' }} />
              </Form.Item>
              <div>价格只保留 两位小数</div>
            </>
          ),
        },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'image',
          name: 'image',
          label: '车型图片',
          type: 'custom',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: (
          <Upload
            fileList={fileList}
            listType="picture-card"
            name="file"
            action={OSSData?.host}
            data={getExtraData}
            maxCount={1}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={beforeUpload}
            onPreview={({ thumbUrl }) => setPreviewImg(thumbUrl)}
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            )}
          </Upload>
        ),
      },
    ],
    config: {
      // 底部布局
      tailLayout: { wrapperCol: { offset: 5 } },
      showBorder: false,
      submit: { text: isEdit ? '保存修改' : '新增' },
      reset: isEdit ? false : '',
    },
    layoutConfig: {
      layout: 'horizontal',
      labelCol: { xs: { span: 24 }, sm: { span: 5 } },
      initialValues: carFormInitialVal,
    },
  };

  return (
    <div className="car-manage-page">
      <FsTable
        title="车型管理"
        columns={columns}
        request={request}
        url="car/model/list"
        rowKey="car_model_id"
        tableTools={tableTools}
        requestData={{ search: { brand_id } }}
        preSubmit={(values) => {
          // // // console.log(JSON.parse(JSON.stringify(values)))
          // values.search.min_price && (values.search.min_price = parseFloat(keepTwoDecimalFull(values.search.min_price)) * 100 + '')
          // values.search.max_price && (values.search.min_price = parseFloat(keepTwoDecimalFull(values.search.max_price)) * 100 + '')
          return values;
        }}
        formProps={searchformProps}
        reset={reset}
      />

      <Modal
        onOk={() => {}}
        maskClosable={false}
        footer={null}
        title={`${isEdit ? '编辑' : '新增'}车型`}
        visible={carVisible}
        wrapClassName="car-manage-modal"
        onCancel={resetForm}
        forceRender
      >
        <FsForm form={form} formProps={editformProps} submit={submit} />
      </Modal>

      <Modal
        visible={previewImg}
        title="查看"
        width="50%"
        footer={null}
        onCancel={() => {
          setPreviewImg('');
        }}
      >
        {/* 预览图片在默认情况下，值是 base64，在编辑状态是 真实地址 */}
        <img alt="加载失败" style={{ width: '100%' }} src={previewImg} />
      </Modal>
    </div>
  );
});

const brandData = [
  {
    brand_id: '1',
    brand_name: '宾利',
    logo: '/jianfa/brand_logo_1623230678412_rc-upload-1623206038294-8.png',
    shops: [
      {
        shop_id: '11',
        shop_name: '宾利昆明',
        address: '销售地址：昆明市日新路259号  \n售后地址：昆明市日新东路与海埂路交叉口',
      },
      {
        shop_id: '15',
        shop_name: '宾利南宁',
        address: '广西南宁市江南区白沙大道100-1号',
      },
      {
        shop_id: '17',
        shop_name: '宾利沈阳',
        address: '辽宁省沈阳市浑南区浑南西路97号',
      },
      {
        shop_id: '48',
        shop_name: '沈阳门店1',
        address: '沈阳门店122222',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623230678412_rc-upload-1623206038294-8.png',
  },
  {
    brand_id: '2',
    brand_name: '保时捷',
    logo: '/jianfa/brand_logo_1623231423023_rc-upload-1623231253311-30.png',
    shops: [
      {
        shop_id: '1',
        shop_name: '福州闽江保时捷中心',
        address: '福州市仓山区盖山投资区高仕路8号',
      },
      {
        shop_id: '2',
        shop_name: '福州台江保时捷中心',
        address: '福州市台江区排尾路99号',
      },
      {
        shop_id: '10',
        shop_name: '昆明滇池保时捷中心',
        address: '云南省昆明市日新东路与海埂路交叉口',
      },
      {
        shop_id: '14',
        shop_name: '南宁江南保时捷中心',
        address: '广西南宁市江南区南站大道11号',
      },
      {
        shop_id: '16',
        shop_name: '沈阳国展保时捷中心',
        address: '沈阳市浑南新区浑南西路99号',
      },
      {
        shop_id: '18',
        shop_name: '西安灞桥保时捷中心',
        address: '西安市灞桥区东南三环月登阁桥下高端汽车主题公园内',
      },
      {
        shop_id: '19',
        shop_name: '柳州保时捷中心',
        address: '展厅地址：柳州市东环大道228号双福雅苑   \n售后服务：柳州市桂柳路1-1号',
      },
      {
        shop_id: '28',
        shop_name: '厦门翔安保时捷中心',
        address: '厦门市翔安投资区民安大道2815号',
      },
      {
        shop_id: '29',
        shop_name: '厦门鹭江保时捷中心',
        address: '厦门市思明区西堤南里16号信隆城二期105-107号',
      },
      {
        shop_id: '30',
        shop_name: '厦门湖里保时捷城市服务中心',
        address: '厦门市湖里区湖里大道45号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231423023_rc-upload-1623231253311-30.png',
  },
  {
    brand_id: '3',
    brand_name: '迈凯伦',
    logo: '/jianfa/brand_logo_1623231434512_rc-upload-1623231253311-35.png',
    shops: [
      {
        shop_id: '42',
        shop_name: '迈凯伦厦门',
        address: '厦门市湖里区长乐路8号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231434512_rc-upload-1623231253311-35.png',
  },
  {
    brand_id: '4',
    brand_name: '阿斯顿·马丁',
    logo: '/jianfa/brand_logo_1623231452269_rc-upload-1623231253311-40.png',
    shops: [
      {
        shop_id: '12',
        shop_name: '阿斯顿·马丁昆明',
        address: '销售地址：昆明市日新路259号  \n售后地址：昆明市日新东路与海埂路交叉口',
      },
      {
        shop_id: '43',
        shop_name: '阿斯顿·马丁厦门',
        address: '厦门市湖里区长乐路8号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231452269_rc-upload-1623231253311-40.png',
  },
  {
    brand_id: '5',
    brand_name: '捷豹',
    logo: '/jianfa/brand_logo_1623231278485_rc-upload-1623231253311-3.png',
    shops: [
      {
        shop_id: '3',
        shop_name: '建发福州捷豹路虎青口4S中心',
        address: '福州市闽侯县尚干镇青口海峡汽车城旁\n（兰圃·青口高速出口直行300米）',
      },
      {
        shop_id: '4',
        shop_name: '建发福州捷豹路虎鼓楼城市中心',
        address: '福州市鼓楼区西二环中路98号万商大厦一楼\n（原牡丹大酒楼旁）',
      },
      {
        shop_id: '21',
        shop_name: '建发莆田捷豹路虎中心',
        address: '莆田市荔城区西天尾绿森庄园内',
      },
      {
        shop_id: '24',
        shop_name: '建发泉州路虎捷豹中心',
        address: '泉州市鲤城区南环路1388号',
      },
      {
        shop_id: '33',
        shop_name: '建发厦门捷豹路虎中心',
        address: '厦门市集美区岩兴路89号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231278485_rc-upload-1623231253311-3.png',
  },
  {
    brand_id: '6',
    brand_name: '路虎',
    logo: '/jianfa/brand_logo_1623231293044_rc-upload-1623231253311-8.png',
    shops: [
      {
        shop_id: '3',
        shop_name: '建发福州捷豹路虎青口4S中心',
        address: '福州市闽侯县尚干镇青口海峡汽车城旁\n（兰圃·青口高速出口直行300米）',
      },
      {
        shop_id: '4',
        shop_name: '建发福州捷豹路虎鼓楼城市中心',
        address: '福州市鼓楼区西二环中路98号万商大厦一楼\n（原牡丹大酒楼旁）',
      },
      {
        shop_id: '21',
        shop_name: '建发莆田捷豹路虎中心',
        address: '莆田市荔城区西天尾绿森庄园内',
      },
      {
        shop_id: '24',
        shop_name: '建发泉州路虎捷豹中心',
        address: '泉州市鲤城区南环路1388号',
      },
      {
        shop_id: '33',
        shop_name: '建发厦门捷豹路虎中心',
        address: '厦门市集美区岩兴路89号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231293044_rc-upload-1623231253311-8.png',
  },
  {
    brand_id: '7',
    brand_name: '凯迪拉克',
    logo: '/jianfa/brand_logo_1623230692578_rc-upload-1623206038294-13.png',
    shops: [
      {
        shop_id: '8',
        shop_name: '福州建发凯迪拉克',
        address: '福州市马尾区马江路28号',
      },
      {
        shop_id: '13',
        shop_name: '昆明凯通凯迪拉克',
        address: '云南省昆明市西山区日新东路259号',
      },
      {
        shop_id: '20',
        shop_name: '莆田建发凯迪拉克',
        address: '莆田市荔城区西天尾洞湖口旁',
      },
      {
        shop_id: '23',
        shop_name: '泉州建发凯迪拉克',
        address: '泉州市晋江市晋江SM广场旁豪信汽车城',
      },
      {
        shop_id: '32',
        shop_name: '厦门建发凯迪拉克',
        address: '厦门市集美区岩兴路89号（北站车管所旁）',
      },
      {
        shop_id: '46',
        shop_name: '汕头众成凯迪拉克',
        address: '广东省汕头市龙湖区泰山路156号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623230692578_rc-upload-1623206038294-13.png',
  },
  {
    brand_id: '8',
    brand_name: '林肯',
    logo: '/jianfa/brand_logo_1623231320191_rc-upload-1623231253311-18.png',
    shops: [
      {
        shop_id: '25',
        shop_name: '泉州建发林肯中心',
        address: '泉州市鲤城区南环路1388号',
      },
      {
        shop_id: '34',
        shop_name: '厦门建发林肯中心',
        address: '厦门市翔安区民安大道2807号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231320191_rc-upload-1623231253311-18.png',
  },
  {
    brand_id: '9',
    brand_name: '奥迪',
    logo: '/jianfa/brand_logo_1623233023121_rc-upload-1623232997225-3.png',
    shops: [
      {
        shop_id: '35',
        shop_name: '厦门建发奥迪4S店（集美店）',
        address: '厦门市集美区岩兴路89号（车管所旁）',
      },
      {
        shop_id: '36',
        shop_name: '厦门建发奥迪4S店（湖里店）',
        address: '厦门市湖里区湖里大道54号（莲岳隧道口）',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623233023121_rc-upload-1623232997225-3.png',
  },
  {
    brand_id: '10',
    brand_name: '沃尔沃',
    logo: '/jianfa/brand_logo_1623230716575_rc-upload-1623206038294-25.png',
    shops: [
      {
        shop_id: '9',
        shop_name: '福州建发捷路沃尔沃',
        address: '福州市马尾区马江路28号',
      },
      {
        shop_id: '44',
        shop_name: '厦门建发沃尔沃中心',
        address: '厦门市集美区岩兴路89号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623230716575_rc-upload-1623206038294-25.png',
  },
  {
    brand_id: '11',
    brand_name: '讴歌',
    logo: '/jianfa/brand_logo_1623230703925_rc-upload-1623206038294-18.png',
    shops: [
      {
        shop_id: '6',
        shop_name: '福州建发讴歌青口店',
        address: '福州市闽侯县青口汽车城一期内（建发讴歌）',
      },
      {
        shop_id: '38',
        shop_name: '厦门建发讴歌海沧店',
        address: '厦门市海沧区马青路1279号',
      },
      {
        shop_id: '39',
        shop_name: '厦门建发讴歌湖里店',
        address: '厦门市湖里区枋湖东路8号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623230703925_rc-upload-1623206038294-18.png',
  },
  {
    brand_id: '12',
    brand_name: '阿尔法罗密欧',
    logo: '/jianfa/brand_logo_1623231494503_rc-upload-1623231253311-53.png',
    shops: [
      {
        shop_id: '31',
        shop_name: '厦门建发进口大众',
        address: '厦门市湖里大道43号（联泰大厦1楼）',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231494503_rc-upload-1623231253311-53.png',
  },
  {
    brand_id: '13',
    brand_name: '大众',
    logo: '/jianfa/brand_logo_1623231473212_rc-upload-1623231253311-45.png',
    shops: [
      {
        shop_id: '31',
        shop_name: '厦门建发进口大众',
        address: '厦门市湖里大道43号（联泰大厦1楼）',
      },
      {
        shop_id: '45',
        shop_name: '汕头众驰进口大众',
        address: '汕头市龙湖区黄河路39号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231473212_rc-upload-1623231253311-45.png',
  },
  {
    brand_id: '14',
    brand_name: '红旗',
    logo: '/jianfa/brand_logo_1623231331082_rc-upload-1623231253311-23.png',
    shops: [
      {
        shop_id: '47',
        shop_name: '汕头众驰红旗体验中心',
        address: '汕头市龙湖区黄河路39号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231331082_rc-upload-1623231253311-23.png',
  },
  {
    brand_id: '15',
    brand_name: '广汽三菱',
    logo: '/jianfa/brand_logo_1623230762306_rc-upload-1623206038294-30.png',
    shops: [
      {
        shop_id: '5',
        shop_name: '福州建发广汽三菱',
        address: '福州市闽侯县青口汽车城一期内（建发三菱）',
      },
      {
        shop_id: '26',
        shop_name: '泉州建发广汽三菱',
        address: '泉州市鲤城区南环路1388号',
      },
      {
        shop_id: '37',
        shop_name: '厦门建发广汽三菱',
        address: '厦门市湖里区长乐路8号',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623230762306_rc-upload-1623206038294-30.png',
  },
  {
    brand_id: '16',
    brand_name: '上汽大通',
    logo: '/jianfa/brand_logo_1623231544487_rc-upload-1623231253311-60.png',
    shops: [
      {
        shop_id: '27',
        shop_name: '泉州建发汽车生活馆',
        address: '泉州市晋江市晋江SM广场旁豪信汽车城',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231544487_rc-upload-1623231253311-60.png',
  },
  {
    brand_id: '17',
    brand_name: '威马',
    logo: '/jianfa/brand_logo_1623231308575_rc-upload-1623231253311-13.png',
    shops: [
      {
        shop_id: '40',
        shop_name: '厦门威马用户中心湖里店',
        address: '厦门市湖里区长乐路10-1号（保税区附近）',
      },
    ],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/jianfa/brand_logo_1623231308575_rc-upload-1623231253311-13.png',
  },
  {
    brand_id: '19',
    brand_name: '进口大众',
    logo: '',
    shops: [],
    logo_url: 'https://autocnd-digitalmarketing.oss-cn-shenzhen.aliyuncs.com/',
  },
];
