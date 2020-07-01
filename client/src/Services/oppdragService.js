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

	complete(id) {
		return axios.put('/mission/done/' + id);
	}

	changeDate(id, newDate) {
		var params = {'date': newDate};
		console.log(params)

		return axios.put('/mission/changedate/' + id, params);
	}

	changePrice(id, newPrice) {
		var params = {price: newPrice};
		return axios.put('/mission/changeprice/' + id, params);
	}
}

export let oppdragService = new OppdragService();