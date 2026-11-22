import express from "express";
import {signin , createacc,addbook,removebook,searchbook, mylist,disponible} from "./controllers.js";
import {checksignin, checkcreateacc,verifytoken} from "./middlewares.js";
export const route = express.Router();

route.post("/signin",checksignin,signin );
route.post("/createacc", checkcreateacc,createacc);
route.post("/addbook",verifytoken,addbook);
route.delete("/removebook",verifytoken,removebook);
route.get("/searchbook",searchbook);
route.get("/bookadded",verifytoken,mylist);
route.get("/disponible",verifytoken,disponible);