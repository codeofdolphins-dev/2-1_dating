import axios from "axios";

const uploadImage = async (img) => {

    try {
        const cloudFormData = new FormData();
        cloudFormData.append("file", img);
        cloudFormData.append("upload_preset", "chat_media_upload");

        const cloudinaryRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dx23j3ldj/image/upload",
            cloudFormData
        );
        return await cloudinaryRes.data.secure_url;
        
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
}

export { uploadImage };