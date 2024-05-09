import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";

export default () => {
    const [menus, setMenus] = useState([]);
    const menuIconPaths = useMemo(() => ((menus || []).filter(item => item.menuType === 'M') || []).map(item => item.iconPath), [menus]);
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname} = location;

    const MenuItem = ({value, title, icon}) => {
        return <li key={value}>
            <div className={`layui-menu-body-title ${(pathname.startsWith(value)) ? 'layui-menu-item-checked' : ''}`}
                 onClick={() => navigate(value)}
                //onClick={()=>setMenus(menus.map(menu=>({...menu,menuName:Math.random()})))}>
            >
                <a><i className={`layui-icon layui-icon-${icon}`}></i>{title}</a>
            </div>
        </li>
    }
    return <div className={'layui-side'}>
        <div className={'layui-panel'} style={{width: '146px', margin: '16px'}}>
            <ul className={'layui-menu'}>
                <MenuItem value={'/menu'} title={'菜单'} icon={'set'} key={'menu'}/>
                <MenuItem value={'/role'} title={'角色'} icon={'key'} key={'role'}/>
                <MenuItem value={'/group'} title={'用户组'} icon={'user'} key={'group'}/>
            </ul>
        </div>
    </div>;
}
