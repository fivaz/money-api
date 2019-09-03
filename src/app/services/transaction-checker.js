const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

class TransactionChecker {

    constructor() {
        this.ORM = new Transaction();
    }

    async start() {
        await this.execCheck();
        await this.checkTomorrow();
        this.checkDaily();
    }

    checkTomorrow() {
        const tomorrow = moment()
            .add(1, 'days')
            .startOf('day');
        const now = moment();
        const timeRemaining = tomorrow.diff(now);
        // const timeRemaining = 5000;
        return new Promise(resolve =>
            setTimeout(() =>
                resolve(this.execCheck()), timeRemaining));
    }

    checkDaily() {
        const day = 24 * 60 * 60 * 1000;
        // const day = 5 * 1000;
        setInterval(() => this.execCheck(), day);
    }

    //TODO check for Sequelize->bulkCreate
    async execCheck() {
        const transactions = await this.ORM.findMonthly();
        const createdTransactions = transactions.map(transaction => {
            const dates = this.ORM.getRemainingMonths(transaction.date);
            if (dates.length) {
                const transactionRaw = transaction.get({plain: true});
                if (dates.length === 1)
                    return this.ORM.updateAndCloneOnce(transactionRaw, transactionRaw.id, dates[0]);
                else if (dates.length > 1)
                    return this.ORM.updateAndCloneManyTimes(transactionRaw, transactionRaw.id, dates);
            }
        });
        return Promise.all(createdTransactions);
    }
}

const transactionChecker = new TransactionChecker();

module.exports = transactionChecker;