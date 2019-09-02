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
            const dates = TransactionChecker.getRemainingMonths(transaction.date);
            console.log(dates);
            if (dates.length === 1)
                return this.cloneTransactionOnce(transaction, dates[0]);
            else if (dates.length > 1)
                return this.cloneTransactionManyTimes(transaction, dates);
            else
                return Promise.resolve();
        });

        return Promise.all(createdTransactions);
    }

    cloneTransactionOnce(transaction, date) {
        const firstStep = this.transactionRemoveMonthly(transaction);
        const secondStep = this.createMonthlyTransaction(transaction, date);
        return Promise.all([firstStep, secondStep]);
    }

    transactionRemoveMonthly(transaction) {
        const transactionRaw = transaction.get({plain: true});
        transactionRaw.isMonthly = 0;
        return this.ORM.update(transactionRaw, transactionRaw.id);
    }

    createMonthlyTransaction(transaction, date) {
        const transactionRaw = transaction.get({plain: true});
        delete transactionRaw.id;
        transactionRaw.isMonthly = 1;
        transactionRaw.date = date;
        return this.ORM.create(transactionRaw);
    }

    createTransaction(transaction, date) {
        const transactionRaw = transaction.get({plain: true});
        delete transactionRaw.id;
        transactionRaw.isMonthly = 0;
        transactionRaw.date = date;
        return this.ORM.create(transactionRaw);
    }

    cloneTransactionManyTimes(transaction, dates) {
        const firstStep = this.transactionRemoveMonthly(transaction);
        const otherSteps = dates.map(async (date, index) => {
            if (index === dates.length - 1)
                return this.createMonthlyTransaction(transaction, date);
            else
                return this.createTransaction(transaction, date);
        });
        return Promise.all([firstStep, ...otherSteps]);
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