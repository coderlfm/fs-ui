import React, { memo } from 'react';
import { Button } from 'antd';

export default memo(function ButtonText() {
  return (
    <>
      {/* <Button type="text">Link</Button>
            <Button type="text" disabled>
                Link(disabled)
            </Button>
            <br />
             */}

      <Button type="link">文字按钮</Button>
      <Button type="link" disabled>
        禁用按钮
      </Button>
      <br />
    </>
  );
});
