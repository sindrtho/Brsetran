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
	return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
}

// List of all assignments for the day.
export class OppdragListe extends Component {
	date = {};
	dateString = "";
	oppdrag = [];

	render () {
		return (
			<div className="dagsliste">
			<p>Dato: {this.dateString}</p>
				{
					this.oppdrag.map(e => {
						return (
							<Sammendrag key={e.oppdrag_id} tittel={e.tittel} missionid={e.oppdrag_id} dato={e.dato} utfort={e.utfort} ruteid={e.rute_id} rutenavn={e.rute_navn}/>
						)
					})
				}
			</div>
		)
	}

	mounted() {
		if(this.props.date)
			this.date = this.props.date;
		else
			this.date = new Date();
		this.dateString = this.date.getFullDate()
		oppdragService.getByDate(this.dateString)
			.then(e => this.oppdrag = e)
			.catch(err => console.log(err))
	}
}

// Short summary of task and customer.
export class Sammendrag extends Component {
	render () {
		return (
		<NavLink to={'/oppdrag/'+this.props.missionid}>
			<div className="sammendrag">
				<Card title={this.props.tittel} c={this.props.utfort==1 ? "white" : "lightBlue"}>
					<div className="content">
						<h4>Rute {this.props.ruteid}</h4>
						<h4>{this.props.rutenavn}</h4>
					</div>
				</Card>
			</div>
		</NavLink>
		)
	}
}