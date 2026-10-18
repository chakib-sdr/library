import express from "express";
import {signin , createacc,addbook,removebook} from "./controllers.js";
import {checksignin, checkcreateacc,verifytoken} from "./middlewares.js";

export const route = express.Router();

route.post("/signin",checksignin,signin );
route.post("/createacc", checkcreateacc,createacc);
route.post("/addbook",verifytoken,addbook);
route.DELETE("/removebook",verifytoken,removebook);