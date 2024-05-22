const moment = require('moment');
const statisticalModel = require('../model/statistical');
const planModel = require('../model/planModel');

exports.getdataValue = (req, res) => {
    try {
        let valueTime = req.body.value ? req.body.value : "7day";

        let startTime, endTime;
        let arrTime = [];
        let arrsp1 = [];
        let arrsp2 = [];
        let arrsp3 = [];
        let arrTong = [];

        if (valueTime === "7day") {
            endTime = moment().subtract(1, 'days').endOf('day'); // kết thúc 23:59:59 hôm qua
            startTime = moment().subtract(8, 'days').startOf('day');
            arrTime = generateDateRange(startTime, endTime);
        } else if (valueTime === "weeknow") {
            // Xử lý tuần hiện tại
        } else if (valueTime === "lastweek") {
            // Xử lý tuần trước
        } else if (valueTime === "7week") {
            // Xử lý 7 tuần gần đây
        } else if (valueTime === "6month") {
            // Xử lý 6 tháng gần đây
        }

        statisticalModel.getdataStatictical((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
        
            const dataByDate = {};
            results.forEach(result => {
                const date = moment(result.date_time).startOf('day').format('YYYY-MM-DD');
                dataByDate[date] = result;
            });
            arrTime.forEach(date => {
                const formattedDate = date.format('YYYY-MM-DD');
                const result = dataByDate[formattedDate];
                if (result ) {
                    arrsp1.push(result.sanpham1);
                    arrsp2.push(result.sanpham2);
                    arrsp3.push(result.sanpham3);
                    arrTong.push(result.tongphoidauvao);
                } else {
                    arrsp1.push(0);
                    arrsp2.push(0);
                    arrsp3.push(0);
                    arrTong.push(0);
                }
            });
        
            const result = {
                arrTime: arrTime.map(date => date.format('DD/MM')),
                arrsp1: arrsp1,
                arrsp2: arrsp2,
                arrsp3: arrsp3,
                arrTong: arrTong,
            };
         
            return res.json({
                status: "success",
                result: result
            });
        
        },true, startTime.format('YYYY-MM-DD HH:mm:ss'), endTime.format('YYYY-MM-DD HH:mm:ss'));
        
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}

exports.getdataPercent = (req, res) => {
    try {
        // let startTime, endTime;
        let arrsp1 = 0;
        let arrsp2 = 0;
        let arrsp3 = 0;

        // if (valueTime === "7day") {
        //     endTime = moment().subtract(1, 'days').endOf('day'); // kết thúc 23:59:59 hôm qua
        //     startTime = moment().subtract(8, 'days').startOf('day');
        // } else if (valueTime === "weeknow") {
        //     // Xử lý tuần hiện tại
        // } else if (valueTime === "lastweek") {
        //     // Xử lý tuần trước
        // } else if (valueTime === "7week") {
        //     // Xử lý 7 tuần gần đây
        // } else if (valueTime === "6month") {
        //     // Xử lý 6 tháng gần đây
        // }

        statisticalModel.getdataStatictical((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            results.forEach(item => {
                arrsp1 += item.sanpham1;
                arrsp2 += item.sanpham2;
                arrsp3 += item.sanpham3;
            });
            return res.json({
                status: "success",
                result: [arrsp1,arrsp2,arrsp3]
            });
        
        });
        
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}
exports.getdataTotal = (req, res) => {
    try {
        // let startTime, endTime;
         let arr=[];
        // if (valueTime === "7day") {
        //     endTime = moment().subtract(1, 'days').endOf('day'); // kết thúc 23:59:59 hôm qua
        //     startTime = moment().subtract(8, 'days').startOf('day');
        // } else if (valueTime === "weeknow") {
        //     // Xử lý tuần hiện tại
        // } else if (valueTime === "lastweek") {
        //     // Xử lý tuần trước
        // } else if (valueTime === "7week") {
        //     // Xử lý 7 tuần gần đây
        // } else if (valueTime === "6month") {
        //     // Xử lý 6 tháng gần đây
        // }

        statisticalModel.getdataStatictical((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            results.forEach(item => {
                arr.push(item.tongphoidauvao)
            });
            return res.json({
                status: "success",
                result: arr
            });
        
        });
        
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}

exports.getPlanReality = (req , res) =>{
    try {
        let startTime, endTime;
         let arr=[];
         let arrPlan =[];
         let arrReality=[];
         let valueTime = req.body.value ? req.body.value : "7day";
         let titel = req.body.titel ? req.body.titel : "day";
         let arrTime = [];
        if (valueTime === "7day") {
            endTime = moment().subtract(1, 'days').endOf('day'); 
            startTime = moment().subtract(8, 'days').startOf('day');
            arrTime = generateDateRange(startTime, endTime);
        } else if (valueTime === "weeknow") {
            endTime = moment().endOf('week');
            startTime = moment().startOf('week');
            arrTime = generateDateRange(startTime, endTime);
        } else if (valueTime === "lastweek") {
            endTime = moment().subtract(1, 'week').endOf('week');
            startTime = moment().subtract(1, 'week').startOf('week');
            arrTime = generateDateRange(startTime, endTime);
        } else if (valueTime === "7week") {
            endTime = moment().endOf('week');
            startTime = moment().subtract(7, 'weeks').startOf('week');
            arrTime = generateDateRangeWeekly(startTime, endTime);
            titel='week'
        } else if (valueTime === "6month") {
            endTime = moment().endOf('month');
            startTime = moment().subtract(5, 'months').startOf('month');
            arrTime = generateDateRangeMonthly(startTime, endTime);
            titel='month'
        }
        statisticalModel.getdataStatictical((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            const dataByDate = {};
            results.forEach(result => {
                const date = moment(result.date_time).startOf('day').format('YYYY-MM-DD');
                dataByDate[date] = result;
            });
            arrTime.forEach(date => {
                const formattedDate = date.format('YYYY-MM-DD');
                const result = dataByDate[formattedDate];
                if (result ) {
                    arrReality.push(Number(result.sanpham1+result.sanpham2+result.sanpham3));
                } else {
                    arrReality.push(0);
                }
            });
           planModel.getdataStatictical((error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Database query error' });
                }
                console.log(results)
                const dataByDate = {};
                results.forEach(result => {
                    console.log(result)
                    const date = moment(result.creata_at).startOf('day').format('YYYY-MM-DD');
                    dataByDate[date] = result;
                });
                arrTime.forEach(date => {
                    const formattedDate = date.format('YYYY-MM-DD');
                    const result = dataByDate[formattedDate];
                    if (result ) {
                        arrPlan.push(Number(result.quantity_sp1 +result.quantity_sp2 +result.quantity_sp3 ));
                    } else {
                        arrPlan.push(0);
                    }
                });
            
                const result = {
                    arrTime: arrTime.map(date => date.format('DD/MM')),
                    arrReality: arrReality,
                    arrPlan:arrPlan
                };
                return res.json({
                    status: "success",
                    result: result
                });
            },true, startTime.format('YYYY-MM-DD HH:mm:ss'), endTime.format('YYYY-MM-DD HH:mm:ss'));
        },true, startTime.format('YYYY-MM-DD HH:mm:ss'), endTime.format('YYYY-MM-DD HH:mm:ss'),titel);
        
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}

function generateDateRange(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate, 'day')) {
        dates.push(currentDate.clone());
        currentDate.add(1, 'day');
    }
    return dates;
}
function generateDateRangeWeekly(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate, 'week')) {
        dates.push(currentDate.clone());
        currentDate.add(1, 'week');
    }
    return dates;
}
function generateDateRangeMonthly(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate, 'month')) {
        dates.push(currentDate.clone());
        currentDate.add(1, 'month');
    }
    return dates;
}

