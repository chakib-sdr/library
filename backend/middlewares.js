import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from './db.js';

export const checksignin = async (req, res, next) => {
    try {
        const { name, mdps} = req.body;
        const temp = await pool.query(
            'SELECT id,name, password FROM info WHERE name = $1',
            [name]
        );
        if (temp.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid password or username"
            });
        }
        const user = temp.rows[0];
        const isvalid = await bcrypt.compare(mdps,user.password);
        if (!isvalid) {
            return res.status(401).json({
                message: "Invalid password or username"
            });
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const verifytoken = (req,res,next) => {
    try {
    const {token} = req.body;
    jwt.verify(token,process.env.key);
    next()   
    } catch (error) {
     console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });       
    }

}

export const checkcreateacc = (req, res, next) => {
    try {
    const { name, mdps } = req.body;

    if (typeof name !== 'string' || name.trim() === '' || typeof mdps !== 'string' || mdps.length < 8) {
        return res.status(400).json({
            message: "Info not valid"
        });
    }
    next();        
    } catch (error) {
        console.log("An Error has occurred", error);
        return res.status(500).json({
            message: "Server error"
        });
    }

};
