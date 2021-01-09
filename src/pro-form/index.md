---
title: Form 表单
order: 1000
nav:
  title: 组件
  path: /components
group:
  title: Form
  path: /Form
  order: 3
---

## Form

代码演示:

<code src="./demos/basic.tsx">

## API

### formProps

| 参数         | 说明                                                              | 类型                                                | 默认值 |
| ------------ | ----------------------------------------------------------------- | --------------------------------------------------- | ------ |
| search       | 搜索框类型                                                        | [searchType[ ]](#searchtype)                        |        |
| config       | 表单其他项配置                                                    |                                                     |        |
| layoutConfig | antd [form](https://ant.design/components/form-cn/#Form) 标准配置 | [form](https://ant.design/components/form-cn/#Form) |

<br/>

### searchType

搜索框配置
| 属性 | 描述 | 类型 | 默认值 |
| :------- | -------- | --------- | -------- |
|wrap |form.Item 配置 |[form.Item](#formitem) | |
|props |input 配置 |[form.input.props](#forminputprops) | |

props 为注入到 input 框的配置，可根据不同 input 来配置不同配置项，都为 antd input 标准配置项 `<Input allowClear {...props} />`
如为下拉选择框，则在 props 中配置 [enum](#enumtype) 属性
<br/>

#### enumType

下拉选择项配置
| 属性 | 描述 | 类型 | 默认值 |
| :------- | -------- | --------- | -------- |
|label |option 标签的文本 |`string` | |
|value |option 标签的值 |`string` \| `number` | |

<br/>

#### form.Item

该配置会注入至 `<Form.Item {...item.wrap}> </Form.Item>`
| 属性 | 描述 | 类型 | 默认值 |
| :------- | -------- | --------- | -------- |
|name |传入后端的 key |`string` \|`number` | |
|label |label 标签的文本 |`string` \|`number`||
|type |搜索 input 类型 |`input` \| `select` \| `rangepicker` \| `timepicker`| `input`|
|col |响应式布局 antd [col](https://ant.design/components/grid-cn/#Col) 标准配置 |[col](https://ant.design/components/grid-cn/#Col) |{ xs:{24}, sm:{24}, xl:{8} }|

<br/>

[更多技巧](https://d.umijs.org/guide/demo-principle)
