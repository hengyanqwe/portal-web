import React,{Component} from 'react';
//此组件为错误边际组件，避免某个组件上的错误扩散到整个页面，实际使用中发现似乎没有生效
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state= {hasError:false};
    }
    //后代组件出现错误时的生命周期回调函数，参数为抛出的异常，返回值会用于更新此组件的state
    static getDerivedStateFromError(error){
        alert(1)
        return { hasError: true,error:error};
    }

    componentDidCatch(error, errorInfo) {
        //用于将错误日志上传到服务器
        //...
    }

    render() {

        if (this.state.hasError)
        {
            return <h1>抱歉，此页面发生错误！{this.state.error}</h1>;
        }

        return this.props.children;
    }


}
export default ErrorBoundary;