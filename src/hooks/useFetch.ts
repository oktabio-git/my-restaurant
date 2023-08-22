import axios from "axios";

const useFetch = () => {
    const url = "http://localhost:3000";
    const getApis = async (flag: string) => {
        try {
            const response = await axios.get(`${url}/${flag}`);
            return response.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    };
    const postApis = async (flag: string, body: Record<any, any>) => {
        try {
            const response = await axios.post(`${url}/${flag}`, body);
            return response.status;
        } catch (err) {
            console.log(err);
            return err;
        }
    };
    const updateApis = async (
        flag: string,
        id: string,
        body: Record<any, any>
    ) => {
        try {
            const response = await axios.put(`${url}/${flag}/${id}`, body);
            return response.status;
        } catch (err) {
            console.log(err);
            return err;
        }
    };
    return { getApis, postApis, updateApis };
};

export default useFetch;
