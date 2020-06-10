import config from '../config.js';
import express from 'express';

import { create_app } from './server.js';

let app = create_app();

app.listen(4000);