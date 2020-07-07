import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';

// Returns a string of the Date from date object.
Date.prototype.getFullDate = function() {
	var year = this.getFullYear();
	var month = this.getMonth()+1 < 10 ? '0'+(this.getMonth()+1) : this.getMonth()+1;
	var day = this.getDate() < 10 ? '0'+this.getDate() : this.getDate();

	return year+'-'+month+'-'+day;
}

export default class NyttOppdrag extends Component {
	state = {
		ruter: [],
		today: new Date().getFullDate()
	}

	render () {
		return (
			<div className="card">
			<div className="card-body">
				<h3 className="card-title">Nytt oppdrag</h3>
				<form action="/mission" method="POST" name="newassignmentform">
					<div className="form-group">
						<label htmlFor="tittel">Tittel:</label>
						<input type="text" className="form-control" name="tittel" id="tittel" maxLength="64" required/>
					</div>
					<div className="form-group">
						<label htmlFor="beskrivelse">Beskrivelse:</label>
						<textarea className="form-control" name="beskrivelse" id="beskrivelse" maxLength="512" required></textarea>
					</div>
					<div className="form-group">
						<label htmlFor="rute">Rute:</label>
						<select className="form-control" name="rute" id="rute">
							{
								this.state.ruter.map(e => {
									return (
										<option key={e.rute_id}>{e.rute_id} ({e.rute_navn})</option>
									)
								})
							}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="dato">Dato:</label>
						<input type="date" className="form-control" name="dato" id="dato" defaultValue={this.state.today} required></input>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
				</div>
			</div>
		)
	}

	mounted() {
		oppdragService.getRoutes()
			.then(e => this.setState({ruter:e}))
			.catch(err => console.log(err))
	}
}
