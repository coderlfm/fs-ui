import React, { memo, useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import './index.less';
const CheckboxGroup = Checkbox.Group;

export default memo(function({ checkboxProps = {}, showTitle = false }) {
  // 初始化选中的数组数组
  // console.log("checkboxProps", checkboxProps);

  const plainOptions = checkboxProps?.child || [];
  const [checkedList, setCheckedList] = useState([]);
  const [show, setShow] = useState({});
  const [checkAll, setCheckAll] = useState();
  useEffect(() => {
    const defaultCheckedList = [];
    if (checkboxProps?.checked) {
      checkboxProps?.child?.map(ele => {
        defaultCheckedList.push(ele.value);
      });
    } else {
      checkboxProps?.child?.map(ele => {
        if (ele['checked']) {
          defaultCheckedList.push(ele.value);
        }
      });
    }
    // console.log("setCheckedList",defaultCheckedList);
    setCheckedList(defaultCheckedList);
    // 设置初始化样式
    let initShow = {};
    if (
      defaultCheckedList.length > 0 &&
      defaultCheckedList.length !== checkboxProps?.child?.length
    ) {
      initShow = {
        indeterminate: true,
      };
    }
    setShow(initShow);
    setCheckAll(defaultCheckedList.length === checkboxProps?.child?.length);
  }, [checkboxProps]);
  const onChange = list => {
    setCheckedList(list);
    setShow({
      indeterminate: !!list.length && list.length < plainOptions.length,
    });
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    // 设置权限按钮的样式
    if (checkedList?.length > 0) {
      setShow({
        indeterminate: false,
      });
    } else {
      setShow({});
    }
    let arr = [];
    //选中
    if (e.target.checked) {
      plainOptions?.map(ele => {
        arr.push(ele.value);
      });
    }
    setCheckedList(arr);
    setCheckAll(e.target.checked);
  };
  useEffect(() => {
    // console.log("执行了child1", checkedList)
    if (typeof checkboxProps?.changeFn === 'function') {
      // console.log("执行了child2", checkedList)
      checkboxProps.changeFn({ [checkboxProps.value]: checkedList });
    }
  }, [checkedList]);

  const dom1 = (
    <div>
      <div className="checkbox-parent">
        <Checkbox {...show} onChange={onCheckAllChange} checked={checkAll}>
          {checkboxProps?.label}(全选)
        </Checkbox>
      </div>
      <div className="checkbox-child">
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </div>
    </div>
  );

  const dom2 = (
    <div className="checkbox-title-wrapper">
      <div className="checkbox-parent">
        <div className="checkbox-title">{checkboxProps?.label}</div>
        <Checkbox {...show} onChange={onCheckAllChange} checked={checkAll}>
          全选
        </Checkbox>
      </div>
      <div className="checkbox-child" style={{ marginLeft: '24px' }}>
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </div>
    </div>
  );

  return <>{!showTitle ? dom1 : dom2}</>;
});
