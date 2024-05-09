import React, {memo, useEffect, useMemo, useState} from 'react';
import style from './style.less';
import PropTypes from 'prop-types';
import {getUniqueID} from "../../../../jsTool/dom";
const Com = memo(({id,className,onClick,children}) =>{

        return <div id={id}
             className={`${style.style} ${className}`}
             onClick={onClick}>
            {children}
        </div>
}
        , () => true);
const Transfer = ({children,data,defaultValue,title,width,height,className,onChange,onClick,id:propsId,name}) => {
    const transferId=useMemo(()=>{
        return getUniqueID();
    },[]);
    const id=propsId||transferId;
    const [value,setValue]=useState(defaultValue||[]);
    useEffect(()=>{
        layui.use(function(){
            var transfer=layui.transfer;
            setTimeout(()=>{
                    transfer.render({
                        elem:'#'+id,
                        title,
                        id:`${id}_inst`,
                        data:data,
                        onchange:onChange||function(params){
                            const newValue=transfer.getData(`${id}_inst`).map(item=>item.value);
                            setValue(newValue);
                        },
                        width,
                        height,
                    });
                    transfer.reload(`${id}_inst`,{
                        value
                    });
                    //layui@2.8.11在ie8下会多出undefined选项，特此删除
                    $('li').each(function(){
                        var inputVal=$(this).find('input').val();
                        if (inputVal==='undefined'||inputVal===''){
                            $(this).remove();
                        }
                    });
                },
            50);

        });
    },[]);
    useEffect(()=>{
        setTimeout(()=>{
            const transfer=layui.transfer;
            transfer.reload(`${id}_inst`,{data:data});
        },50);
    },[data]);
    const valueInput=()=>{
        if (!name){
            return [];
        }
        return [<input type={'text'} name={`${name}`} value={value.join(',')} className={'layui-hide'}/>];
    }
    return [

        ...valueInput(),
        <Com children={children} className={className} onClick={onClick} id={id}/>
    ];
}
Transfer.propTypes={
    onChange:PropTypes.function,//function(data,index(0左1右)){}
}
export default Transfer;