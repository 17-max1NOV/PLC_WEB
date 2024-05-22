const connection = require('../config/config');
const jwt = require('jsonwebtoken');
exports.getdataStatictical = (callback, time = false, startTime = null, endTime = null, title = null) => {
    let condition = '';
    let params = [];
    let groupBy = '';
    
    if (time && startTime && endTime) {
        condition = 'AND DATE(t2.date_time) BETWEEN ? AND ?';
        params.push(startTime, endTime);
    }
    
    if (title === "week") {
        groupBy = 'WEEK(t2.date_time)';
    } else if (title === "month") {
        groupBy = 'MONTH(t2.date_time)';
    } else {
        groupBy = 'DATE(t2.date_time)'; // Default group by date if title is neither "week" nor "month"
    }
    
    connection.query(
        `SELECT *
        FROM plc_data AS t1
        WHERE (DATE(t1.date_time), TIME(t1.date_time)) IN (
            SELECT DATE(t2.date_time), MAX(TIME(t2.date_time))
            FROM plc_data AS t2
            WHERE 1=1 ${condition}
            GROUP BY ${groupBy}
        );`,
        params,
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
                return callback(error, null);
            }
            return callback(null, results);
        }
    );
};

