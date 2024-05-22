import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {addUser,updateRoomType} from  "../../../../../service/callAPI/cmsAPI";
import { useSelector, useDispatch } from 'react-redux';
import {toggleModalFun,deatilDataFun} from "../../../../../redux/acction/cmsAcction";

function ModelRoomType() {
  const dispatch = useDispatch();
  const [name,setName]=useState('');
  const [note,setNote]=useState('');
  const [validated, setValidated] = useState(false);
  const toggleModal = useSelector((state) => state.cms.toggleModal);
  const dataDeatil = useSelector((state) => state.cms.dataDeatil);
 
  const handleShow = () => {
    dispatch(toggleModalFun(true));
  };
  const handleClose = () => {
    dispatch(toggleModalFun(false));
    dispatch(deatilDataFun(null))
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const createData=()=>{
    const data={
      name:name,
      note:note
    }
   dispatch(addUser(data));
  }
  const updateData=()=>{
    const data={
      note:note
    }
   dispatch(updateRoomType(data,dataDeatil.id));
  }
  useEffect(()=>{
      if(dataDeatil&&dataDeatil!==null){
        setName(dataDeatil.name);
        setNote(dataDeatil.note);
      }
  },[dataDeatil])
 
  return (
    <>
      <div className='icon-box flex_center' onClick={handleShow}>
      <i class="fa-solid fa-plus"></i>
      </div>

      <Modal show={toggleModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{dataDeatil&&dataDeatil!==null?"Cập nhật tên dịch vụ":" Thêm mới tên dịch vụ"} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" >
          <Form.Label>Tên dịch vụ</Form.Label>
          <Form.Control
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              disabled={dataDeatil && dataDeatil !== null}
              value={name}
            />

        </Form.Group>
        <Form.Group as={Col} md="12" >
          <Form.Label>Giá</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e)=>setNote(e.target.value)}
            value={note}
          />
        </Form.Group>
        <Form.Group as={Col} md="12" >
          <Form.Label>Đơn vị</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e)=>setNote(e.target.value)}
            value={note}
          />
        </Form.Group>
      </Row>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={dataDeatil&&dataDeatil!==null?updateData:createData}>
          {dataDeatil&&dataDeatil!==null?"Cập nhật":" Thêm "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelRoomType;