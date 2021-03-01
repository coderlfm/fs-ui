import React, { memo, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  ConfigProvider,
  Col,
  DatePicker,
  TimePicker,
  Radio,
} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import ProCheckbox from '../../form/pro-checkbox';
import ProUpload from '../../form/pro-upload';
import ProFormList from './child/pro-form-list';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import './index.less';

import { propsType, formconfigItemButtonType, formItemInputType } from './type';

export default memo(function(formProps: propsType) {
  const [form] = Form.useForm();

  useEffect(() => {
    // console.log("inint", formProps?.initValue)
    form.setFieldsValue(formProps?.initValue);
  }, [formProps?.initValue]);

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="form-page-layout">
        <div className="head-title">{formProps?.propTitle}</div>
        <div className="form-wrapper">
          <Form
            layout="horizontal"
            {...formProps.layoutConfig}
            initialValues={
              formProps?.initValue ? formProps.initValue : undefined
            }
            form={form}
          >
            <Form.Item style={{ marginBottom: '4px', background: '#fff' }}>
              {formProps?.formArr?.map(item => {
                return (
                  <div key={item.title} className="form-wrap-item">
                    <div className="sub-title">{item.title}</div>
                    <Col xs={14} sm={14} xl={14} offset={5}>
                      {item.search && renderForm(item.search)}
                      {/* </div> */}
                    </Col>
                  </div>
                );
              })}
            </Form.Item>
            <Form.Item style={{ display: 'flex', textAlign: 'center' }}>
              <div className="form-wrap-item form-wrap-btn">
                <Col xs={14} sm={14} xl={14} offset={5}>
                  {formProps?.config?.map(item => {
                    return (
                      <Button
                        {...item.wrap}
                        onClick={() => {
                          // 提交数据
                          const FormFields = form.getFieldsValue();
                          // console.log("FormFields",FormFields);
                          if (typeof item.onBtnClick === 'function') {
                            if (item.type === formconfigItemButtonType.submit) {
                              form.validateFields().then(
                                values => {
                                  // console.log('数据验证通过', values);
                                  item.onBtnClick(values);
                                },
                                () => {},
                              );
                            } else if (
                              item.type === formconfigItemButtonType.reste
                            ) {
                              form.resetFields();
                              item.onBtnClick(FormFields);
                            } else {
                              item.onBtnClick(FormFields);
                            }
                          }
                        }}
                        style={{ marginRight: '24px' }}
                        key={item.text}
                      >
                        {item.text}
                      </Button>
                    );
                  })}
                </Col>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
});

// export cosnt renderFormType = propsType["formArr"][0]["search"];

const renderForm = (search: propsType['formArr'][0]['search']) => {
  /**
   * 渲染input类型
   * @param {String} type input类型
   * @param {Object} searchProps input配置项
   */
  const renderFormEle = (type, searchProps) => {
    const formItemInput: formItemInputType = type.toLowerCase();
    let ele;
    // console.log('formItemInput', formItemInput, formItemInputType.rangepicker, formItemInput === formItemInputType.rangepicker)
    switch (formItemInput) {
      case formItemInputType.input:
        ele = <Input allowClear {...searchProps} />;
        // ele = <div allowClear {...searchProps}>11111</div>;
        break;

      case formItemInputType.select:
        ele = (
          <Select allowClear {...searchProps}>
            {searchProps.enum.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        );
        break;

      case formItemInputType.rangepicker:
        console.log('formItemInput true');
        ele = <RangePicker allowClear {...searchProps} />;
        break;
      case formItemInputType.timepicker:
        ele = <TimePicker allowClear {...searchProps} />;
        break;
      case formItemInputType.datepicker:
        ele = <DatePicker allowClear {...searchProps} />;
        break;
      case formItemInputType.radio:
        ele = (
          <Radio.Group {...searchProps}>
            {searchProps.enum.map(item => (
              <Radio value={item.value} key={item.value}>
                {item.label}
              </Radio>
            ))}
          </Radio.Group>
        );
        break;
      case formItemInputType.checkbox:
        ele = (
          <Checkbox.Group {...searchProps}>
            {searchProps.enum.map(item => (
              <Checkbox value={item.value} key={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
        break;
      case formItemInputType.textarea:
        ele = <TextArea allowClear {...searchProps} />;
        break;
      case formItemInputType.procheckbox:
        ele = (
          <ProCheckbox {...searchProps} checkbox_group={searchProps.enum} />
        );
        break;
      case formItemInputType.proupload:
        ele = <ProUpload {...searchProps} defaultList={searchProps.enum} />;
        // ele = null;
        break;
      case formItemInputType.proformlist:
        ele = (
          <ProFormList
            {...searchProps}
            formTableArr={searchProps.filedTitle}
            formName={searchProps.filedName}
          />
        );
        break;
      default:
        ele = <Input allowClear {...searchProps} />;
    }
    return ele;
  };

  return search.map(item => {
    return (
      <Form.Item colon={false} {...item.wrap} key={item.wrap.name as string}>
        {renderFormEle(item.wrap.type, item.props)}
      </Form.Item>
    );
  });
};
