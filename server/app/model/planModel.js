const connection = require('../config/config');

exports.createData = (callback,data) => {
    connection.query('INSERT INTO tbl_plan SET ?', data, (error, results) => {
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

    if (search && search !== null && search.length > 0) {
        query += ' WHERE creata_at LIKE ?';
        queryParams.push(`%${search}%`);
    }

    if (filter && filter !== null && filter.length > 0) {
        query += ' AND status = ?';
        queryParams.push(filter);
    }
    query += ' ORDER BY creata_at DESC';
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error executing database query:', error);
            return callback(error, null);
        }
        return callback(null, results);
    });
};

exports.countList = (callback, search = null, filter = null) => {
    let query = 'SELECT count(*) FROM tbl_plan';
    const queryParams = [];
    if (search && search !== null && search.length > 0) {
        query += ' WHERE creata_at LIKE ?';
        queryParams.push(`%${search}%`);
    }
    if (filter && filter !== null && filter.length > 0) {
        query += ' AND status = ?';
        queryParams.push(filter);
    }
    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        const total = results[0]['count(*)']; // Access the count(*) field
        return callback(null, total);
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

exports.getdataStatictical = (callback, time = false, startTime=null, endTime=null) => {
    let condition = '';
    let params = [startTime, endTime];
    if (time) {
        condition = 'AND DATE(t2.creata_at) BETWEEN ? AND ?';
        params.push(startTime, endTime);
    }
;
    connection.query(
        `SELECT *
        FROM tbl_plan AS t1
        WHERE (DATE(t1.creata_at), TIME(t1.creata_at)) IN (
            SELECT DATE(t2.creata_at), MAX(TIME(t2.creata_at))
            FROM tbl_plan AS t2
            WHERE 1=1 ${condition}
            GROUP BY DATE(t2.creata_at)
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

