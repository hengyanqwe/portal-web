//复制普通对象
export const strCopyObject = (_data) => {
    let newObj = _data.constructor === Array ? [] : {};
    if (typeof _data !== 'object') {
        return ;
    } else {
        Object.keys(_data).map((key,index,arr)=>{
            if(_data[key] || _data[key]=== 0)
            {
                if ( typeof _data[key] !== 'object')
                {
                    newObj[key]=_data[key];
                }else{
                    //先转成json字符串，再转成对象完成复制，但是不能复制函数以及对象互相引用
                    newObj[key]=JSON.parse(JSON.stringify(_data[key]));
                }
            }

        })
    }
    return newObj;
};

//数组转化树结构
export const arrayToTree = function (_data, id, pid, childrenName, itemMap,onIsTree)      //将ID、ParentID这种数据格式转换为树格式
{
    id = id || "id";
    pid = pid || "parentId";
    childrenName = childrenName || "children";

    if (!_data || !_data.length) return [];
    var data = _data;               // 这里可以拷贝数组
    var targetData = [];            // 存储数据的容器(返回)
    var records = {};
    var itemLength = data.length;   // 数据集合的个数
    for (let i = 0; i < itemLength; i++) {
        let o = data[i];
        let key = getKey(o[id]);
        records[key] = o;
    }
    for (let i = 0; i < itemLength; i++) {
        let currentData = data[i];
        let key = getKey(currentData[pid]);
        let parentData = records[key];
        itemMap && (itemMap(currentData,parentData));
        if (!parentData) {
            targetData.push(currentData);
            continue;
        }
        parentData[childrenName] = parentData[childrenName] || [];
        parentData[childrenName].push(currentData);
        onIsTree&&onIsTree(parentData);
        // data[i] = null;
    }
    return targetData;

    function getKey(key) {
        if (typeof (key) == "string") key = key.replace(/[.]/g, '').toLowerCase();
        return key;
    }
};

//树结构转化为数组
export const treeToArray = (_data,key='id',parentIdKey='parentID') => {
    let resultArray = [];
    let treeData = strCopyObject(_data);

    const spread = (treeData, pid) => {
        for (let i = 0; i < treeData.length; i++) {
            let item = treeData[i];
            resultArray.push({...item, [parentIdKey]: pid, children: null});
            if (item.children) {
                spread(item.children, item[key])
                delete item.children
            }
        }
    }

    spread(treeData, null)
    console.log('resultArray',resultArray);
    return resultArray;
};


export const findItemChainArrayByTree=function ({key,value,tree,cache={},level=0,chainArray=[]}) {
    const parentArray=strCopyObject(chainArray);
    tree.map((item)=>{
        if (level===0){
            chainArray=[];
        }
        chainArray.push(item);
        if (item[key]===value){
            cache.result=parentArray.concat([item]);
        }else{
            if (item.children&&!cache.result){
                const result=findItemChainArrayByTree({key,value,tree:item.children,cache,level:level+1,chainArray});
                if (!result)
                {
                    chainArray.pop();
                }
            }else{
                chainArray.pop();
            }
        }
    });
    return cache.result;
}