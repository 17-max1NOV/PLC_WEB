const mysql = require('mysql2');

// Thay đổi các thông số kết nối dựa trên cấu hình máy chủ MySQL của bạn
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'plc',
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu: ' + err.stack);
    return;
  }
  console.log('Kết nối thành công đến cơ sở dữ liệu');
});

module.exports = connection;
