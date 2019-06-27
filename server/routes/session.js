import express from 'express';
var moment = require('moment');
require('moment-weekday-calc');

let router = express.Router();

/* GET all the params. 

 startDate
 period
 durationType
 dayLimit


 */
router.get('/generate', (req, res, next) => {

    let startDate = req.query.startDate;
    let finalStartDate = req.query.startDate; // This variable is used to generate dates list.
    let period = req.query.period; // How many dates or weeks or months
    let durationType = req.query.durationType; //Days , Weeks , Months
    let dayLimit = req.query.dayLimit; // 20 = without weekened , 25 = weekdays + Saturday , 30 = Weekdays + Saturday + Sunday
    let finalEndDate = ""; // auto generated value from below functions.

    console.log("start date : ", startDate);
    console.log("period : ", period);
    console.log("durationType : ", durationType);
    console.log("dayLimit : ", dayLimit);

    // Final date ( End Date ) generation for Days
    if (durationType == "Days") {
        console.log("Days");

        // 20 days system ( without weekend )
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

        // 25 days system ( Weekdays + Saturday )
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

        // 30 days system ( Weekdays + Saturday + Sunday)
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

    // Final date ( End Date ) generation for Weeks
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

    // Final date ( End Date ) generation for Months
    if (durationType == "Months") {
        console.log("Months");

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

    // Daily Option, Calculate dates list with start date and end date.
    if (durationType == "Days") {

        if (dayLimit == 20) {
            console.log("*******")
            console.log(finalStartDate)
            console.log(finalEndDate)
            console.log("*******")
            var demo1 = moment().dateRangeToDates({
                rangeStart: finalStartDate,
                rangeEnd: finalEndDate,
                weekdays: [1, 2, 3, 4, 5]
            });
            console.log("COUNT : ", demo1.length);

            demo1.forEach(function (value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });

        }
        if (dayLimit == 25) {

            var demo1 = moment().dateRangeToDates({
                rangeStart: finalStartDate,
                rangeEnd: finalEndDate,
                weekdays: [1, 2, 3, 4, 5, 6]
            });
            console.log("COUNT : ", demo1.length);

            demo1.forEach(function (value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });
        }
        if (dayLimit == 30) {

            var demo1 = moment().dateRangeToDates({
                rangeStart: finalStartDate,
                rangeEnd: finalEndDate,
                weekdays: [0, 1, 2, 3, 4, 5, 6]
            });
            console.log("COUNT : ", demo1.length);

            demo1.forEach(function (value) {
                console.log(moment(value).format('YYYY-MM-DD'));
                datesList.push(moment(value).format('YYYY-MM-DD'));
            });
        }
    }

    // Weekly Option, Calculate dates list with start date and end date.
    if (durationType == "Weeks") {
        console.log("WEEKLY");
        const start = moment(finalStartDate).startOf('day');
        const end = moment(finalEndDate).startOf('day');
        let current = start;
        const holidayList = [] // Need to add all the holidays here.
        while (current.isSameOrBefore(end)) {
            let nextWeek = moment(current).add(7, 'days');
            //check if holidays are between nextWeek and current
            //get number of holidays
            const number_of_holidays = holidayList.reduce((p, c) => {
                if (moment(c).isAfter(current) && moment(c).isSameOrBefore(nextWeek)) {
                    return p + 1;
                }
                return p;
            }, 0)
            nextWeek = nextWeek.add(number_of_holidays, 'days')
            // console.log(nextWeek.toDate()+"--");
            console.log(moment(nextWeek.toDate()).format('YYYY-MM-DD'));
            datesList.push(moment(nextWeek.toDate()).format('YYYY-MM-DD'));
            current = nextWeek;
        }

        datesList.pop();
        datesList.unshift(finalStartDate);
        console.log(datesList);

    }

    // Monthly Option, Calculate dates list with start date and end date.
    if (durationType == "Months") {

        testArray = dateOffsetByMonths(parseInt(duration), finalStartDate.toString(), 'YYYY-MM-DD');
        testArray.pop();
        datesList = testArray;

    }

    // This function is used to get all the list of given months according to the start , end dates.
    function dateOffsetByMonths(months, dateStr, format) {
        var startDate = moment(dateStr, format);
        return Array.from(Array(months + 1).keys()).reduce(function (res, n, i) {
            var date = startDate.clone();
            date.add(i, 'months');
            res.push(date.format('YYYY-MM-DD'));
            return res;
        }, []);
    };

    res.json({
        'start': startDate,
        'end': finalEndDate,
        'today': moment().format('MMMM Do YYYY, h:mm:ss a'),
        'datesList': datesList
    });
});

module.exports = router;
