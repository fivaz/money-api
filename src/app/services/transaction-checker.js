const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

class TransactionChecker {

    checkDaily() {
        this.execCheck();
        const day = 24 * 60 * 60 * 1000;
        // const day = 5000;
        this.timer = setInterval(() => this.execCheck(), day);
    }

    async checkNow() {
        clearInterval(this.timer);
        this.execCheck();
        this.checkDaily();
    }

    async execCheck() {
        // console.log("check executed");
        const transactionORM = new Transaction();
        const transactions = await transactionORM.findMonthly();
        transactions.forEach(transaction => {
            const transactionRaw = transaction.get({plain: true});
            const dates = TransactionChecker.getMonthlyDates(transactionRaw.date);
            dates.forEach(async date => {
                const exist = await transactionORM.existIn(transactionRaw, date);
                if (!exist) {
                    delete transactionRaw.id;
                    transactionRaw.isMonthly = 0;
                    transactionRaw.date = date;
                    transactionORM.model.create(transactionRaw);
                }
            });
        });
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

module.exports = TransactionChecker;