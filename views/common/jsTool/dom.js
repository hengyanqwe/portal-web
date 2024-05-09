import React, {memo,useEffect, useRef} from "react";
import ErrorBoundary from "./ErrorBoundary";
import styles from "../../page/styles.less";

export const getUniqueID=()=>{
    const generateUniqueID=()=>{
        return 'id_'+Math.random().toString(36).substr(2,12);
    }
    let newID=generateUniqueID();
    while (document.getElementById(newID)){
        newID=generateUniqueID();
    }
    return newID;
}
export const show=(dom,b)=>{
    return b?dom:'';
}

export const display=(dom,b)=>{
    return <div style={{display:b?'block':'none'}}>
        {dom}
    </div>;
}

export const TableLoading=({children,loading})=><div className={styles.loading}>
    {loading ?
        <i className={'layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop'}></i> : <i style={{display:'none'}}></i>}
    {children}
</div>;
export const Loading=()=><div style={{width:'100px', height:'100px', position:'absolute', top:'50%', left:'50%', marginTop:'-50px', marginLeft:'-50px'}}>
    <i className = {'layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop'}></i>
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
</div>

export const LazyRender=({component:Component,...props})=>{
    return <Component key={'com'} {...props}/>;
}
