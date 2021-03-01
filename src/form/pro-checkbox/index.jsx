import React, { memo, useEffect, useState } from 'react';
import Checkbox from './child';
export default memo(function({ checkbox_group = [], onChange }) {
  const [allChecked, setAllChecked] = useState({});
  const arr = [...checkbox_group];
  // console.log(checkbox_group,"checkbox_group")
  useEffect(() => {
    let newArr = {};
    const handleChangeFn = value => {
      setAllChecked({ ...allChecked, ...value });
      const key = Object.keys(value)?.[0];
      newArr[key] = value[key];
      if (typeof onChange === 'function') {
        onChange(newArr);
      }
    };
    arr.forEach(item => {
      item.changeFn = handleChangeFn;
    });
  }, [checkbox_group]);

  return (
    <>
      <div>
        {arr?.map(item => {
          return (
            <Checkbox
              checkboxProps={item}
              key={item.value}
              showTitle={item.showTitle}
            ></Checkbox>
          );
        })}
      </div>
    </>
  );
});
