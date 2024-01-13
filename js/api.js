import axios from "axios";

export const loadReportsList = async (onSuccess) => {
    try {
        const response = await axios.get(laraReportCraftReportsListFetchRoute);

        console.log({ response });
        if (response.data.success) {
            onSuccess(response);
        } else {
            console.log(`reports names loading failed.`);
        }

    } catch (error) {
        // Handle errors
        console.error('Error:', error);
    }
};

export const generateReport = async (title, onSuccess) => {
    try {
        const response = await axios.post(laraReportCraftReportsGenerateRoute, { title });

        console.log({ response });
        if (response.data.success) {
            onSuccess(response);
        } else {
            console.log(`reports generation loading failed.`);
        }

    } catch (error) {
        // Handle errors
        console.error('Error:', error);
    }
};
