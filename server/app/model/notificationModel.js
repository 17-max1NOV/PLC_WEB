const connection = require('../config/config');

exports.createData = (callback,data) => {
    connection.query('INSERT INTO notification SET ?', data, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};
exports.updateData = (callback, data, id) => {
    connection.query('UPDATE tbl_Plan SET ? WHERE id = ?', [data, id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};

exports.checkDateMonthYear = (callback, creata_at, id = null, count = false) => {
    let query = 'SELECT * FROM tbl_plan WHERE DATE(creata_at) = DATE(?)';
    let queryParams = [creata_at];

    if (id !== null) {
        query += ' AND id <> ?';
        queryParams.push(id);
    }

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        if (count === true) {
            return callback(null, results.length);
        }

        if (results.length > 0) {
            return callback(null, true);
        }

        return callback(null, false);
    });
};

exports.getValueId = (callback, id, count = false) => {
    connection.query("SELECT * FROM tbl_plan WHERE id = ?", [id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        if (count === true) {
            return callback(null, results.length);
        }


        return callback(null, results);
    });
};
exports.getList = (callback, page = 1, limit = 10, search = null, filter = null) => {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM tbl_plan';

    const queryParams = [];
        if (search && search!==null && search.length > 0) {
        query += ' WHERE creata_at LIKE ?';
        queryParams.push(`%${search}%`);
    }
    if (filter && filter!==null && filter.length > 0) {
        query += ' AND status = ?';
        queryParams.push(filter);
    }
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    connection.query(query , queryParams, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};
exports.getAll = (callback) => {
    connection.query('SELECT * FROM tbl_plan order by id desc', (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};
exports.deletePlan = (callback, id) => {
    console.log(id);
    connection.query("DELETE  FROM tbl_plan WHERE id = ?", [id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};

exports.getDataDeatil = (callback,id) => {
    connection.query('SELECT * FROM tbl_plan  WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};

exports.getTodayPlans = (callback,data) => {
    connection.query('SELECT * FROM tbl_plan WHERE DATE(creata_at) = ?', [data], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};
