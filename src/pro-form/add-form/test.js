// const obj = {
//     propTitle: "新增商品/修改商品",
//     initValue: { "thirdparty_id": "11111" }, //初始值
//     formArr: [{
//         title: "子标题1", //每一块的标题
//         search: [{ // wrap 是放在form item上的属性
//             wrap: {
//                 key: 'one',
//                 name: 'one',
//                 label: 'input',
//                 type: 'input', // 与antd对应
//                 rules: [
//                     { required: true },
//                 ],
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             // 放在元素(input)上的属性
//             props: {
//                 placeholder: '请输入',
//             }
//         },
//         {
//             wrap: {
//                 key: 'two',
//                 name: 'two',
//                 label: 'select',
//                 type: 'select', // 与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: '请选择',
//                 enum: [{ value: '1', label: '代发货11' }, { value: '2', label: '代发货22' }] //select 的选项值
//             },
//         },
//         {
//             wrap: {
//                 key: 'three',
//                 name: 'three',
//                 label: 'rangepicker',
//                 type: 'rangepicker', // 与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: '请选择',
//             },
//         },
//         {
//             wrap: {
//                 key: 'four',
//                 name: 'four',
//                 label: 'timepicker',
//                 type: 'timepicker', // 与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: '请选择',
//             },
//         },
//         {
//             wrap: {
//                 key: 'five',
//                 name: 'five',
//                 label: 'datepicker',
//                 type: 'datepicker', //与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: '请选择',
//             },
//         },
//         {
//             wrap: {
//                 key: 'six',
//                 name: 'six',
//                 label: 'radio',
//                 type: 'radio', // 与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 enum: [{ value: 1, label: "是" }, { value: 2, label: "否" }] //radio 的选项值
//             }
//         },
//         {
//             wrap: {
//                 key: 'seven',
//                 name: 'seven',
//                 label: 'checkbox',
//                 type: 'checkbox', //与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 enum: [{ value: 1, label: "是" }, { value: 2, label: "否" }] //radio 的选项值
//             }
//         },
//         {
//             wrap: {
//                 key: 'eight',
//                 name: 'eight',
//                 label: 'textarea',
//                 type: 'textarea', //与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: "请输入"
//             }
//         },
//         {
//             wrap: {
//                 key: 'nine',
//                 name: 'nine',
//                 label: 'textarea',
//                 type: 'textarea', //与antd对应
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: "请输入"
//             }
//         },
//         {
//             wrap: {
//                 key: 'ten',
//                 name: 'ten',
//                 label: 'procheckbox',
//                 type: 'procheckbox', // 带全选的checkbox 可以渲染多组全选组
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: "请输入",
//                 // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
//                 enum: [{ value: 1, label: "全选", checked: false, child: [{ value: "1", label: "aaa1", checked: true, }, { value: "2", label: "bbb1", checked: false, }] },
//                     // {}
//                 ],
//             }
//         },
//         {
//             wrap: {
//                 key: 'eleven',
//                 name: 'eleven',
//                 label: 'proupload',
//                 type: 'proupload', // 上传图片
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 //请求的参数
//                 imageParams: {}, //阿里云的密钥 后端返回的
//                 //请求地址
//                 actionUrl: "https://luckycat-mini.oss-cn-chengdu.aliyuncs.com",
//                 //图片拼接的域名
//                 imgUrl: "https://luckycat-mini.oss-cn-chengdu.aliyuncs.com/",
//                 // 是否是只上传一张图片 1只上传一张 多张不传这个参数
//                 is_only: 1,
//                 //图片的文件路径
//                 fileUrl: "dense-diary-manager/banner/",
//                 //接受图片的类型
//                 accept: ".png" //默认值是.jpg
//                     // 初始列表
//                     // 如果通过 initValue 设置初始值没有成功，可以直接设置enum的值
//                     enum: [{
//                     path: "图片的路径，没有拼接域名",
//                     is_cover: 0 //是否为封面图
//                 }],
//             }
//         },
//         {
//             wrap: {
//                 key: 'twelve',
//                 name: 'twelve',
//                 label: 'proformlist',
//                 type: 'proformlist', // 类似表格的form 比如添加规格
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 filedName: "twelve", // 这个是最终获取数据的key值
//                 // 设置表格的 name:是数据的key  title:表格的标题 rules是input的规则
//                 filedTitle: [{ name: "one", title: "标题11", rules: [{ required: true, message: 'one1' }] },
//                 { name: "two", title: "标题2", rules: [{ required: true, message: 'one2' }] },
//                 { name: "there", title: "标题3", rules: [{ required: true, message: 'one3' }] },
//                 ]
//                 // 通过 initValue 设置初始值
//                 // 赋初始值的格式
//                 // const arr=[{one: "1", two: "1", there: "1"},{one: "2", two: "2", there: "2"}];
//             }
//         },
//         ],
//     },
//     {
//         title: "子标题2",
//         search: [{
//             wrap: {
//                 key: 'thirdparty_id1',
//                 name: 'thirdparty_id1',
//                 label: '订单编号1',
//                 type: 'input',
//                 rules: [
//                     { required: true },
//                 ],
//                 labelCol: {
//                     span: 6,
//                 },
//                 wrapperCol: {
//                     span: 18,
//                 }
//             },
//             props: {
//                 placeholder: '请输入订单编号1',
//             }
//         },],
//     }
//     ],
//     // 按钮的配置
//     config: [
//         {
//             text: "立即上架",
//             wrap: {
//                 //按钮的一些属性配置
//             },
//             type: "", // submit || reset
//             onBtnClick: (value) => {
//                 //value 返回的是表单的数据
//                 // type=submit 按钮有提交功能 会自动数据验证
//                 // type=reset  重置表单
//                 // 其余的不用传type值
//                 console.log("按钮点击的事件111", value);
//             }
//         }
//         , {
//             text: "立即上架",
//             wrap: {},
//             onBtnClick: (value) => {
//                 console.log("按钮点击的事件222", value);
//             }
//         }],
//     // form的属性配置
//     layoutConfig: {
//         layout: 'block',
//         // wrapperCol:{
//         //     lg:8
//         // }
//     }
// }
