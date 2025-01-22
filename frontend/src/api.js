import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getEmailLayout = async () => {
    const response = await axios.get(`${BASE_URL}/api/getEmailLayout`);
    return response.data;
};

export const uploadEmailConfig = async (config) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/uploadEmailConfig`, config, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to upload email config:", error);
        throw error;
    }
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/api/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // Returns just the filename
};
