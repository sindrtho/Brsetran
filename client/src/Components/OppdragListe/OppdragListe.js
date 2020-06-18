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
	return this.getFullYear()+':'+(this.getMonth()+1)+':'+this.getDate();
}

export class OppdragListe extends Component {
	date = {};
	dateString = "";
	oppdrag = [];

	render () {
		return (
			<div className="dagsliste">
				{
					this.oppdrag.map(e => {
						return (
							<Sammendrag key={e.oppdrag_id} missionid={e.oppdrag_id} dato={e.dato} beskrivelse={e.beskrivelse} utfort={e.utfort} fra={e.fra} til={e.til} kunde={e.kunde_navn} sjafor={e.sjafor_id ? e.sjafor_fornavn + " " + e.sjafor_etternavn : null}/>
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

export class Sammendrag extends Component {
	render () {
		return (
		<NavLink to={'/oppdrag/'+this.props.missionid}>
			<div className="sammendrag">
				<Card title={this.props.beskrivelse} c={this.props.utfort==1 ? "white" : "lightBlue"}>
					<div className="content">
						<p>Fra: {this.props.fra}</p>
						<p>Til: {this.props.til}</p>
						<p>Kunde: {this.props.kunde}</p>
						{this.props.dato && <p>Dato: {this.props.dato.substring(0, 10)}</p>}
						{this.props.sjafor && <p>Sjåfør: {this.props.sjafor}</p>}
					</div>
				</Card>
			</div>
		</NavLink>
		)
	}
}

export class OppdragUtenDatoListe extends Component {
	oppdrag = [];

	render () {
		return (
			<div>
			{
				this.oppdrag.map(e => {
					return (
						<Sammendrag key={e.oppdrag_id} missionid={e.oppdrag_id} beskrivelse={e.beskrivelse} utfort={e.utfort} fra={e.fra} til={e.til} kunde={e.kunde_navn} sjafor={e.sjafor_id ? e.sjafor_fornavn + " " + e.sjafor_etternavn : null}/>
					)
				})
			}
			</div>
		)
	}

	mounted () {
		oppdragService.getNoDate()
			.then(e => this.oppdrag = e)
			.catch(err => console.log(err))
	}
}