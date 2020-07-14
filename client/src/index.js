import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Oppdrag from './Components/Oppdrag/Oppdrag.js';
import { OppdragListe, Sammendrag, OppdragUtenDatoListe } from './Components/OppdragListe/OppdragListe.js';
import { Ukeliste } from './Components/Ukeliste/Ukeliste.js';
import NavBar from './Components/NavBar/NavBar.js';
import Footer from './Components/Footer/Footer.js';
import NyttOppdrag from './Components/NyttOppdrag/NyttOppdrag.js';
import Kalender from './Components/Kalender/Kalender.js';
import Login from './Components/Login/Login.js';
import ManageUsers from './Components/ManageUsers/ManageUsers.js';
import NewUser from './Components/NewUser/NewUser.js';

const root = document.getElementById('root');
if(root) {
	var loggedin = false;
	if(localStorage.loggedin)
		loggedin = true;
	ReactDOM.render(
		<BrowserRouter>
			<div className="wrapper">
				<Route path='/' component={NavBar}/>
				<Route exact path='/' component={Kalender}/>
				<Route path='/oppdrag/:id' component={Oppdrag}/>
				<Route path='/ukeliste' component={Ukeliste}/>
				<Route path='/nyttoppdrag' component={NyttOppdrag}/>
				<Route path='/login' component={Login}/>
				<Route path='/registrer' component={NewUser}/>
				<Route path='/' component={Footer}/>
			</div>
		</BrowserRouter>,
		root
	);
}