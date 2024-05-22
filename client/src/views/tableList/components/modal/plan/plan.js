import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addPlan, updateRoomType } from "../../../../../service/callAPI/cmsAPI";
import { useSelector, useDispatch } from 'react-redux';
import { toggleModalFun, deatilDataFun } from "../../../../../redux/acction/cmsAcction";
import DatePicker from "react-datepicker";
import moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
function ModelRoomType() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const toggleModal = useSelector((state) => state.cms.toggleModal);
  const [deatilModal, setDeatilModal] = useState(false);
  const dataDeatil = useSelector((state) => state.cms.dataDeatil);
  const [sp2, setSp2] = useState('');
  const [sp3, setSp3] = useState('');
  const [sp1, setSp1] = useState('');
  const [note, setNote] = useState('');
  const [startDate, setStartDate] = useState(new Date());
    const handleShow = () => {
      setDeatilModal(true);
    };

  const handleClose = () => {
    setDeatilModal(false);
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const createData = () => {

    // const validator = new Validator({
    //   username: 'requisp2|min:6|max:60',
    //   password: 'requisp2|min:6|max:60',
    //   fullname: 'requisp2|min:6|max:60',
    //   role: 'requisp2',
    //   address: 'requisp2',
    //   note: 'requisp2',
    // });
    // console.log(validator);
    const data = {
      sp2: sp2,
      sp1: sp1,
      sp3: sp3,
      creata_at: moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      note: note
    }

    const setFunctions = {
      setSp2,
      setNote,
      setSp3,
      setSp1,
      setStartDate
    };
    dispatch(addPlan(data, setFunctions, handleClose));
    // validator.validate(data, (passes) => {
    //   if (passes) {
    //     const setFunctions = {
    //       setUsername,
    //       setPassword,
    //       setFullname,
    //       setRole,
    //       setAddress,
    //       setNote,
    //     };

    //    dispatch(addUser(data,setFunctions,handleClose));
    //   }
    //   else {
    //     console.log('Dữ liệu không hợp lệ', validator.errors.all());
    //   }
    // });

  }
  const updateData = () => {
    const data = {
      note: note
    }
    dispatch(updateRoomType(data, dataDeatil.id));
  }
  useEffect(() => {
    // if (dataDeatil && dataDeatil !== null) {
    //   setUsername(dataDeatil.name);
    //   setNote(dataDeatil.note);
    // }
  }, [dataDeatil])
  return (
    <>
      <div className='icon-box flex_center' onClick={handleShow}>
        <i class="fa-solid fa-plus"></i>
      </div>
      {deatilModal && deatilModal === true ? 
        <Modal show={deatilModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dataDeatil && dataDeatil !== null ? "Cập nhật kế hoạch" : " Thêm mới kế hoạch"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} >
            <div className='row'>
                  <Form.Group as={Col} className='col-12 my-2' >
                    <Form.Label>Ngày sản xuất</Form.Label>
                    <DatePicker class="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                  </Form.Group>
                  <Form.Group as={Col}  className='col-12 my-2' >
                    <Form.Label>Sản phẩm 1</Form.Label>
                    <Form.Control
                      requisp2
                      type="text"
                      onChange={(e) => setSp1(e.target.value)}
                      value={sp1}
                    />
                  </Form.Group>
                  <Form.Group as={Col}  className='col-12 my-2' >
                    <Form.Label>Sản phẩm 2</Form.Label>
                    <Form.Control
                      requisp2
                      type="text"
                      onChange={(e) => setSp2(e.target.value)}
                      value={sp2}
                    />
                  </Form.Group>
                  <Form.Group as={Col}  className='col-12 my-2' >
                    <Form.Label>Sản phẩm 3</Form.Label>
                    <Form.Control
                      requisp2
                      type="text"
                      onChange={(e) => setSp3(e.target.value)}
                      value={sp3}
                    />
                  </Form.Group>
                  <Form.Group as={Col}  className='col-12 my-2' >
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      requisp2
                      type="text"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                    />
                  </Form.Group>
                
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={dataDeatil && dataDeatil !== null ? updateData : createData}>
            {dataDeatil && dataDeatil !== null ? "Cập nhật" : " Thêm "}
          </Button>
        </Modal.Footer>
      </Modal>   :"" } 
    
    </>
  );
}

export default ModelRoomType;