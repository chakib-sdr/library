
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from './db.js';

export const signin = (req, res) => {
    try {
        const token = jwt.sign(
            { name: req.user.name ,
              id: req.user.id
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "log in successfully",
            token
        });
    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const createacc = async (req, res) => {
    try {
        const { name, mdps } = req.body;

        const password = await bcrypt.hash(mdps, 10);

        await pool.query(
            'INSERT INTO info (name, password) VALUES ($1, $2)',
            [name, password]
        );

        return res.status(201).json({
            message: "user created"
        });
    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const searchbook = async (req,res)=>{
    try {
    const {book_name} = req.body;
    const result = await pool.query('SELECT * FROM books WHERE book_name = $1',[book_name]);
    if(result.rows.length == 0){
        return res.status(404).json({
            message : 'books not available'
        })
    }

        return res.status(200).json({
            message : "books found"
        })        
    } catch (error) {
        console.log("An error occured",error);
    }
}

export const addbook = async (req,res) => {
    try {
    const {book_name} = req.body
    const user_id = req.user.id;
    await pool.query('INSERT INTO mylist (user_id,book_name) VALUES ($1,$2)',[user_id,book_name]);
        return res.status(201).json({
            message: "Book Added"
        });      
    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });    
    }
}

export const removebook = async (req,res) => {
    try {
    const {book_name} = req.body
    const user_id = req.user.id
    await pool.query('DELETE FROM mylist WHERE user_id = $1 AND book_name = $2',[user_id,book_name]);
        return res.status(201).json({
            message: "Book Removed"
        });      
    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });    
    }
}
