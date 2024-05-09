import React from 'react';
import style from './style.less';
const Button=({children,className,name,onClick,type,laySubmit:laySubmitProps,layFilter,id,...restProps})=>{
    let laySubmit=laySubmitProps;
    if (type==='submit'&&!laySubmitProps)
    {
        laySubmit=true;
        type='layui-submit';
    }
    return <button type={type||'button'}
                   className={`layui-btn ${style.style} ${className}`}
                   onClick={onClick}
                   lay-submit={laySubmit}
                   lay-filter={layFilter}
                   id={id}
                   name={name}
                   {...restProps}>
        {children}
    </button>
}
export default Button;