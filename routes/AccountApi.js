import * as db from "../utils/DataBaseUtils";

import express from "express";
export const router = express.Router()

router.get('/account', (req, res) => {
    db.listAccounts().then(data => res.send(data));
});

router.post('/account', (req, res) => {
    db.createAccount(req.body).then(data => res.send(data));
});

router.delete('/account/:id', (req, res) => {
    db.deleteAccount(req.params.id).then(data => res.send(data));
});
