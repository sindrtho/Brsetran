import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { OppdragListe } from '../OppdragListe/OppdragListe.js';

import { oppdragService } from '../../Services/oppdragService.js'
import { Card } from '../../widgets.js';

export default class NavBar extends Component {
	render () {
		return(
			<div className="navbar">
			<NavLink to={'/nyttoppdrag'}>
				<button id="nyttoppdragknapp">Registrer Nytt Oppdrg</button>
			</NavLink>
			</div>
		)
	}
}