import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Oppdrag from './Components/Oppdrag/Oppdrag.js';
import { OppdragListe, Sammendrag, OppdragUtenDatoListe } from './Components/OppdragListe/OppdragListe.js';
import { Ukeliste } from './Components/Ukeliste/Ukeliste.js';
import NavBar from './Components/NavBar/NavBar.js';
import Footer from './Components/Footer/Footer.js';
import NyttOppdrag from './Components/NyttOppdrag/NyttOppdrag.js';


const root = document.getElementById('root');
if(root) {
	ReactDOM.render(
		<BrowserRouter>
			<div className="wrapper">
				<Route path='/' component={NavBar}/>
				<Route path='/oppdrag/:id' component={Oppdrag}/>
				<Route path='/ukeliste' component={Ukeliste}/>
				<Route path='/nyttoppdrag' component={NyttOppdrag}/>
				<Route path='/' component={Footer}/>
			</div>
		</BrowserRouter>,
		root
	);
}