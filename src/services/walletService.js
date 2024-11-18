import axios from 'axios';

const API_URL = 'http://localhost:3000/wallets';

export const walletService ={
    getWallets: async () =>{
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (e) {
            throw (e)
        }
    },

    getWalletById: async (id) =>{
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (e) {
            throw (e)
        }
    }
}