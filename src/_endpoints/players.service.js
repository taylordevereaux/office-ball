import Vue from 'vue';
import axios from 'axios';

import { server } from '../helper';

export const playersService = {
  async execute(method, resource, data, config) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();
    return axios.create({
      ...config,
      baseURL: `${server.baseURL}/api/players`,
      json: true,
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    // .then(req => req.data);
  },
  getPlayers() {
    return this.execute('get', '/');
  },
  addPlayer(player) {
    return this.execute('post', '/', player);
  },
  incrementPlayerShots(playerId, shots) {
    return this.execute('put', `/${playerId}/setshots`, null, {
      params: {
        shots: shots
      }
    });
  },
  getTags() {
    return this.execute('get', '/tags');
  }
};
