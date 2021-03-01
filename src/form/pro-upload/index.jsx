import React, { memo, useState, useEffect } from 'react';
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Upload } from 'antd';
import { MD5 } from 'crypto-js';
// import moment from 'moment'
import './index.less';

export default memo(function({
  imageParams = {},
  accept = '.jpg',
  defaultList = [],
  is_only,
  actionUrl,
  imgUrl,
  onChange,
  fileUrl,
}) {
  // console.log('defaultArr11111',defaultList);

  //当前时间
  const [currentDate, setCurrentDate] = useState('');
  // 图片上传次数
  const [uploadCount, setUploadCount] = useState(0);
  // 商品图片对象数组
  const [proPicList, setProPicList] = useState([]);
  // 图片地址数组
  const [proPics, setProPics] = useState([...defaultList]);
  //展示的图片数组
  const [proArr, setProArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const [lock, setLock] = useState(false);

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined
          style={{ fontSize: '46px', color: '#1890FF', opacity: '0.31' }}
        />
      ) : (
        <PlusOutlined
          style={{ fontSize: '46px', color: '#1890FF', opacity: '0.31' }}
        />
      )}
    </div>
  );

  //获取初始值
  useEffect(() => {
    setCurrentDate(Date.now());
  }, []);

  useEffect(() => {
    // let defaultArr = [...defaultList];
    let defaultArr = JSON.parse(JSON.stringify(defaultList));
    defaultArr.forEach(item => {
      item.uid = item.path;
      item.key = item.path;
      item.name = item.path;
      item.status = 'done';
      if (!item.url?.includes(imgUrl)) {
        item.url = `${imgUrl}` + item.path;
      }
      if (!item.path?.includes(imgUrl)) {
        item.path = `${imgUrl}` + item.path;
      }
    });

    // console.log('defaultArr',defaultArr);

    setProArr([...defaultArr]);
    // //给
    // setProPics([...defaultList]);
  }, [defaultList]);

  useEffect(() => {
    //防止一进来就规则校验
    if (!lock && proPics.length === 0) {
      // console.log("图片地址22++++");
      return;
    }
    if (typeof onChange === 'function') {
      console.log('图片地址11', proPics);
      setLock(true);
      onChange(proPics);
    }
  }, [proPics]);

  // useEffect(() => {
  //     console.log("删除图片后的数组", proArr)
  // }, [proArr]);

  // 删除图片
  const handleDel = index => {
    const arr1 = [...proPics];
    const arr2 = [...proArr];
    arr1.splice(index, 1);
    arr2.splice(index, 1);
    setProPics([...arr1]);
    setProArr([...arr2]);
  };
  // 设置为封面图
  const handleCover = index => {
    const arr1 = [...proPics];
    const arr2 = [...proArr];
    arr1.forEach(item => {
      item.is_cover = 0;
    });
    arr2.forEach(item => {
      item.is_cover = 0;
    });
    arr1[index].is_cover = 1;
    arr2[index].is_cover = 1;
    setProPics([...arr1]);
    setProArr([...arr2]);
  };

  const eventAction = () => {
    const fileName = `${fileUrl}${MD5(
      `${fileUrl}${uploadCount}${currentDate}`,
    )}${accept}`;
    setUploadCount(uploadCount + 1);
    if (is_only === 1) {
      setProPics([{ path: fileName, is_cover: 0 }]);
      setProArr([{ path: `${imgUrl}${fileName}`, is_cover: 0 }]);
      return;
    } else {
      setProPics([...proPics, { path: fileName, is_cover: 0 }]);
      setProArr([...proArr, { path: `${imgUrl}${fileName}`, is_cover: 0 }]);
    }
  };

  return (
    <>
      <div className="upload-wrapper">
        <Upload
          // style={{ overflow: 'hidden', width: '104px', height: '104px',border:"1px solid #000" }}
          // name="file"
          accept={accept}
          listType="picture-card"
          fileList={proPicList}
          className="avatar-uploader"
          // 不能显示列表
          showUploadList={false}
          action={actionUrl}
          data={{
            key: `${fileUrl}${MD5(
              `${fileUrl}${uploadCount}${currentDate}`,
            )}${accept}`,
            // key: `${fileUrl}${`${fileUrl}${uploadCount}${currentDate}`}${accept}`,
            OSSAccessKeyId: imageParams.accessid,
            ...imageParams,
          }}
          onChange={({ fileList: newFileList, event }) => {
            setLock(true);
            console.log('onchange11 newFileList', newFileList);
            setProPicList(newFileList);
            if (event) {
              setTimeout(() => {
                eventAction();
              }, 200);
            }
          }}
        >
          {!is_only ? uploadButton : ''}
          {is_only ? (
            proArr.length > 0 ? (
              <img
                src={proArr[0].path}
                alt="avatar"
                style={{ width: '86px', height: '86px' }}
              />
            ) : (
              uploadButton
            )
          ) : (
            ''
          )}
        </Upload>
        {is_only !== 1 &&
          proArr.map((item, index) => {
            return (
              <div className="img-list" key={item.path}>
                <div className="pic-item">
                  <img src={item.path} alt="" />
                  <div
                    onClick={() => {
                      handleDel(index);
                    }}
                  >
                    <DeleteOutlined
                      style={{ color: '#fff', fontSize: '16px' }}
                    />
                  </div>
                </div>
                <div
                  className={
                    item.is_cover ? 'content-item' : 'content-item active'
                  }
                  onClick={() => {
                    handleCover(index);
                  }}
                >
                  {item.is_cover ? '当前封面' : '设为封面'}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
});
