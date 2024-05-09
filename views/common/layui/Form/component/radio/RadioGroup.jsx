import React, {useMemo} from 'react';
import style from './style.less';
import {strCopyObject} from "../../../../jsTool/data";

const RadioGroup = ({children:childrenProps,name,items, className, onClick,}) => {
    const itemsStr=JSON.stringify(items);
    const radios=useMemo(()=>{
        return items.map((item,index)=>{
                return <input type={'radio'} name={name} value={item.value} title={item.title} key={item.value}/>
            });
    },[itemsStr]);
    return <div className={`layui-radio-group ${style.style} ${className}`} onClick={onClick}>
        {radios}
    </div>;
}
export default RadioGroup;