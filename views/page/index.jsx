import React, {useEffect, useRef, useState,Suspense} from 'react';
import styles from './styles.less';
import {LazyRender, Loading, show} from "@/common/jsTool/dom";
import {openUrl} from "@/common/jsTool/urlTool";
import {arrayToTree} from "@/common/jsTool/data";
import {ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";
import 'dayjs/locale/zh-cn'
import {BrowserRouter, useLocation, useNavigate, useRoutes,} from "react-router-dom";
import routesConfig from "./routes";

function Routes() {
    function getRoutes(routes){
        return routes.map(({...route}) => {
            const path = route.element;
            const Component=React.lazy(() => import(`@/page/${path}`));
            delete route.element;
            const result={...route, element:<Suspense fallback={<Loading/>}><Component/></Suspense>};
            const children=result.children;
            if (children){
                result.children=getRoutes(children);
            }
            return result;
        });
    }
    const routes = getRoutes(routesConfig);
    const element=useRoutes(routes);
    return <div>{element}</div>;
}


const App = () => {
    return <BrowserRouter>
        <div className={`${styles.page} IE${isIE()}`}>
            <div className={"layui-layout layui-layout-admin " + styles.layout}>
                <div className={"layui-body"}>
                    <div className="layui-tab layui-tab-brief" lay-filter="test-hash">
                        <div className="layui-tab-content">
                            <Routes/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BrowserRouter>
}


export default () => {
    return <ConfigProvider locale={zhCN}>
        <App/>
    </ConfigProvider>
}
