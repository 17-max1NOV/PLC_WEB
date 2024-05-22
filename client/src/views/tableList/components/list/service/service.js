import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModalFun, deatilDataFun } from "../../../../../redux/acction/cmsAcction";
import {toggleStatusRoomType} from "../../../../../service/callAPI/cmsAPI";
function RoomType(props) {

  const dispatch = useDispatch();
 const toggelStatus = (id) => {
    confirmAlert({
      title: 'Trạng thái',
      message: 'Bạn có xác nhận cập nhật trạng thái không ?',
      buttons: [
        {
          label: 'Có',
          onClick: () => toggleStatus(id)
        },
        {
          label: 'Không',
          closeOnClickOutside: true
        }
      ]
    });
  }
  const toggleStatus=(id)=>{
    dispatch(toggleStatusRoomType(id));
  }
  const openModalToggle = (data) => {
    dispatch(toggleModalFun(true));
    dispatch(deatilDataFun(data));
  }
  console.log(props.titleHeadr);
  return (
    <Table
      aria-label="simple table"
      sx={{
        whiteSpace: "nowrap",
        mt: 2
      }}
    >
      <TableHead>
        <TableRow>
          {props.titleHeadr && props.titleHeadr.map((item, index) => {
            return (
              <TableCell>
                <Typography>
                  {item}
                </Typography>
              </TableCell>
            )
          })}


        </TableRow>
      </TableHead>

      {/* {props.products && props.products.length > 0 && props.products.map((items, index) => (
        <TableRow key={items.name}>
          <TableCell>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {index + 1}
            </Typography>
          </TableCell>

          <TableCell>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {items.name}
            </Typography>
          </TableCell>
          <TableCell>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {items.note!==null?items.note:"Không có ghi chú"}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" fontWeight={400}>
              {items.status === 1 ? "Đang bật" : "Đang tắt"}
            </Typography>
          </TableCell>
          <TableCell >
            <Typography color="textSecondary" fontWeight={400}>
              <div className='flex_center'>
                <button className={`btn-acction-cms ${items.status === 1 ?"bg-redPink" : "bg-yellow-green" }`}  onClick={()=>toggelStatus(items.id)}> {items.status === 1 ?  "Tắt":"Bật" }</button>
                <button className='btn-acction-cms bg-org' onClick={() => openModalToggle(items)}>Sửa</button>
              </div>
            </Typography>
          </TableCell>
        </TableRow>
      ))} */}
    </Table>


  );
}

export default RoomType;
