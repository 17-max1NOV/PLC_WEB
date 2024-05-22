const connection = require('../config/config');
const jwt = require('jsonwebtoken');

exports.createUser = (callback,data) => {
    connection.query('INSERT INTO tbl_user SET ?', data, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};
exports.updateUser = (callback, data, id) => {
    connection.query('UPDATE tbl_user SET ? WHERE id = ?', [data, id], (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }

        return callback(null, results);
    });
};

exports.checkUsername = (callback, username, id = null,count=false) => {
    let query = 'SELECT * FROM tbl_user WHERE username = ?';
    let queryParams = [username];

    if (id !== null) {
        query += ' AND id <> ?';
        queryParams.push(id);
    }

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        if(count===true){
            return callback(null, results);
        }
        if (results.length > 0) {
            return callback(null, true);
        }
        return callback(null, false);
    });
};


exports.getList = (callback, page = 1, limit = 10, search = null, filter = null) => {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM tbl_user';

    const queryParams = [];
        if (search && search!==null && search.length > 0) {
        query += ' WHERE username LIKE ? OR fullname LIKE ?';
        queryParams.push(`%${search}%`, `%${search}%`);
    }
    if (filter && filter!==null && filter.length > 0) {
        query += ' AND categoryUser = ?';
        queryParams.push(filter);
    }
    query += ' LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return callback(error, null);
        }
        return callback(null, results);
    });
};

