import React from "react";
import style from './style.less';
const Card=({header,title,extra,children,bodyStyle,className})=>{
    return <div className={`layui-card ${className} `+style.style}>
        <div className="layui-card-header">{header?header:<div>
            <span className={'title'}>
                {title}
            </span>
            <div className={'extra'}>
                {extra}
            </div>
        </div>}</div>
        <div className="layui-card-body" style={bodyStyle}>
            {children}
        </div>
    </div>;
};
export {Card};
export default Card;