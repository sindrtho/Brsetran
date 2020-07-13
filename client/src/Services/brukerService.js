import axios from 'axios';
axios.interceptors.response.use(response => response.data);

function config() {
    let token = localStorage.getItem('authToken');
    let Authorization = 'none';
    if(token)
        Authorization = "Bearer " + token;
    return {
        headers: {
            Authorization
        }
    }
}

class BrukerService {
	login(username, password) {
		let data = {"username":username, "password":password};
		return axios.post('/login', data);
	}
}

export let brukerService = new BrukerService();