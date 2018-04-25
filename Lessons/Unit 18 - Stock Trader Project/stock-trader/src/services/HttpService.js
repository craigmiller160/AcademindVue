import axios from 'axios';

class HttpService {

    constructor() {
        this.root ='https://vuejs-stock-trader-a5992.firebaseio.com/';
    }

    saveData(data) {
        return axios.put(`${this.root}/data.json`, data);
    }

    loadData() {

    }
}

export default new HttpService();
