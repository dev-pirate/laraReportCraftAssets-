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

        // Handle the response data as needed
        console.log('Response Data:', response.data);

    } catch (error) {
        // Handle errors
        console.error('Error:', error);
    }
};