import React, { memo, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, Col, DatePicker, TimePicker, Radio, TreeSelect } from 'antd';
import FsUpload from './Upload';
import './index.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

export default memo((props) => {
  const [form] = Form.useForm();
  let { formProps, submit, circle, resetIsRequest } = props;

  props.form && (props.form.current = form);

  /**
   * 表单提交， 提交时会过滤空值
   * @param {Object} values
   */
  const onFinish = (values) => {
    // debugger;
    const FormFields = form.getFieldsValue();
    const fields = {};
    for (let key in FormFields) {
      if (FormFields[key] !== undefined && FormFields[key] !== '') {
        fields[key] = FormFields[key];
      }
    }
    submit(fields, () => {
      form.resetFields();
    });
  };

  /**
   * 表单重置
   */
  const onReset = () => {
    // 表格表单类型 重置 需要重新请求
    resetIsRequest && submit({});
    form.resetFields();
  };

  const { search, config, layoutConfig } = formProps;

  return (
    <div className="jianfa-form-wrap">
      <Form
        layout="inline"
        form={form}
        // name="control-hooks"
        onFinish={onFinish}
        {...layoutConfig}
        className={`pro-table-form-wrap ${circle ? 'pro-table-form-circle' : ''}`}
      >
        {search && renderForm(search)}

        <Form.Item {...config?.tailLayout} className={config && config?.showBorder === false ? 'submit-form-footer' : 'form-footer'}>
          {config?.otherBtn?.map((item) => {
            return (
              <Button
                {...item.btnProps}
                onClick={() => {
                  const FormFields = form.getFieldsValue();
                  item.onBtnChange && item.onBtnChange(FormFields);
                  item.onClick && item.onClick(FormFields);
                }}
                // className="btn-primary"
                key={item}
              >
                {item.text}
              </Button>
            );
          })}

          {config?.reset === false ? null : (
            <Button htmlType="button" onClick={onReset} className="btn-default">
              {config?.reset?.text || '重置'}
            </Button>
          )}

          <Button type="primary" htmlType="submit" className="btn-primary">
            {config?.submit?.text || '查询'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

/**
 * 渲染搜索表单
 * @param {Array} search 表单配置数组
 */
const renderForm = (search) => {
  /**
   * 渲染input类型
   * @param {String} type input类型
   * @param {Object} searchProps input配置项
   */
  const renderFormEle = (type, searchProps) => {
    type = type.toLowerCase();

    switch (type) {
      case 'input':
        return <Input allowClear {...searchProps} />;

      case 'inputgroup':
        return searchProps.inputGroup;

      case 'select':
        // console.log(searchProps)
        return (
          <Select allowClear {...searchProps}>
            {searchProps.enum.map((item) => (
              <Option value={item.value} key={item.value} label={item.label}>
                {item.label}
              </Option>
            ))}
          </Select>
        );

      case 'radio':
        return (
          <Radio.Group {...searchProps}>
            {searchProps.enum.map((item) => (
              <Radio value={item.value} key={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'rangepicker': //时间选择器
        return <RangePicker allowClear {...searchProps} />;

      case 'datepicker':
        return <DatePicker allowClear {...searchProps} />;

      case 'timepicker':
        return <TimePicker allowClear {...searchProps} />;

      case 'treeselect':
        return <TreeSelect {...searchProps} />;

      case 'upload':
        return <FsUpload {...searchProps} />;

      case 'custom':
        return searchProps;

      default:
        return <Input allowClear {...searchProps} />;
    }
  };

  return search.filter(Boolean).map((item) => {
    const { col, ...otherFormItemProps } = item.wrap;
    return (
      <Col key={otherFormItemProps.name} xs={24} sm={24} xl={8} {...col}>
        <Form.Item colon={false} {...otherFormItemProps}>
          {renderFormEle(otherFormItemProps.type, item.props)}
        </Form.Item>
      </Col>
    );
  });
};
