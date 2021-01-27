import React from 'react';
import { tabsType } from './type';
import './pro-table-header.less';
interface HeaderProps {
    title: string;
    tabs?: tabsType;
    firstTabsChange: (key: string | number | undefined, value: string | number | undefined) => void;
    secondTabsChange: (key: string | number | undefined, value: string | number | undefined) => void;
}
declare const _default: React.NamedExoticComponent<HeaderProps>;
export default _default;
