import axios from 'axios';
import { server } from '../helper';

export const playersService = {
  getPlayers() {
    return axios.get(`${server.baseURL}/api/players`);
  },
  addPlayer(player) {
    return axios.post(`${server.baseURL}/api/players`, player);
  }
};
