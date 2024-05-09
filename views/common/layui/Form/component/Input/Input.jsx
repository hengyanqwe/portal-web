import React from 'react';
import style from './style.less';

const Input = ({children, className, onClick,label,type='text',name,id,autoComplete='off',placeholder='请输入',layVerify}) => {
    return <input className={`layui-input ${style.style} ${className}`}
                  onClick={onClick}
                  type={type}
                  name={name}
                  id={id}
                  autocomplete={autoComplete}
                  placeholder={placeholder}
                  lay-verify={layVerify}>
        {children}
    </input>
}
export default Input;