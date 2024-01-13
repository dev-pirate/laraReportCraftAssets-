import {Checkbox, App as AntdApp, Form, Button, Select, Table, Col, Row } from 'antd';
import {generateReport, loadReportsList} from "../api";
import React, {useEffect, useState} from "react";
import '../../sass/App.scss';

const App = () => {
    const { message, notification } = AntdApp.useApp();
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState('');
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
        // value is the title of the report
        setSelectedReport(value);
        generateReport(value, (response) => {
            const reportData = response.data;

            const columnsConfig = reportData.columns?.map((item, index) => ({
                title: item?.title,
                dataIndex: item?.field,
                key: index,
            }));
            setColumns(columnsConfig);
            setData(reportData.data?.map((item, index) => ({
                ...item,
                key: index
            })) ?? []);
        });
    }

    const printReport = () => {
        const reportTitle = selectedReport.replaceAll(' ', '_');
        const url = laraReportCraftReportsPrintingRoute.replace('__#REPORTNAME#__', reportTitle);

        const screenWidth = screen.width;
        const screenHeight = screen.height;

        // Open a new window with the specified URL and dimensions
        const newWindow = window.open(url, '_blank', 'width='+screenWidth+',height='+screenHeight);

        // Optionally, you can focus on the new window
        if (newWindow) {
            newWindow.addEventListener('afterprint', () => {
                newWindow.close();
            });
            newWindow.print();
        }
    }

    return (
        <div className="report-app-container">
            <Row>
                <Col sm={14} xs={24}>
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
                            value={selectedReport}
                            options={reports.map(item => ({
                                label: item,
                                value: item
                            }))}
                        />
                    </Form.Item>
                </Col>
                <Col sm={10} xs={24} className="buttons-container">
                    <div className="buttons-area">
                        <Button type="primary" onClick={() => printReport()}>
                            Print report
                        </Button>
                    </div>
                </Col>
            </Row>
            <Table columns={columns} dataSource={data} className="table-container" />
        </div>
    );
}

export default App;
