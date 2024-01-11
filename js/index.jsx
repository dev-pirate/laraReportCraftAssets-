import React from 'react';
import { render } from "react-dom";
import { App as AntdApp } from 'antd';
import reportWebVitals from './reportWebVitals';
import App from "./Components/App";

render(
    <React.StrictMode>
        <AntdApp message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
            <AppExport />
        </AntdApp>
    </React.StrictMode>,
    document.getElementById('lara-excel-craft-export')
);


reportWebVitals();
