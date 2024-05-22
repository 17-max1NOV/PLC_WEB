const moment = require('moment');
const planModel = require('../model/planModel');
const notificationModel = require('../model/notificationModel');

exports.scheduleUpdatePlanStatus = () => {
    const now = new Date();
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 0); // Thời gian đến 16h22p
    const currentTime = moment().startOf('day').format('YYYY-MM-DD');
    let timeUntilTargetTime = targetTime - now;
    if (timeUntilTargetTime < 0) {
        timeUntilTargetTime += 24 * 60 * 60 * 1000; 
    }

    setTimeout(() => {
        updateStatus(currentTime)
        setInterval(() => {
            updateStatus(currentTime)
        }, 24 * 60 * 60 * 1000); // Lặp lại mỗi 24 giờ
    }, timeUntilTargetTime);
};
function updateStatus(currentTime){
    planModel.getTodayPlans((error, results) => {
        if (error) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            return; // Thoát khỏi hàm nếu có lỗi
        }
        const data={
            status:1
        }
        planModel.updateData((error, results) => {
            if (error) {
                console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
            }
            const dataNotification={
                mess : "Kế hoạch sản xuất ngày " + currentTime  +" đã hoàn thành",
                category : 1,
                warning : "",
                status : 1
            }
            notificationModel.createData((error, results) => {
                if (error) {
                    console.error('Lỗi truy vấn cơ sở dữ liệu: ' + error.stack);
                }
            
            },dataNotification);
        },data,results[0].id);
    },currentTime);
}