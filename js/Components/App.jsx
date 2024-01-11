import {Checkbox, App as AntdApp, Form, Button, Select, Table} from 'antd';
import { loadReportsList} from "../api";
import React, {useEffect, useState} from "react";

const App = () => {
    const { message, notification } = AntdApp.useApp();
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        loadReportsList((response) => {
            if (response.status === 200) {
                setReports(response.data.reports);
            }
        });
    }, []);

    const onChangeReport = (value) => {
        console.log({ value });
    }

    const generateReport = () => {

    }

    return (
        <div className="AppExport">
            <Form.Item
                colon={false}
                label={<div style={{ textAlign: 'left', width: '100px' }}> Report name </div>}
                name="reportName"
                rules={[{ required: true, message: 'Please select a report!' }]}
            >
                <Select
                    showSearch
                    placeholder="Select a report name"
                    onChange={onChangeReport}
                    options={reports}
                />
            </Form.Item>
            <Table columns={columns} dataSource={data} />
            <Button type="primary" onClick={() => generateReport()}>
                Generate report
            </Button>
        </div>
    );
}

export default App;
