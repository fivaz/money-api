const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

class TransactionChecker {

    constructor() {
        this.ORM = new Transaction();
    }

    async checkDaily() {
        await this.execCheck();
        const day = 24 * 60 * 60 * 1000;
        // const day = 60 * 1000;
        this.timer = setInterval(async () => await this.execCheck(), day);
    }

    checkNow() {
        clearInterval(this.timer);
        this.execCheck().then(() =>
            this.checkDaily());
    }

    async execCheck() {
        console.log("check executed");
        const transactions = await this.ORM.findMonthly();
        const createdTransactions = transactions.map(transaction => {
            //TODO check it later
            const dates = TransactionChecker.getRemainingMonths(transaction.date);
            console.log(dates);
            if (dates.length === 1)
                return this.cloneTransactionOnce(transaction, dates[0]);
            else {
                console.log("ELSE");
                return Promise.resolve(1);
            }
            // else if (dates.length > 2)
            //     return this.checkThenCloneTransaction(transactionRaw, dates);
        });

        return Promise.all(createdTransactions);
    }

    cloneTransactionOnce(transaction, date) {
        const firstStep = this.transactionRemoveMonthly(transaction);
        const secondStep = this.createTransaction(transaction, date);
        return Promise.all([firstStep, secondStep]);
    }

    transactionRemoveMonthly(transaction) {
        const transactionRaw = transaction.get({plain: true});
        transactionRaw.isMonthly = 0;
        return this.ORM.update(transactionRaw, transactionRaw.id);
    }

    createTransaction(transaction, date) {
        const transactionRaw = transaction.get({plain: true});
        delete transactionRaw.id;
        transactionRaw.isMonthly = 1;
        transactionRaw.date = date;
        return this.ORM.create(transactionRaw);
    }

    checkThenCloneTransaction(transaction, dates) {
        const createdTransactions = dates.map(async date => {
            const exist = await this.ORM.existIn(transaction, date);
            if (!exist)
                return this.cloneTransaction(transaction, date);
            else
                return Promise.resolve();
        });
        return Promise.all(createdTransactions);
    }

    cloneTransaction(transaction, date) {
        delete transaction.id;
        transaction.isMonthly = 0;
        transaction.date = date;
        return this.ORM.model.create(transaction);
    }

    static getRemainingMonths(date) {
        const transactionDate = moment(date);
        const today = moment();
        const nbOfMonths = today.diff(transactionDate, 'months');
        const dates = [];
        let i = 0;
        while (i < nbOfMonths) {
            transactionDate.add(1, 'months');
            dates.push(transactionDate.clone().toDate());
            i++;
        }
        return dates;
    }
}

const transactionChecker = new TransactionChecker();

module.exports = transactionChecker;