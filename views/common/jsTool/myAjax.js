const myAjax = function ({url, method, data,contentType, success=()=>{}, error}) {
    const config = {
        url,
        method,
        contentType,
        data,
        complete: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = `/api/login`;
                return false;
            }
            const res = xhr.responseJSON;
            if (!res)
            {
                return ;
            }
            if (res.success) {
                success(res);
            } else {
                console.error(`${url}:${res}`);
                if (error) {
                    error(res);
                }else{
                    const layer = layui.layer;
                    layer.msg(`${res.message}`,{icon:0});
                }
            }
        },
        error: function (err) {
            if (error) {
                error(err);
            }
        },
        xhr: function () {
            if (window.ActiveXObject) {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } else {
                return new window.XMLHttpRequest();
            }
        },
    };

    // 跨域允许携带cookie，IE10+以上以及主流浏览器才支持
    config.xhrFields = {
        withCredentials: true
    }

    return $.ajax(config);
};
export const myAjaxForm=function (form,{url, method, data,contentType, success, error}) {
    const config = {
        url,
        method,
        contentType,
        data,
        complete: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = `/api/login`;
                return false;
            }
            const res = xhr.responseJSON;
            if (!res)
            {
                success(res);
                return;
            }
            if (res.success) {
                success(res);
            } else {
                console.error(`${url}:${res}`);
                if (error) {
                    error(res);
                }else{
                    const layer = layui.layer;
                    layer.msg(`${res.message}`,{icon:0});
                }
            }
        },
        error: function (err) {
            if (error) {
                error(err);
            }
        },
        xhr: function () {
            if (window.ActiveXObject) {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } else {
                return new window.XMLHttpRequest();
            }
        },
    };

    // 跨域允许携带cookie，IE10+以上以及主流浏览器才支持
    config.xhrFields = {
        withCredentials: true
    }

    form.ajaxSubmit(config);
};
export default myAjax;
