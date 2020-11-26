import React, {useState} from "react";
import { Modal } from 'antd';
import moment from "moment";
import ReactCalendar from 'react-calendar-operate';
import MonthSwitch from "../components/MonthSwitch";

const data = [
    {
        area: null,
        createdAt: 1605495345.398,
        endAt: 1605542399999,
        filterGroupId: null,
        id: 6653,
        industry: "ACCESSORY",
        isActive: true,
        isTemplate: false,
        name: "Demo",
        organization: null,
        plans: [{id: 6690, name: "驾驶舱测试-12", color: null, startAt: 1605927420219, endAt: 1605927420219}],
        remark: null,
        startAt: 1605456000000,
        type: "GUIDE_OPERATION",
        updatedAt: 1605496028.03
    }
];

const Demo = () => {
    const [monthDate, setMonthDate] = useState(moment());

    const handleMonthChange = (selectedDate) => {
        setMonthDate(selectedDate)
    };


    const handleChangeState = (params) => {
        console.log('修改状态', params)
    };

    const handleDelete = (params) => {
        Modal.confirm({
            title: `是否删除${params?.name}活动？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                console.log('执行删除', params)
            }
        });
    };

    const handleEdit = (params) => {
        console.log('跳转编辑界面', params)
    };

    return (
        <>
            <MonthSwitch defaultDate={monthDate} onChange={handleMonthChange} />
            <ReactCalendar
                date={monthDate}
                tasks={data}
                handleChangeState={handleChangeState}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </>
    )
};

export default Demo;