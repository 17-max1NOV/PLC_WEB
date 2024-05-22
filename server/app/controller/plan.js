const planModel = require('../model/planModel');
const moment = require('moment');
const currentTime = moment();

exports.getList = (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        let search = req.query.search || null;
    
        const fitler = req.query.fitler || null;

      
     
        planModel.getList((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results) {
          
                planModel.countList((error, resultsCount) => {
                    if (error) {
                        return res.status(500).json({ error: 'Database query error' });
                    }
                    if (results) {
                        return res.json({
                            status: "success",
                            results: results,
                            totalItems:resultsCount
                        })
        
                    }
                }, page, limit, search, fitler)
            }
        }, page, limit, search, fitler)
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}

exports.createAcction = (req, res) => {
   try {
        const sp1 = Number(req.body.sp1);
        const sp2 = Number(req.body.sp2);
        const sp3 = Number(req.body.sp3);
        const creata_at = req.body.creata_at;
        const note = req.body.note;
        const total = Number(sp1 + sp2 + sp3);
        const data = {
            quantity_sp1: sp1,
            quantity_sp2: sp2,
            quantity_sp3: sp3,
            quantity_total: total,
            creata_at: creata_at,
            update_at: null,
            note: note,
            status: 0
        }
        const inputTime = moment(creata_at, 'YYYY-MM-DD').format('YYYY-MM-DD');
        const currentTime = moment().startOf('day').format('YYYY-MM-DD');

        if (inputTime < currentTime) {
            return res.json({ status: "fail", mess: "Thời gian của kế hoạch không được nhỏ hơn ngày hiện tại" });
        }
        planModel.checkDateMonthYear((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results) {
                return res.json({ status: "fail", mess: "Đã có kế hoạch của ngày này rồi vui lòng chọn 1 ngày khác" });
            }
            planModel.createData((error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Database query error' });
                }
                if (results) {
                    return res.json({
                        status: "success",
                        mess: "Thêm thành công",
                    })
                }
            }, data)
        }, creata_at)
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}
exports.updateAcction = (req, res) => { 
    try {
        const id = Number(req.params.id);
        const sp1 = Number(req.body.sp1);
        const sp2 = Number(req.body.sp2);
        const sp3 = Number(req.body.sp3);
        const creata_at = req.body.creata_at;
        const note = req.body.note;
        const total = Number(sp1 + sp2 + sp3);
        const data = {
            quantity_sp1: sp1,
            quantity_sp2: sp2,
            quantity_sp3: sp3,
            quantity_total: total,
            creata_at: creata_at,
            update_at: null,
            note: note,
        }
         const inputTime = moment(creata_at, 'YYYY-MM-DD').format('YYYY-MM-DD');
        const currentTime = moment().startOf('day').format('YYYY-MM-DD');

        if (inputTime < currentTime) {

            return res.json({ status: "fail", mess: "Thời gian của kế hoạch không được nhỏ hơn ngày hiện tại" });
        }
        planModel.getDataDeatil((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results[0].status !== 0 ) {
                return res.json({ status: "fail", mess: "Bây giờ bạn không thể thay đổi kế hoạch được nữa" });
            }
            planModel.checkDateMonthYear((error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Database query error' });
                }
                if (results) {
                    return res.json({ status: "fail", mess: "Đã có kế hoạch của ngày này rồi vui lòng chọn 1 ngày khác" });
                }
                planModel.updateData((error, results) => {
                    if (error) {
                        return res.status(500).json({ error: 'Database query error' });
                    }
                    if (results) {
                        return res.json({
                            status: "success",
                            mess: "Cập nhật thành công",
                        })
                    }
                }, data)
            }, creata_at,id)
        },id)

    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}
exports.deleteAcction = (req, res) => {
    try {
        const id = Number(req.params.id);
        const currentTime = moment().startOf('day').format('YYYY-MM-DD');
        planModel.getDataDeatil((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results[0].status !== 0  || moment(results[0].creata_at, 'YYYY-MM-DD').format('YYYY-MM-DD')<currentTime) {
                return res.json({ status: "fail", mess: "Bây giờ bạn không thể thay đổi kế hoạch được nữa" });
            }
            planModel.deletePlan((error, results) => {
                if (error) {
                    return res.status(500).json({ error: 'Database query error' });
                }
                if (results) {
                    return res.json({
                        status: "success",
                        mess: "Xóa thành công",
                    })
                }
            }, id)
        },id)

    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}
exports.getListExcel = (req, res) => {
    try {
        planModel.getAll((error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Database query error' });
            }
            if (results) {
                return res.json({
                    status: "success",
                    dataName:"Kế hoạch",
                    results: results,
                })

            }
        })
    } catch (error) {
        return res.json({ status: "fail", mess: "có lỗi xảy ra" });
    }
}