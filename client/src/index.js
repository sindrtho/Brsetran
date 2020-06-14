import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Test from './Components/Test/Test.js'

const root = document.getElementById('root');
if(root) {
	ReactDOM.render(
		<BrowserRouter>
			<div>
				<Route path='/oppdrag/:id' component={Test}/>
			</div>
		</BrowserRouter>,
		root
	);
}