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
            const transactionRaw = transaction.get({plain: true});
            const dates = TransactionChecker.getMonthlyDates(transactionRaw.date);
            return this.checkThenDuplicateTransaction(transactionRaw, dates);
        });

        return Promise.all(createdTransactions);
    }

    checkThenDuplicateTransaction(transaction, dates) {
        const createdTransactions = dates.map(async date => {
            const exist = await this.ORM.existIn(transaction, date);
            if (!exist)
                return this.duplicateTransaction(transaction, date);
            else
                return Promise.resolve();
        });
        return Promise.all(createdTransactions);
    }

    duplicateTransaction(transaction, date) {
        delete transaction.id;
        transaction.isMonthly = 0;
        transaction.date = date;
        return this.ORM.model.create(transaction);
    }

    static getMonthlyDates(date) {
        const transactionDate = moment(date);
        const today = moment();
        const nbOfMonths = today.diff(transactionDate, 'months');
        const dates = [];
        let i = 0;
        while (i <= nbOfMonths) {
            dates.push(transactionDate.clone().toDate());
            transactionDate.add(1, 'months');
            i++;
        }
        return dates;
    }
}

const transactionChecker = new TransactionChecker();

module.exports = transactionChecker;