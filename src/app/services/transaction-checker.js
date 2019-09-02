const Transaction = require('../infra/proxies/TransactionProxy');
const moment = require("moment");

const dateFormat = 'YYYY-MM-DD';

class TransactionChecker {

    static async check() {
        const model = new Transaction();
        //TODO use async wait

        // const date = moment('2019-01-10 00:00:00', dateFormat);
        // // console.log(date.toDate());
        // transaction.findFromDate(date.toDate())
        //     .then(transactions => {
        //         console.log(transaction.length);
        //         console.log(transactions[0].get({plain: true}));
        //         // if (transaction) {
        //         //     console.log(transaction);
        //         // } else {
        //         //     console.log("transaction doest exist in " + dateString);
        //         // }
        //     });

        const transactions = await model.findMonthly();
        transactions.forEach(transaction => {
            const dates = this.getTransactionDates(transaction.date);
            dates.forEach(async date => {
                transaction.date = date.toDate();
                const result = await model.findSame(transaction);
                // console.log(date.format(dateFormat));
                if (result.length) {
                    console.log("exist");
                    // console.log(result[0].get({plain: true}));
                }
                // else
                //     console.log("doest exist");
            });
        });

        // const transactions = await model.findMonthly();
        // .then(transactions => {
        //     // console.log(transactions.length);
        //     transactions.forEach(transaction => {
        //         const dates = this.getTransactionDates(transaction.date);
        //         dates.forEach(date => {
        //             model.findFromDate(date.toDate()).then(transaction => {
        //                 console.log(transaction.length);
        //                 // console.log(transactions[0].get({plain: true}));
        //                 // if (transaction) {
        //                 //     console.log(transaction);
        //                 // } else {
        //                 //     console.log("transaction doest exist in " + dateString);
        //                 // }
        //             });
        //         });
        //     });
        // });
    }

    static getTransactionDates(date) {
        const transactionDate = moment(date, dateFormat);
        const today = moment();
        const nbOfMonths = today.diff(transactionDate, 'months');
        const dates = [];
        let i = 0;
        while (i <= nbOfMonths) {
            dates.push(transactionDate.clone());
            transactionDate.add(1, 'months');
            i++;
        }
        return dates;
    }
}

module.exports = TransactionChecker;