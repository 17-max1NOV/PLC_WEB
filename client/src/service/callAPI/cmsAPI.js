import APILink from "../APILink";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListCmsTable, toggleModalFun, deatilDataFun,
  totalFun, pageFun, limitFun,getProductTable,
  totalProductFun,pageProductFun,limitProductFun
} from "../../redux/acction/cmsAcction";
import * as XLSX from 'xlsx';
export const getListUser = (page=1, limit=10, search=null, fitler=null) => {
  return (dispatch) => {
    const searchParam = search !== null && typeof search === 'string' ? `&search=${search}` : '';
    const fitterParam = fitler !== null && typeof fitler === 'number' ? `&fitter=${fitler}` : '';
    const apiUrl = `staff/?page=${page}&limit=${limit}${searchParam}${fitterParam}`;
    APILink.get(apiUrl)
      .then((response) => {
        console.log(response.data)
        if (response.data.status === "success") {
          dispatch(getListCmsTable(response.data.results));
          dispatch(totalProductFun(response.data.totalItems));
          dispatch(pageProductFun(response.data.pageNow));
          dispatch(limitProductFun(response.data.limit));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const addUser = (data,setFunctions,handleClose) => {
  return (dispatch) => {
    APILink.post(`staff/create`, data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListUser());
          toast.success(response.data.mess);
          handleClose();
          Object.keys(setFunctions).forEach((key) => {
            setFunctions[key]('');
          });
          // dispatch(toggleModalFun(false));
          // dispatch(deatilDataFun(null));
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const updateUser = (data,setFunctions,handleClose,id) => {
  return (dispatch) => {
    APILink.put(`staff/update/${id}`, data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListUser());
          toast.success(response.data.mess);
          handleClose();
          Object.keys(setFunctions).forEach((key) => {
            setFunctions[key]('');
          });
          // dispatch(toggleModalFun(false));
          // dispatch(deatilDataFun(null));
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const updateRoomType = (data, id) => {
  return (dispatch) => {
    APILink.put(`room/roomType/update/${id}`, data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListRoomType());
          toast.success(response.data.mess);
          dispatch(toggleModalFun(false));
          dispatch(deatilDataFun(null));
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const toggleStatusRoomType = (id) => {
  return (dispatch) => {
    APILink.put(`room/roomType/toggle/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListRoomType());
          toast.success(response.data.mess);
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const getListRoomType = (page = 1, limit = 10, search = null, fitter = null) => {
  return (dispatch) => {
    const searchParam = search !== null && typeof search === 'string' ? `&search=${search}` : '';
    const fitterParam = fitter !== null && typeof fitter === 'number' ? `&fitter=${fitter}` : '';
    const apiUrl = `room/roomType/?page=${page}&limit=${limit}${searchParam}${fitterParam}`;
    APILink.get(apiUrl)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListCmsTable(response.data.results));
          dispatch(totalFun(response.data.pagination.totalItems));
          dispatch(pageFun(response.data.pagination.pageNow));
          dispatch(limitFun(response.data.pagination.limit));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const exportExcelRoomType = () => {
  APILink.get(`room/roomType/?getAll=1`)
    .then((response) => {
      if (response.data.status === "success") {
        const nameFileExcel = useSelector((state) => state.cms.fileNameExcel);
        const data = response.data.results;
        console.log(data);
        if (data.length > 0) {
          const worksheet = XLSX.utils.json_to_sheet(data);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
          
          XLSX.writeFile(workbook, nameFileExcel + '.xlsx');
          console.log("Excel exported successfully!");
        } else {
          toast.warning("No data to export.");
          console.log("No data to export.");
        }

      }
      else {
        toast.error(response.data.mess)
      }
    })
    .catch((error) => {
    });
};
export const getListPlan = (page=1, limit=10, search=null, fitler=null,setTotal) => {
  return (dispatch) => {
    const searchParam = search !== null && typeof search === 'string' ? `&search=${search}` : '';
    const fitterParam = fitler !== null && typeof fitler === 'number' ? `&fitter=${fitler}` : '';
    const apiUrl = `plan/?page=${page}&limit=${limit}${searchParam}${fitterParam}`;
    APILink.get(apiUrl)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListCmsTable(response.data.results));
          setTotal(response.data.totalItems)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
export const addPlan = (data,setFunctions,handleClose) => {
  return (dispatch) => {
    APILink.post(`plan/create`, data)
      .then((response) => {
        if (response.data.status === "success") {
         /// dispatch(getListUser());
          toast.success(response.data.mess);
          handleClose();
          Object.keys(setFunctions).forEach((key) => {
            setFunctions[key]('');
          });
          dispatch(getListPlan(1,10))
          // dispatch(toggleModalFun(false));
          // dispatch(deatilDataFun(null));
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const updatePlan = (data,setFunctions,handleClose,id) => {
  return (dispatch) => {
    APILink.put(`plan/update/${id}`, data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListPlan());
          toast.success(response.data.mess);
          handleClose();
          Object.keys(setFunctions).forEach((key) => {
            setFunctions[key]('');
          });
          // dispatch(toggleModalFun(false));
          // dispatch(deatilDataFun(null));
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const deletePlan = (id) => {
  return (dispatch) => {
    APILink.delete(`plan/delete/${id}`)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(getListPlan());
          toast.success(response.data.mess);
        }
        else {
          toast.error(response.data.mess)
        }
      })
      .catch((error) => {
      });
  }
};
export const exportExcelPlan = () => {
  APILink.get(`plan/list`)
    .then((response) => {
      if (response.data.status === "success") {
        const nameFileExcel = response.data.dataName;
        const data = response.data.results.map((plan, index) => ([
          index + 1,
          plan.creata_at,
          plan.quantity_total,
          plan.quantity_sp1,
          plan.quantity_sp2,
          plan.quantity_sp3,
          plan.status === 0 ? "Chưa hoàn thành" : plan.status === 1 ? "Đã hoàn thành" : "Đã hủy kế hoạch",
          plan.note
        ]));
        
        data.unshift(["STT", "Ngày tạo", "Tổng số lượng", "Số lượng SP1", "Số lượng SP2", "Số lượng SP3", "Trạng thái", "Ghi chú"]);
        
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        XLSX.writeFile(workbook, nameFileExcel + '.xlsx');
      } else {
        toast.error(response.data.mess);
      }
    })
    .catch((error) => {
      console.error('Lỗi khi xuất Excel:', error);
      toast.error('Có lỗi xảy ra khi xuất Excel');
    });
};
export const getListProduct = (page=1, limit=10,setTotal, search=null, startFilter=null,endilter=null) => {
  return (dispatch) => {
    const searchParam = search !== null && typeof search === 'string' ? `&search=${search}` : '';
    const fitterParam = startFilter !== null && endilter !== null ? `&startFilter=${startFilter}&endilter=${endilter}` : '';
    const apiUrl = `product/?page=${page}&limit=${limit}${searchParam}${fitterParam}`;
    APILink.get(apiUrl)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data)
          dispatch(getProductTable(response.data.results));
          dispatch(setTotal(response.data.totalItems));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};