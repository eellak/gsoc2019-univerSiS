import express from 'express';
var moment = require('moment');

let router = express.Router();

/* GET all the params. 

 startDate
 period
 durationType
 dayLimit


 */
router.get('/generate', (req, res, next) => {

    let startDate = req.query.startDate;
    let period = req.query.period;
    let durationType = req.query.durationType; //Days , Weeks , Months
    let dayLimit = req.query.dayLimit; // 20 , 25 , 30
    let finalEndDate = "";

    console.log("start date : ", startDate);
    console.log("period : ", period);
    console.log("durationType : ", durationType);
    console.log("dayLimit : ", dayLimit);

    if (durationType == "Days") {
        console.log("Days");

        // 20 days system
        if (dayLimit == "20") {
            console.log("20 days");
            startDate = new Date(startDate.replace(/-/g, "/"));
            var endDate = "", noOfDaysToAdd = period, count = 0;
            while (count < noOfDaysToAdd - 1) {
                endDate = new Date(startDate.setDate(startDate.getDate() + 1));
                if (endDate.getDay() != 0 && endDate.getDay() != 6) {
                    count++;
                }
            }
            console.log("End Date formatted : ", moment(endDate).format('YYYY-MM-DD'));
            finalEndDate = moment(endDate).format('YYYY-MM-DD');
        }

        // 25 days system
        if (dayLimit == "25") {

            startDate = new Date(startDate.replace(/-/g, "/"));
            var endDate = "", noOfDaysToAdd = period, count = 0;
            while (count < noOfDaysToAdd - 1) {
                endDate = new Date(startDate.setDate(startDate.getDate() + 1));
                if (endDate.getDay() != 0) {
                    count++;
                }
            }
            console.log("End Date formatted : ", moment(endDate).format('YYYY-MM-DD'));
            finalEndDate = moment(endDate).format('YYYY-MM-DD');
        }

        // 30 days system
        if (dayLimit == "30") {

            startDate = new Date(startDate.replace(/-/g, "/"));
            var endDate = "", noOfDaysToAdd = period, count = 0;
            while (count < noOfDaysToAdd - 1) {
                endDate = new Date(startDate.setDate(startDate.getDate() + 1));
                if (true) {
                    count++;
                }
            }
            console.log("End Date formatted : ", moment(endDate).format('YYYY-MM-DD'));
            finalEndDate = moment(endDate).format('YYYY-MM-DD');
        }
    }

    // Weeks
    if (durationType == "Weeks") {
        console.log("Weeks");
        var updatedDate = moment(startDate, "YYYY-MM-DD").add('weeks', period - 1);

        var day = updatedDate.format('DD');
        var month = updatedDate.format('MM');
        var year = updatedDate.format('YYYY');
        var end_date = year + '-' + month + '-' + day;
        console.log("End date : ", end_date);
        finalEndDate = end_date;
    }

    // Months
    if (durationType == "Months") {
        console.log("Months");
        // if (loan_period == 1) {
        //     new_date = moment(startdate, "YYYY-MM-DD").add('months', loan_period);
        // } else {
        //     new_date = moment(startdate, "YYYY-MM-DD").add('months', loan_period);
        // }

        var updatedDateMonth = moment(startDate, "YYYY-MM-DD").add('months', period);

        var day = updatedDateMonth.format('DD');
        var month = updatedDateMonth.format('MM');
        var year = updatedDateMonth.format('YYYY');
        var end_date = year + '-' + month + '-' + day;
        console.log(end_date);
        finalEndDate = end_date;
    }

    // Start of the date list generation
    var testArray = [];
    var datesList = [];
    var duration = period;

    // Daily Option
    if (durationType == "Days") {

        if (dayLimit == 20) {

            var demo1 = moment().dateRangeToDates({
                rangeStart: startDate,
                rangeEnd: finalEndDate,
                weekdays: [1, 2, 3, 4, 5]
            });
            console.log("COUNT : ", demo1.length);
            
            demo1.forEach(function(value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });

        }
        if (dayLimit == 25) {

            var demo1 = moment().dateRangeToDates({
                rangeStart: startDate,
                rangeEnd: finalEndDate,
                weekdays: [1, 2, 3, 4, 5, 6]
            });
            console.log("COUNT : ", demo1.length);

            demo1.forEach(function(value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });
        }
        if (dayLimit == 30) {

            var demo1 = moment().dateRangeToDates({
                rangeStart: startDate,
                rangeEnd: finalEndDate,
                weekdays: [0, 1, 2, 3, 4, 5, 6]
            });
            console.log("COUNT : ", demo1.length);

            demo1.forEach(function(value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });
        }
    }

    res.json({
        'sesion': 'chanaka from Germany',
        'start': startDate,
        'end': finalEndDate,
        'today': moment().format('MMMM Do YYYY, h:mm:ss a'),
        'datesList' : datesList
    });
});

module.exports = router;
