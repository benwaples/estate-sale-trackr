import { Pool } from 'pg'
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, PGSSLMODE } = process.env;

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const pool = new Pool({
	connectionString: URL,
	ssl: false
});

pool.on('connect', () => console.log('Postgres connected'));

export default pool