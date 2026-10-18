import 'dotenv/config';
import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env.db_user,
  host: 'localhost',
  database: process.env.db_name,
  password: process.env.db_password,
  port: 5432,

});