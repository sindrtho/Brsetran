import axios from 'axios';
axios.interceptors.response.use(response => response.data);

export class Oppdrag {
	oppdrag_id;
	tittel;
	beskrivelse;
	pris;
	dato_mottatt;
	utfort;
	dato;
	rute;
	rute_navn;
}


class OppdragService {
	getOne(id) {
		return axios.get('/mission/byid/' + id);
	}

	getByDate(date) {
		return axios.get('/mission/bydate/' + date);
	}

	getRoutes() {
		return axios.get('/routes');
	}
}

export let oppdragService = new OppdragService();