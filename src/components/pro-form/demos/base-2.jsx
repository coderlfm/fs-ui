// import React, { memo } from 'react'
import { memo, useState, useEffect, useRef } from 'react';
import { FsTable, FsForm } from 'fs-pro-ui';
import { Button, Modal, Space, message, Tree, Input, Form } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default memo(function () {
  const form = useRef();

  const setTreeData = (data) => {
    return data.map((item) => {
      const tree = {
        title: item.menu_name,
        key: item.menu_key,
        value: item.menu_key,
      };
      if (item.sub_list) tree.children = setTreeData(item.sub_list);
      return tree;
    });
  };

  const setShopTreeData = (data) => {
    return data.map((item) => {
      let tree;
      // debugger
      if (item.area_id) {
        tree = {
          title: item.area_name,
          key: 'area_id:' + item.area_id,
          value: 'area_id:' + item.area_id,
        };
      } else {
        tree = {
          title: item.shop_name,
          key: item.shop_id,
          value: item.shop_id,
        };
      }
      if (item.shops) tree.children = setShopTreeData(item.shops);
      return tree;
    });
  };

  const submit = async (values, cb) => {
    console.log(values);
  };

  const editformProps = {
    search: [
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'nickname',
          name: 'nickname',
          label: `昵称`,
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: `请输入昵称` },
      },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'account_name',
          name: 'account_name',
          label: `账号`,
          type: 'input',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: { placeholder: `请输入账号` },
      },

      // {
      //   wrap: {
      //     col: { xl: 24, },
      //     colon: true,
      //     key: 'menus',
      //     name: 'menus',
      //     label: '菜单权限',
      //     type: 'custom',
      //     // rules: [{ required: true, message: '该项为必填' }]
      //   },
      //   // props: {
      //   //   showCheckedStrategy: "SHOW_PARENT",
      //   //   treeCheckable: true,
      //   //   placeholder: '请选择门店权限',
      //   //   treeData: menulist,
      //   //   dropdownClassName: 'dropdown-select-wrap',
      //   // },
      //   // 由于使用 treedata 不方便预览 所以使用 tree
      //   props: <Tree
      //     checkable
      //     autoExpandParent={true}
      //     treeData={menulist}
      //     key='menu_key'
      //     checkedKeys={rightCheckedKeys}
      //     // defaultExpandAll
      //     onCheck={(checkedKey, e) => setRightCheckedKeys(checkedKey)}
      //   />,
      // },
      {
        wrap: {
          col: { xl: 24 },
          colon: true,
          key: 'shop_ids',
          name: 'shop_ids',
          label: '门店权限',
          type: 'treeselect',
          rules: [{ required: true, message: '该项为必填' }],
        },
        props: {
          placeholder: '请选择门店',
          showCheckedStrategy: 'SHOW_ALL',
          treeCheckable: true,
          maxTagCount: 15,
          treeData: setShopTreeData(shopData.list),
          // defaultValue: activityFormInitialVal.shop_ids || []
        },
      },
    ],
    config: {
      // 底部布局
      tailLayout: { wrapperCol: { offset: 5 } },
      showBorder: false,
      submit: { text: '提交' },
    },
    layoutConfig: {
      layout: 'horizontal',
      labelCol: { xs: { span: 24 }, sm: { span: 5 } },
    },
  };

  return <FsForm form={form} formProps={editformProps} submit={submit} />;
});

const shopData = {
  list: [
    {
      area_id: '9',
      area_name: '厦门市',
      rank: 1,
      shops: [
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
        {
          shop_id: '31',
          shop_name: '厦门建发进口大众',
          address: '厦门市湖里大道43号（联泰大厦1楼）',
        },
        {
          shop_id: '32',
          shop_name: '厦门建发凯迪拉克',
          address: '厦门市集美区岩兴路89号（北站车管所旁）',
        },
        {
          shop_id: '33',
          shop_name: '建发厦门捷豹路虎中心',
          address: '厦门市集美区岩兴路89号',
        },
        {
          shop_id: '34',
          shop_name: '厦门建发林肯中心',
          address: '厦门市翔安区民安大道2807号',
        },
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
        {
          shop_id: '37',
          shop_name: '厦门建发广汽三菱',
          address: '厦门市湖里区长乐路8号',
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
        {
          shop_id: '40',
          shop_name: '厦门威马用户中心湖里店',
          address: '厦门市湖里区长乐路10-1号（保税区附近）',
        },
        {
          shop_id: '41',
          shop_name: '厦门建发汽车生活馆',
          address: '厦门市湖里区长乐路8号',
        },
        {
          shop_id: '42',
          shop_name: '迈凯伦厦门',
          address: '厦门市湖里区长乐路8号',
        },
        {
          shop_id: '43',
          shop_name: '阿斯顿·马丁厦门',
          address: '厦门市湖里区长乐路8号',
        },
        {
          shop_id: '44',
          shop_name: '厦门建发沃尔沃中心',
          address: '厦门市集美区岩兴路89号',
        },
      ],
    },
    {
      area_id: '1',
      area_name: '福州市',
      rank: 2,
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
          shop_id: '5',
          shop_name: '福州建发广汽三菱',
          address: '福州市闽侯县青口汽车城一期内（建发三菱）',
        },
        {
          shop_id: '6',
          shop_name: '福州建发讴歌青口店',
          address: '福州市闽侯县青口汽车城一期内（建发讴歌）',
        },
        {
          shop_id: '7',
          shop_name: '福州建发汽车生活馆',
          address: '福州市仓山区盖山投资区高仕路7号',
        },
        {
          shop_id: '8',
          shop_name: '福州建发凯迪拉克',
          address: '福州市马尾区马江路28号',
        },
        {
          shop_id: '9',
          shop_name: '福州建发捷路沃尔沃',
          address: '福州市马尾区马江路28号',
        },
      ],
    },
    {
      area_id: '8',
      area_name: '泉州市',
      rank: 3,
      shops: [
        {
          shop_id: '23',
          shop_name: '泉州建发凯迪拉克',
          address: '泉州市晋江市晋江SM广场旁豪信汽车城',
        },
        {
          shop_id: '24',
          shop_name: '建发泉州路虎捷豹中心',
          address: '泉州市鲤城区南环路1388号',
        },
        {
          shop_id: '25',
          shop_name: '泉州建发林肯中心',
          address: '泉州市鲤城区南环路1388号',
        },
        {
          shop_id: '26',
          shop_name: '泉州建发广汽三菱',
          address: '泉州市鲤城区南环路1388号',
        },
        {
          shop_id: '27',
          shop_name: '泉州建发汽车生活馆',
          address: '泉州市晋江市晋江SM广场旁豪信汽车城',
        },
      ],
    },
    {
      area_id: '7',
      area_name: '莆田市',
      rank: 4,
      shops: [
        {
          shop_id: '20',
          shop_name: '莆田建发凯迪拉克',
          address: '莆田市荔城区西天尾洞湖口旁',
        },
        {
          shop_id: '21',
          shop_name: '建发莆田捷豹路虎中心',
          address: '莆田市荔城区西天尾绿森庄园内',
        },
        {
          shop_id: '22',
          shop_name: '莆田建发汽车生活馆',
          address: '莆田市荔城区西天尾洞湖口旁',
        },
      ],
    },
    {
      area_id: '10',
      area_name: '汕头市',
      rank: 5,
      shops: [
        {
          shop_id: '45',
          shop_name: '汕头众驰进口大众',
          address: '汕头市龙湖区黄河路39号',
        },
        {
          shop_id: '46',
          shop_name: '汕头众成凯迪拉克',
          address: '广东省汕头市龙湖区泰山路156号',
        },
        {
          shop_id: '47',
          shop_name: '汕头众驰红旗体验中心',
          address: '汕头市龙湖区黄河路39号',
        },
      ],
    },
    {
      area_id: '6',
      area_name: '柳州市',
      rank: 6,
      shops: [
        {
          shop_id: '19',
          shop_name: '柳州保时捷中心',
          address: '展厅地址：柳州市东环大道228号双福雅苑   \n售后服务：柳州市桂柳路1-1号',
        },
      ],
    },
    {
      area_id: '5',
      area_name: '西安市',
      rank: 7,
      shops: [
        {
          shop_id: '18',
          shop_name: '西安灞桥保时捷中心',
          address: '西安市灞桥区东南三环月登阁桥下高端汽车主题公园内',
        },
      ],
    },
    {
      area_id: '4',
      area_name: '沈阳市',
      rank: 8,
      shops: [
        {
          shop_id: '16',
          shop_name: '沈阳国展保时捷中心',
          address: '沈阳市浑南新区浑南西路99号',
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
    },
    {
      area_id: '3',
      area_name: '南宁市',
      rank: 9,
      shops: [
        {
          shop_id: '14',
          shop_name: '南宁江南保时捷中心',
          address: '广西南宁市江南区南站大道11号',
        },
        {
          shop_id: '15',
          shop_name: '宾利南宁',
          address: '广西南宁市江南区白沙大道100-1号',
        },
      ],
    },
    {
      area_id: '2',
      area_name: '昆明市',
      rank: 10,
      shops: [
        {
          shop_id: '10',
          shop_name: '昆明滇池保时捷中心',
          address: '云南省昆明市日新东路与海埂路交叉口',
        },
        {
          shop_id: '11',
          shop_name: '宾利昆明',
          address: '销售地址：昆明市日新路259号  \n售后地址：昆明市日新东路与海埂路交叉口',
        },
        {
          shop_id: '12',
          shop_name: '阿斯顿·马丁昆明',
          address: '销售地址：昆明市日新路259号  \n售后地址：昆明市日新东路与海埂路交叉口',
        },
        {
          shop_id: '13',
          shop_name: '昆明凯通凯迪拉克',
          address: '云南省昆明市西山区日新东路259号',
        },
      ],
    },
    {
      area_id: '11',
      area_name: '长春市',
      rank: 11,
      shops: [],
    },
  ],
  total: 11,
  page: 0,
  page_size: 20,
};
