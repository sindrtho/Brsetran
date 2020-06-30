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

//ANeeds more functionality!

/*export default class NavBar extends Component {
	render () {
		return(
			<div className="navbar">
			<NavLink to={'/nyttoppdrag'}>
				<button className="btn-primary">Registrer Nytt Oppdrg</button>
			</NavLink>

			<NavLink to={'/ukeliste'}>
				<button className="btn-primary">Ukeliste</button>
			</NavLink>
			</div>
		)
	}
}*/


export default class NavBar extends Component {
	render () {
		return (
			<nav className="navbar navbar-inverse">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <a className="navbar-brand" href="/">Brødrene Sætran Arbeidskallender</a>
			    </div>
			    <ul className="nav navbar-nav">
			      <li><a href="/nyttoppdrag">Nytt Oppdrag</a></li>
			      <li><a href="/ukeliste">Ukeliste</a></li>
			    </ul>
			  </div>
			</nav>
		)
	}
}
