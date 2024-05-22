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
import { toggleStatusRoomType,updatePlan,deletePlan ,exportExcelPlan } from "../../../../../service/callAPI/cmsAPI";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Switch from "react-switch";
import DatePicker from "react-datepicker";
import { set } from 'lodash';
import {convertTimeFormat} from "../../../../../service/funWeb/funWeb";
import "react-datepicker/dist/react-datepicker.css";
function RoomType(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [dataItem, setDataItem] = useState(null);
  const [sp2, setSp2] = useState('');
  const [sp3, setSp3] = useState('');
  const [sp1, setSp1] = useState('');
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const toggleModelData = (data) => {
    setShow(!show);
    if(data){
      setDataItem(data)
      setSp1(data.quantity_sp1);
      setSp2(data.quantity_sp2);
      setSp3(data.quantity_sp3);
      setNote(data.note);
      setStartDate(data.creata_at)
    }
 
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const updateDataItem=(id)=>{
    const data = {
      sp2: sp2,
      sp1: sp1,
      sp3: sp3,
      creata_at: convertTimeFormat(startDate),
      note: note
    }

    const setFunctions = {
      setSp2,
      setNote,
      setSp3,
      setSp1,
      setStartDate
    };
    //console.log(data);
   dispatch(updatePlan(data, setFunctions, toggleModelData,id));
  }
  const toggelDelete = (id) => {
    confirmAlert({
      title: 'Trạng thái',
      message: 'Bạn có xác nhận cập nhật trạng thái không ?',
      buttons: [
        {
          label: 'Có',
          onClick: () => deleteDataItem(id)
        },
        {
          label: 'Không',
          closeOnClickOutside: true
        }
      ]
    });
  }
  const deleteDataItem = (id) => {
    dispatch(deletePlan(id));
  }
  const openModalToggle = (data) => {
    dispatch(toggleModalFun(true));
    dispatch(deatilDataFun(data));
  }
  const handleChange = (checked) => {
    setIsUpdate(!isUpdate);
    setChecked(checked)
  };
  return (
    <>
      {show && show === true ?
        <Modal
          show={show}
          onHide={toggleModelData}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{isUpdate && isUpdate === true ? "Cập nhật" : "Xem chi tiết"} thông tin kế hoạch</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3 flex_center">
                <div className='mt-2 mb-2 row'>
                  <div className='flex_center col-10'>
                    <label>Xem chi tiết</label>
                    <Switch
                    className='toggle-modal'
                    onChange={handleChange}
                    checked={checked}
                    />
                    <label>Cập nhật</label>
                  </div>
                  <div className='flex_center btn-button col-2' onClick={()=>toggelDelete(dataItem.id)}>
                       <i class="fa-solid fa-trash"></i>
                  </div>
                </div>

                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    {isUpdate && isUpdate === true ? (
                      <React.Fragment>
                        <Form.Label>Ngày chọn kế hoạch</Form.Label>
                          <DatePicker class="form-control"   value={convertTimeFormat(startDate)} selected={startDate} onChange={(date) => setStartDate(date)} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div>
                          <Form.Label className='mg-r-20'>Ngày chọn kế hoạch : </Form.Label>
                          {dataItem && dataItem !== null ? dataItem.creata_at : "Không có dữ liệu"}
                        </div>
                      </React.Fragment>
                    )}

                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    {isUpdate && isUpdate === true ? (
                      <React.Fragment>
                        <Form.Label >Sản phẩm 1</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={sp1}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div>
                          <Form.Label className='mg-r-20'>Sản phẩm 1: </Form.Label>
                          {dataItem && dataItem !== null ? dataItem.quantity_sp1 : "Không có dữ liệu"}
                        </div>
                      </React.Fragment>
                    )}

                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    {isUpdate && isUpdate === true ? (
                      <React.Fragment>
                        <Form.Label>Sản phẩm 2</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={sp2}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div>
                          <Form.Label className='mg-r-20'>Sản phẩm 2: </Form.Label>
                          {dataItem && dataItem !== null ? dataItem.quantity_sp2 : "Không có dữ liệu"}
                        </div>
                      </React.Fragment>
                    )}

                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    {isUpdate && isUpdate === true ? (
                      <React.Fragment>
                        <Form.Label>Sản phẩm 3</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={sp3}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div>
                          <Form.Label className='mg-r-20'>Sản phẩm 3: </Form.Label>
                          {dataItem && dataItem !== null ? dataItem.quantity_sp3 : "Không có dữ liệu"}
                        </div>
                      </React.Fragment>
                    )}

                  </Form.Group>
                </div>
               
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    {isUpdate && isUpdate === true ? (
                      <React.Fragment>
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                          required
                          type="text"
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div>
                          <Form.Label className='mg-r-20'>Ghi chú </Form.Label>
                          {dataItem && dataItem !== null && dataItem.note !== null ? dataItem.note : "Không có dữ liệu"}
                        </div>
                      </React.Fragment>
                    )}

                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    <React.Fragment>
                      <div>
                        <Form.Label className='mg-r-20'>Trạng thái </Form.Label>
                        {dataItem && dataItem !== null ? (
                          dataItem.status === 0 ? (
                            "Chưa hoàn thành"
                          ) : dataItem.status === 1 ? (
                            "Đã hoàn thành"
                          ) : (
                            "Đã hủy kế hoạch"
                          )
                        ) : (
                          "Không có dữ liệu"
                        )}

                      </div>
                    </React.Fragment>
                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    <React.Fragment>
                      <div>
                        <Form.Label className='mg-r-20'>Tổng sản phẩm </Form.Label>
                        {dataItem && dataItem !== null ? dataItem.quantity_total : "Không có dữ liệu"}

                      </div>
                    </React.Fragment>
                  </Form.Group>
                </div>
                <div className='mt-2 mb-2'>
                  <Form.Group as={Col} md="12" >
                    <React.Fragment>
                      <div>
                        <Form.Label className='mg-r-20'>Thời gian cập nhật</Form.Label>
                        {dataItem && dataItem !== null && dataItem.update_at !== null ? dataItem.update_at : "Chưa cập nhật"}

                      </div>
                    </React.Fragment>
                  </Form.Group>
                </div>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {isUpdate && isUpdate === true ? (
              <Button type="submit" onClick={()=>updateDataItem(dataItem && dataItem !== null && dataItem.id !== null ? dataItem.id : 0)}>Cập nhật</Button>
            ) : (
              null

            )}
            <Button variant="secondary" onClick={toggleModelData}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        : <></>
      }
      <Table
        aria-label="simple table"
        sx={{
          whiteSpace: "nowrap",
          mt: 2
        }}
      >

        <TableHead>
          <TableRow>
            {props.titleHeader && props.titleHeader.map((item, index) => {
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

        {props.plan && props.plan.length > 0 && props.plan.map((items, index) => (
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
                {convertTimeFormat(items.creata_at)}
              </Typography>
            </TableCell>
            <TableCell>

              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {Number(items.quantity_total)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" fontWeight={400}>
                {
                          items.status === 0 ? (
                            "Chưa hoàn thành"
                          ) : items.status === 1 ? (
                            "Đã hoàn thành"
                          ) : (
                            "Đã hủy kế hoạch"
                          )
                      
                  }
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" fontWeight={400}>
                <div className='flex_center'>
                  <button className='btn-acction-cms bg-org' onClick={() => toggleModelData(items)}>Hành động chi tiết</button>
                </div>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>



  );
}

export default RoomType;
