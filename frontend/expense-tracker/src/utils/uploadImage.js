import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();

    // apend image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-Type': 'multupart/form-data', // Set header for file upload
            },
        });
        return response.data; // return response data
    } catch (error) {
        console.log("Lỗi khi tải ảnh lên", error);
        throw error; // Rethrow error for handing
    }
};

export default uploadImage;