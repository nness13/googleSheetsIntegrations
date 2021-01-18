import * as db from "../utils/DataBaseUtils";
const path = require("path")
import express from "express";
import {auth, gsWrite} from "../utils/SheetsUtil";
export const router = express.Router()


router.get('/', (req, res) => {
    res.sendFile(path.resolve("public/index.html"), { title: 'Hey', message: 'Hello there!'});
});

router.post('/send', (req, res) => {
    console.log(req.body)
    const data = [
        req.body['first_name'],
        req.body['last_name'],
        req.body['email'],
        ""+req.body['phone_phoneCode']+req.body['phone']
    ]
    auth([ data ])

    res.send("send");
});




router.get('/account', (req, res) => {
    db.listAccounts().then(data => res.send(data));
});

router.post('/account', (req, res) => {
    db.createAccount(req.body).then(data => res.send(data));
});

router.delete('/account/:id', (req, res) => {
    db.deleteAccount(req.params.id).then(data => res.send(data));
});
