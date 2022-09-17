import axios from "../axios";

const uploadImage = async (image: File) => {
  const { data } = await axios.post<string>(
    "/images",
    { image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export { uploadImage };
