import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default class NewUser extends Component {

	constructor(props) {
		super(props);
		this.passord = '';
	}

	render () {
		return (
			<div className="container">
				<br/>
				<div className="container-fluid center-align" style={{"width":"80%"}}>
					<form action="/newUser" method="POST" name="newuserform">
						<div className="form-group">
							<label htmlFor="brukernavn">Brukernavn:</label>
							<input type="text" className="form-control" name="brukernavn" id="brukernavn" maxLength="32" required/>
						</div>
						<div className="form-group">
							<label htmlFor="beskrivelse">Fornavn:</label>
							<input type="text" className="form-control" name="fornavn" id="fornavn" maxLength="32" required/>
							<label htmlFor="beskrivelse">Etternavn:</label>
							<input type="text" className="form-control" name="etternavn" id="etternvan" maxLength="32" required/>
						</div>
						<div className="form-group">
							<label htmlFor="passord">Passord:</label>
							<input type="password" className="form-control" name="passord" minLength="6" id="passord" onChange={e => {this.passord = e.target.value}} required/>
						</div>
						<div className="form-group">
							<label htmlFor="nyadmin">Admin</label>
							<input type="checkbox" name="nyadmin" id="something"/>
						</div>
						<button type="submit" className="btn btn-primary">Lagre</button>
					</form>
				</div>
			</div>
		)
	}
}