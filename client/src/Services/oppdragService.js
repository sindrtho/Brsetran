import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class Oppdrag {
	oppdrag_id;
	beskrivelse;
	pris;
	dato_mottatt;
	sjafor_id;
	fra;
	til;
	prisfaktor;
	dato_mottatt;
	utfort;
}


class OppdragService {
	getOne(id) {
		return axios.get('/mission/byid/' + id);
	}

	getByDate(date) {
		return axios.get('/mission/bydate/' + date);
	}

	getNoDate() {
		return axios.get('/mission/nodate');
	}
}

export let oppdragService = new OppdragService();