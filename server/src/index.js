import config from '../config.js';
import express from 'express';
import mysql from 'mysql2';

import { create_app } from './server.js';

const pool = mysql.createPool(config.mysql);

const app = create_app(pool);

app.listen(4000);