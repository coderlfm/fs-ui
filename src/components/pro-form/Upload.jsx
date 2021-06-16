import { memo, useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default memo(function ({ maxCount, ...props }) {
  const [fileList, setFileList] = useState([]);

  // console.log('fileList:', fileList, props)
  return (
    <Upload
      fileList={fileList}
      {...props}
      onChange={({ fileList }) => {
        console.log('onChange', fileList);
        setFileList(fileList);
      }}
    >
      {!maxCount || (maxCount && fileList.length <= maxCount) ? (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>上传</div>
        </div>
      ) : null}
    </Upload>
  );
});
