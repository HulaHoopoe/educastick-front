import axios from "axios";

export const MainService = {
    async getInfo() {
        const response = await axios.get('http://localhost:3000/info')

        return response.data
    },
}