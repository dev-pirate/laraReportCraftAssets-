import React from 'react';
import { render } from "react-dom";
import { App as AntdApp } from 'antd';
import reportWebVitals from './reportWebVitals';
import App from "./Components/App";

render(
    <React.StrictMode>
        <AntdApp message={{ maxCount: 1 }} notification={{ placement: 'bottomLeft' }}>
            <App />
        </AntdApp>
    </React.StrictMode>,
    document.getElementById('lara-report-craft-form')
);


reportWebVitals();
