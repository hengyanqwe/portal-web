export const openUrl=(url)=>{
    if (isIE())
    {
        window.open(url,'_blank',);
    }else{
        window.open(url,'_blank','noreferrer');
    }

}
export const getUrlParams=()=> {
    const  params = {};
    const search = location.search.substring(1);
    if (search) {
        const pairs = search.split('&');
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
    }
    return params;
}