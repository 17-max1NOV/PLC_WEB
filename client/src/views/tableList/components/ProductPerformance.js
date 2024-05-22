import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddPlan from './modal/plan/plan';
import ListPlan from './list/plan/plan';
import ListUser from './list/user/user';
import AddUser from './modal/user/user';
import "../../../assets/css/cms.css";
import Form from 'react-bootstrap/Form';
import { getListRoomType, getListPlan, getListUser,exportExcelPlan } from "../../../service/callAPI/cmsAPI";
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { limitFun, pageFun, updateNameExcelFun } from "../../../redux/acction/cmsAcction";
import { toast } from 'react-toastify';

const ProductPerformance = () => {
    const { search } = useLocation();
    const dispatch = useDispatch();
   const queryParams = new URLSearchParams(search);
    const type = queryParams.get('type');
    const [title, setTitle] = useState('');
    const [titleHeader, setTitleHeader] = useState([]);
    const [searchToggle, setSearchToggle] = useState(false);
    const [filterToggle, setFilterToggle] = useState(false);
    const [searchValue, setSearchValue] = useState(null);
    const [filterValue, setFilterValue] = useState(null);
    const pageNow = useSelector((state) => state.cms.pageNow);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(1);
    const data = useSelector((state) => state.cms.listTable);
   
    useEffect(() => {
        switchCase();
    }, [type, pageNow, limit, searchValue, filterValue]);
    const switchCase = () => {
        switch (type) {
            case 'plan':
                setTitle('Quản lý kế hoạch sản xuất');
                setTitleHeader(['STT', 'Thời gian', 'Tổng', 'Trạng thái', 'Hành động']);
                dispatch(getListPlan(page, limit, searchValue, filterValue,setTotal));
                dispatch(updateNameExcelFun('Kế hoạch sản xuất'));
                break;
            case 'user':
                setTitle('Quản lý tài khoản');
                setTitleHeader(['STT', 'Tên đăng nhập', "Họ tên",'Phân Loại',  'Trạng thái', 'Hành động']);
                dispatch(getListUser(page, limit, searchValue, filterValue));
                dispatch(updateNameExcelFun('Quản lý tài khoản'));
                break;
            default:
                break;
        }
    };

    const toggleSearch = () => {
        setSearchToggle(!searchToggle);
    };

    const toggleFilter = () => {
        setFilterToggle(!filterToggle);
    };

    const filterChange = (e) => {
        const valueInFun = Number(e.target.value);
        if (valueInFun !== null) {
            if (valueInFun === 1 || valueInFun === 0) {
                setFilterValue(valueInFun)
            }
        }
    };

    const handlePageClick = (event) => {
        const pageNew = event.selected + 1;
        switch (type) {
            case 'plan':
                dispatch(getListPlan(pageNew, limit, searchValue, filterValue,setTotal));
                break;
            case 'user':
                dispatch(getListUser(page, limit, searchValue, filterValue));
                break;
            default:
                break;
        }
    };
    const handleKeyUp = debounce(() => {
        switch (type) {
            case 'roomType':
                dispatch(getListRoomType(1, limit, searchValue, filterValue));
                break;

            default:
                break;
        }
    }, 1000);
    const returnData = () => {
        dispatch(limitFun(10));
        dispatch(pageFun(1));
        setSearchValue(null);
        setFilterValue(null);
    }
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    const exportsExcel = () => {
        switch (type) {
            case 'plan':
                exportExcelPlan();
                break;

            default:
                break;
        }
    }
    return (
        <DashboardCard title={title}>
            <div className='pt-3 pb-3 flex_start'>
                {(() => {
                    switch (type) {
                        case 'plan':
                            return <AddPlan />;
                        case 'user':
                            return <AddUser />;
                        default:
                            return null;
                    }
                })()}
                {/* <div className='icon-box flex_center' onClick={toggleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div> */}
                {/* <div className='icon-box flex_center' onClick={toggleFilter}>
                    <i className="fa-solid fa-filter"></i>
                </div> */}
                {/* <div className='icon-box flex_center' onClick={returnData}>
                    <i className="fa-solid fa-rotate-left"></i>
                </div> */}
                <div className='icon-box flex_center' onClick={exportsExcel}>
                    <i className="fa-solid fa-file-excel"></i>
                </div>
            </div>
            <div className='row'>
                {searchToggle === true ?
                    <div className='pt-3 pb-4 col-xl-6 col-md-6 col-mg-6 col-sm-12'>
                        <div className='form-input-search'>
                            <div className='icon-search'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input
                                type='text'
                                placeholder='Nhập thông tin cần tìm'
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyUp={handleKeyUp}
                            />
                        </div>
                    </div> : ""
                }

                {filterToggle === true ?
                    <div className='pt-3 pb-4 col-xl-6 col-md-6 col-mg-6 col-sm-12' >
                        <Form.Select aria-label="Default select example"
                            onChange={filterChange}
                        >
                            <option disabled selected>Chọn trạng thái</option>
                            <option value="1">Đang bật</option>
                            <option value="0">Đang tắt</option>
                        </Form.Select>
                    </div> : ""
                }
            </div>

            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                {(() => {
                    switch (type) {
                        case 'plan':
                            return <ListPlan titleHeader={titleHeader} plan={data} />;
                        case 'user':
                            return <ListUser titleHeader={titleHeader} products={data} />;
                        default:
                            return null;
                    }
                })()}
                {Math.ceil(total / limit) > 1 ?
                     <ReactPaginate
                     breakLabel="..."
                     nextLabel="next >"
                     onPageChange={handlePageClick}
                     pageRangeDisplayed={5}
                     pageCount={Math.ceil(total / limit)}
                     previousLabel="< previous"
                     renderOnZeroPageCount={null}
                     className='paginate-table'
                   />
                    : ""}
            </Box>
        </DashboardCard>
    );
};

export default ProductPerformance;
