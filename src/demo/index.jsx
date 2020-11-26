import React from "react";
import ReactCalendar from 'react-calendar';
import moment from "moment";


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
        name: "驾驶舱活动名称测试测试测试测试",
        organization: null,
        plans: [{id: 6690, name: "驾驶舱测试-12", color: null, startAt: 1605927420219, endAt: 1605927420219}],
        remark: null,
        startAt: 1605456000000,
        type: "GUIDE_OPERATION",
        updatedAt: 1605496028.03
    }
];

const Demo = () => {

    const handleChangeState = (params) => {
        console.log(params)
    }

    const handleDelete = (params) => {
        console.log(params)
    }

    const handleEdit = (params) => {
        console.log(params)
    }

    return (
        <ReactCalendar
            date={moment()}
            tasks={data}
            handleChangeState={handleChangeState}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
};

export default Demo;