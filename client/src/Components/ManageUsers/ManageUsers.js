import * as React from 'react';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { brukerService } from '../../Services/brukerService.js'

export default class ManageUsers extends Component {
	state = {
		users: []
	}

	render () {
		return (
			<div className="container-fluid center-align" style={{width: "80%"}}>
				{
					this.state.users.map((e, i) => {
						return (
							<div key={i} style={{border: "solid black 1px", margin: "0px 0px 10px 0px"}}>
								<h4>{e.brukernavn}</h4>
								<p>{e.fornavn} {e.etternavn}</p>
								<button className="btn btn-danger" onClick={x => {this.delUser(e.bruker_id, e.admin==1)}}>Slett</button>
							</div>
						)
					})
				}
			</div>
		)
	}

	delUser(id, admin) {
		if(confirm("Er du HELT sikker på dette?")) {
			brukerService.deleteUser(id, admin)
				.then(res => brukerService.getAll()
					.then(r => this.setState({users: r}))
					.catch(err => console.log(err))
					)
				.catch(err => console.log(err))
		}
	}

	mounted() {
		brukerService.getAll()
			.then(res => this.setState({users: res}))
			.catch(err => console.log(err))
	}

	componentDidUpdate(prevProps, prevState) {

	}
}