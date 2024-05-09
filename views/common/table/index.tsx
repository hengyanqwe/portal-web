import React, {useEffect, useState} from 'react';
import {Spin, Table, TableProps} from 'antd';

interface IRes<RecordType> {
    success: boolean,
    code: number,
    msg: string,
    data: RecordType[],
}

// 扩展Ant Design的TableProps来定义新的属性类型，其中dataSource可以是函数类型
interface CustomTableProps<RecordType> extends Omit<TableProps<RecordType>, 'dataSource'> {
    dataSource: (params: {}) => Promise<IRes<RecordType> | RecordType[]> | RecordType[];
    params: {},
  mark?: string,
}

// 定义CustomTable组件，支持异步dataSource
const CommonTable = <RecordType extends object = any>({
                                                          dataSource,
                                                          params,
                                                          mark,
                                                          ...props
                                                      }: CustomTableProps<RecordType>) => {
    const [data, setData] = useState<RecordType[]>([]); // 用于存储数据的状态
    const [loading, setLoading] = useState<boolean>(true); // 控制加载状态的状态
    const [error, setError] = useState<Error | null>(null); // 用于存储错误信息的状态

    // 使用useEffect处理数据的异步加载
    useEffect(() => {
        if (typeof dataSource !== 'function') {
            setData(dataSource);
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            return new Promise<RecordType[]>(async (resolve, reject) => {
                setLoading(true); // 开始加载时，设置loading为true
                try {
                    // 执行dataSource，支持函数形式，处理异步数据获取
                    const result = await dataSource(params) as IRes<RecordType>;
                    if (result.success) {
                        resolve(result.data);
                    } else {
                        reject(result.msg);
                    }
                } catch (err: any) {
                    reject(err);
                }
            })
        };

        fetchData()
            .then((res) => {
                setError(null); // 捕获异常，设置错误状态
                setData(res); // 将获取到的数据设置到状态中
            })
            .catch((err) => {
                setError(err);
                setData([]); // 发生错误时，清空数据
            })
            .finally(() => {
                setLoading(false);
            });
    }, typeof dataSource === 'function' ? [params] : [dataSource]); // 当dataSource变化时，重新获取数据
    // 默认分页配置
    const defaultPagination = {};
    // 渲染组件
    return (
        <Spin spinning={loading} delay={500}> {/* 加载指示器，延迟500毫秒显示 */}
            <Table
                {...props}
                dataSource={data} // 将异步加载的数据传递给Table
                pagination={props.pagination || defaultPagination} // 合并分页配置
                locale={{
                    emptyText: !loading ? error ? error + '' : '暂无数据' : '正在加载'
                }}
            />
        </Spin>
    );
};

export default CommonTable;
