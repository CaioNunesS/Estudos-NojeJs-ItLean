import api from "./api.js"

export const getCurrencyCode = async(code) => {
    const response = await api.get(`/json/${code}`)

    return parseFloat(response.data[0].high);
};