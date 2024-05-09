import React from 'react';
import style from './style.less';

const DropDown = ({children:childrenProps, className, onClick,}) => {
    return <div className={`layui-form-item ${style.style} ${className}`} onClick={onClick}>

    </div>
}
export default DropDown;