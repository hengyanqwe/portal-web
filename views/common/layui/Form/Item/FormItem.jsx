import React from 'react';
import style from './style.less';

const FormItem = ({children:childrenProps, className, onClick,label,required}) => {
    let children=childrenProps;
    if (React.isValidElement(children)){
        const config={};
        if (required)
        {
            config.layVerify='required';
        }
        children=React.cloneElement(children,config)
    }
    return <div className={`layui-form-item ${style.style} ${className}`} onClick={onClick}>
        {label?
            <label className={'layui-form-label'}>
                {required?<span className={'requiredMark'}>*</span>:''}
                {label}
            :</label>:''}
        <div className={'layui-input-block'}>
            {children}
        </div>
    </div>
}
export default FormItem;