import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';

export default class Oppdrag extends Component {
	oppdrag = {};
	date = new Date();

	render() {
		return(
			<div className="oppdrag">
				{ this.oppdrag &&
				<Card title={this.oppdrag.beskrivelse}>
				<div>
					<h3>Kunde: {this.oppdrag.kunde_navn}</h3>
					<h3>Kjøres fra: {this.oppdrag.fra}</h3>
					<h3>Kjøres til: {this.oppdrag.til}</h3>
					{ this.oppdrag.dato && <h3>Dato: {this.oppdrag.dato.substring(0, 10)}</h3>}
					{ this.oppdrag.utfort==1 && <h3>Fullført</h3>}
				</div>
				</Card> ||
				<div><h3>Oppdrag eksisterer ikke eller du har ikke tilgang</h3></div>
				}
			</div>
		);
	}

	mounted() {
		oppdragService.getOne(this.props.match.params.id)
			.then(e => this.oppdrag = e[0])
			.catch(err => console.log(err.toString()))
	}
}