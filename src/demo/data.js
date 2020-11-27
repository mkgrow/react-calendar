import moment from "moment";

const getData = () => {
    const data = [];
    for (let i = 1; i <= 6; i += 1) {
        data.push({
            id: i,
            name: `日程${i}`,
            status: 'processing',
            createdAt: moment().valueOf(),
            updatedAt: moment().valueOf(),
            isActive: true,
            startAt: moment().valueOf(),
            endAt: moment().add(i, 'day').valueOf()
        })
    }

    return data;
}

export default getData()