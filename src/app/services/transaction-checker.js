const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

class TransactionChecker {

    checkDaily() {
        this.execCheck().then(result => {
            console.log("aaa");
            console.log(result);
            // const day = 24 * 60 * 60 * 1000;
            // // const day = 60 * 1000;
            // this.timer = setInterval(() => this.execCheck(), day);
        });
    }

    checkNow() {
        clearInterval(this.timer);
        this.execCheck().then(() =>
            this.checkDaily());
    }

    async execCheck() {
        console.log("check executed");
        const transactionORM = new Transaction();
        const transactions = await transactionORM.findMonthly();

        return Promise.all(transactions.map(transaction => {
            const transactionRaw = transaction.get({plain: true});
            const dates = TransactionChecker.getMonthlyDates(transactionRaw.date);
            return Promise.all(dates.map(async date => {
                const exist = await transactionORM.existIn(transactionRaw, date);
                if (!exist) {
                    delete transactionRaw.id;
                    transactionRaw.isMonthly = 0;
                    transactionRaw.date = date;
                    return transactionORM.model.create(transactionRaw);
                } else {
                    return Promise.resolve(1);
                }
            }));
        }));
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