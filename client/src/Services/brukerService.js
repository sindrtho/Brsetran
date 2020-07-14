import axios from 'axios';
//axios.interceptors.response.use(response => response.data);

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
	login(brukernavn, passord) {
		let data = {"brukernavn":brukernavn, "passord":passord};
		return axios.post('/login', data);
	}

	logout() {
		return axios.post('/logout');
	}

	getInfo() {
		return axios.get('/isadmin');
	}

	addInitialUser(fornavn, etternavn, brukernavn, hash) {
		let data = {"fornavn":fornavn, "etternavn":etternavn, "brukernavn":brukernavn, "passord":hash};
		return axios.post('/specialuser')
	}
}

export let brukerService = new BrukerService();