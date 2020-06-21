import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Oppdrag from './Components/Oppdrag/Oppdrag.js';
import { OppdragListe, Sammendrag, OppdragUtenDatoListe } from './Components/OppdragListe/OppdragListe.js';
import { Ukeliste } from './Components/Ukeliste/Ukeliste.js';

const root = document.getElementById('root');
if(root) {
	ReactDOM.render(
		<BrowserRouter>
			<div>
				<Route path='/oppdrag/:id' component={Oppdrag}/>
				<Route path='/ukeliste' component={Ukeliste}/>
			</div>
		</BrowserRouter>,
		root
	);
}