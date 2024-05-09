import React, {useEffect, useMemo, useState} from "react";
import style from "./style.less";
import {LazyRender, show} from "@/common/jsTool/dom";
import {arrayToTree} from "@/common/jsTool/data";
import MenuLeft from "@/page/admin/MenuLeft";
import {Outlet} from "react-router-dom";

export default ({}) => {
    return <div className={style.style}>
        <div className={'layui-layout layui-bg-gray'}>
            <MenuLeft/>
            <div className={'layui-body'} style={{paddingBottom:'0px'}}>
                {/*<Outlet/>*/}
            </div>
        </div>
    </div>
}
