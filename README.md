### 说明
基于antd组件库开发

### 预览

![日历](https://github.com/mkgrow/react-calendar/blob/master/view.gif?raw=true)

### 本地启动
```
git clone git@github.com:mkgrow/react-calendar.git
npm install
npm start

```

### 使用
```
 npm install react-calendar-operate
 
 import ReactCalendar from 'react-calendar-operate'
 
 <ReactCalendar
    date={monthDate}
    tasks={data}
    handleChangeState={handleChangeState}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
 />
 
 1、只显示当前日历可不传参数
 2、切换日历请参考demo
 3、不需要操作框时handleChangeState、handleDelete、handleEdit三个方法不用

```

### 参数说明
```
date: 日期，默认为当前月
tasks：任务列表
handleChangeState： 更新任务状态
handleDelete： 删除
handleEdit： 编辑
```

### Tasks字段
```
id: 1,
name: `test`,
status: 任务状态',
createdAt: 时间戳
updatedAt: 时间戳,
isActive: 激活状态,
startAt: 时间戳,
endAt: 时间戳
```

### More

```
可直接使用，也可以复制代码到项目中修改
```