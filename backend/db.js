import 'dotenv/config';
import { response } from 'express';
import { Pool } from 'pg'

export const pool = new Pool({
  user: process.env.db_user,
  host: 'localhost',
  database: process.env.db_name,
  password: process.env.db_password,
  port: 5432,

});

const subjects = ["history","science","fiction","mystery","fantasy","biography","romance","thriller"];

const filldb = async () => {
  try {
    for (let i = 0; i < subjects.length; i++) {
      const response = await fetch(`https://openlibrary.org/subjects/${subjects[i]}.json?limit=10`);
      console.log(subjects[i], response.status);
      if (!response.ok) {
        continue;
      }
      const data = await response.json();

      console.log("Books received:", data.works.length);

      for (const book of data.works) {
        await pool.query('INSERT INTO books (book_name) VALUES ($1)',[book.title]);
      }
    }

    console.log('Books successfully inserted');
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

filldb();
