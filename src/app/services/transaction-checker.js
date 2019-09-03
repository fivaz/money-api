const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

class TransactionChecker {

    constructor() {
        this.ORM = new Transaction();
    }

    async checkDaily() {
        await this.execCheck();
        const day = 24 * 60 * 60 * 1000;
        // const day = 10 * 1000;
        this.timer = setInterval(async () => await this.execCheck(), day);
    }

    async checkNow() {
        clearInterval(this.timer);
        await this.execCheck();
        // noinspection JSIgnoredPromiseFromCall
        this.checkDaily();
    }

    async execCheck() {
        console.log("checking...");
        const transactions = await this.ORM.findMonthly();
        const createdTransactions = transactions.map(transaction => {
            const dates = TransactionChecker.getRemainingMonths(transaction.date);
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
        const firstStep = this.ORM.setNonMonthly(transaction);
        const secondStep = this.ORM.createMonthlyIn(transaction, date);
        return Promise.all([firstStep, secondStep]);
    }

    cloneTransactionManyTimes(transaction, dates) {
        const firstStep = this.ORM.setNonMonthly(transaction);
        const otherSteps = dates.map(async (date, index) => {
            if (index < dates.length - 1)
                return this.ORM.createIn(transaction, date);
            else
                return this.ORM.createMonthlyIn(transaction, date);
        });
        return Promise.all([firstStep, ...otherSteps]);
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