const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

const dateFormat = 'YYYY-MM-DD';

class TransactionChecker {

    static async checkThenCreate() {
        const model = new Transaction();

        const transactions = await model.findMonthly();
        transactions.forEach(transaction => {
            const transactionRaw = transaction.get({plain: true});
            const dates = this.getTransactionDates(transactionRaw.date);
            dates.forEach(async date => {
                const rows = await model.findSame(transactionRaw, date);
                if (!rows.length) {
                    delete transactionRaw.id;
                    transactionRaw.isMonthly = 0;
                    transactionRaw.date = new Date(date);
                    model.model.create(transactionRaw);
                }
            });
        });
    }

    static getTransactionDates(date) {
        const transactionDate = moment(date, dateFormat);
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