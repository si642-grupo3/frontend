import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const portfolioService ={
    getPortfolios: async () =>{
        try {
            const response = await axios.get(`${API_URL}/portfolios`);
            return response.data;
        } catch (e) {
            throw (e)
        }
    }
}