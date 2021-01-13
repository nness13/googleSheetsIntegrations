import mongoose from "mongoose";

import config from '../etc/config.json';

import '../models/Account';

const Account = mongoose.model('Account');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        { useNewUrlParser: true,  useUnifiedTopology: true } );
}

export function listAccounts(id) {
    return Account.find();
}

export function createAccount(data) {
    const account = new Account({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return account.save();
}

export function deleteAccount(id) {
    return Account.findById(id).remove();
}