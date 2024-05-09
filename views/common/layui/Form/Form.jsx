import React, {useEffect, useMemo, useRef, useState} from 'react';
import style from './style.less';
import {getUniqueID} from "../../jsTool/dom";
const Form=({children,className,onClick,action,initialValue,onSubmit})=>{
    const formRef=useRef({current:{}});
    const formId=useMemo(()=>{
        return getUniqueID();
    },[]);
    useEffect(()=>{
        const buttonId=getUniqueID();
        const submitButton=$(formRef.current).find('button[type=layui-submit]');
        submitButton.attr('lay-filter',buttonId);
        submitButton.attr('id',buttonId);
        const form=layui.form;
        form.on(`submit(${buttonId})`,function(data){
            const field=data.field;
            onSubmit(field);
            return false;
        });
        return ()=>{
            layui.off('form');
        }
    },[]);
    useEffect(()=>{
        setTimeout(()=>{
            layui.use(function() {
                const form = layui.form;
                form.val(formId,initialValue);
            });
        },100);
    },[initialValue]);
    return <form className={`layui-form ${style.style} ${className}`} ref={formRef} onClick={onClick} action={action} lay-filter={formId} id={formId}>{children}</form>
}
export default Form;