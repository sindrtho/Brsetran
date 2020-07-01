import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';

Date.prototype.getFullDate = function() {
	return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
}

export default class Oppdrag extends Component {
	state = {
		oppdrag: {}
	}

	render() {
		return(
			<div className="oppdrag">
				{ this.state.oppdrag &&
				<div>
					<h3 className="assignmentheadline">{this.state.oppdrag.beskrivelse}</h3>
					{ this.state.oppdrag.dato && <h3>Dato: {this.printDate()}</h3> }
					{ this.state.oppdrag.utfort==0 && <input type="date" name="newdate" id="newdate" defaultValue={this.state.oppdrag.dato.substring(0,10)}/>}
					{ this.state.oppdrag.utfort==0 && <button className="btn btn-primary" onClick={() => { this.changeDate() }}>Endre dato</button> }
					{ this.state.oppdrag.pris && <h3>{this.state.oppdrag.pris} kr,-</h3> || <h3>Ingen pris satt</h3> }
					{ this.state.oppdrag.utfort==0 && <button className="btn btn-primary" onClick={() => { this.setPrice() }}>Sett pris</button> }
					<br/>
					<br/>
					{ this.state.oppdrag.utfort==1 && <h3>Fullført {this.printDate()}</h3> || <button className="btn btn-primary" onClick={() => {this.complete()}}>Fullfør oppdrag</button> }
				</div> ||
				<div><h3>Oppdrag eksisterer ikke eller du har ikke tilgang</h3></div>
				}
			</div>
		);
	}

	printDate() {
		var dateobjects = this.state.oppdrag.dato.substring(0, 10).split("-");
		return dateobjects[2]+"."+dateobjects[1]+"."+dateobjects[0];
	}

	printDateFromString(s) {
		var dateobjects = s.split("-");
		return dateobjects[2]+"."+dateobjects[1]+"."+dateobjects[0];
	}

	mounted() {
		oppdragService.getOne(this.props.match.params.id)
			.then(e => this.setState({oppdrag: e[0]}))
			.catch(err => console.log(err.toString()))
	}

	complete() {
		var id = this.props.match.params.id;

		if(confirm("Er du sikker på at du vil ferdigstille oppdraget? Dette kan ikke angres.")) {
			oppdragService.complete(id)
				.then(e => oppdragService.getOne(id)
					.then(f => this.setState({oppdrag: f[0]}))
					.catch(err => console.log(err)))
				.catch(err => console.log(err))
		}
	}

	changeDate(id, newDate) {
		var id = this.props.match.params.id;
		var datepicker = document.getElementById("newdate");
		var newDate = datepicker.value;

		if(confirm("Er du sikker på at du vil endre dato til: " + this.printDateFromString(newDate))) {
			oppdragService.changeDate(id, newDate)
				.then(e => oppdragService.getOne(id)
					.then(f => this.setState({oppdrag: f[0]}))
					.catch(err => console.log(err)))
				.catch(err => console.log(err))
		}
	}
	
	setPrice() {
		var id = this.props.match.params.id;
		var newPrice = window.prompt("Skriv inn pris.", "1000.00");
		while(newPrice < 0) {
			alert("Ny pris kan ikke være mindre enn 0.");
			newPrice = window.prompt("Skriv inn pris.", "1000.00");
		}
		
		oppdragService.changePrice(id, newPrice)
			.then(e => oppdragService.getOne(id)
				.then(f => this.setState({oppdrag: f[0]}))
				.catch(err => console.log(err)))
			.catch(err => {console.log(err); alert("Ugyldig pris. Vnnligst prøv igjen.")})
	}

	componentDidUpdate(prevProps, prevState) {

	}
}