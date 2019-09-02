const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

const dateFormat = 'YYYY-MM-DD';

class TransactionChecker {

    static async checkThenCreate() {
        const transactionORM = new Transaction();
        const transactions = await transactionORM.findMonthly();
        transactions.forEach(transaction => {
            const transactionRaw = transaction.get({plain: true});
            const dates = this.getMonthlyDates(transactionRaw.date);
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