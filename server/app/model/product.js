const connection = require('../config/config');
const jwt = require('jsonwebtoken');

exports.getdataStatictical = (callback, time = false, startTime=null, endTime=null) => {
    let condition = '';
    let params = [startTime, endTime];
    if (time) {
        condition = 'AND DATE(t2.date_time) BETWEEN ? AND ?';
        params.push(startTime, endTime);
    }
    connection.query(
        `SELECT *
        FROM plc_data AS t1
        WHERE (DATE(t1.date_time), TIME(t1.date_time)) IN (
            SELECT DATE(t2.date_time), MAX(TIME(t2.date_time))
            FROM plc_data AS t2
            WHERE 1=1 ${condition}
            GROUP BY DATE(t2.date_time)
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

exports.getList = (callback, page = 1, limit = 10, search = null, startFilter = null ,endilter =null) => {
    const offset = (page - 1) * limit;
    let query = `SELECT *
        FROM plc_data AS t1
        WHERE (DATE(t1.date_time), TIME(t1.date_time)) IN (
            SELECT DATE(t2.date_time), MAX(TIME(t2.date_time))
            FROM plc_data AS t2
            GROUP BY DATE(t2.date_time)
        )`; // Sub-select to get latest records per day

    const queryParams = [];
    if (search && search !== null && search.length > 0) {
        query += ' AND DATE(t1.date_time) LIKE ?';
        queryParams.push(`%${search}%`);
    }
    if (startFilter && startFilter !== null && startFilter.length > 0 && endilter && endilter !== null && endilter.length > 0) {
        query += ' AND t1.date_time BETWEEN ? AND ?';
        queryParams.push(startFilter, endilter);
    }
    query += ' ORDER BY t1.date_time DESC';
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};
exports.getLatestRecord = (callback) => {
    const query = `
        SELECT *
        FROM plc_data
        ORDER BY date_time DESC
        LIMIT 1
    `;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results[0]);
    });
};
exports.countAll = (callback,search = null, startFilter = null ,endilter =null) => {
    let query = `SELECT COUNT(*) as total
        FROM plc_data AS t1
        WHERE (DATE(t1.date_time), TIME(t1.date_time)) IN (
            SELECT DATE(t2.date_time), MAX(TIME(t2.date_time))
            FROM plc_data AS t2
            GROUP BY DATE(t2.date_time)
        )`; 

        const queryParams = [];
        if (search && search !== null && search.length > 0) {
            query += ' AND DATE(t1.date_time) LIKE ?';
            queryParams.push(`%${search}%`);
        }
        if (startFilter && startFilter !== null && startFilter.length > 0 && endilter && endilter !== null && endilter.length > 0) {
            query += ' AND t1.date_time BETWEEN ? AND ?';
            queryParams.push(startFilter, endilter);
        }
    connection.query(query,queryParams, (error, results) => {
        if (error) {
            console.error('Database query error: ' + error.stack);
            return callback(error, null);
        }
        const total = results[0].total; // Accessing the total count from the results
        return callback(null, total);
    });
};
