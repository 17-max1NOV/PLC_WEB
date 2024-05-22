import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { addUser, updateRoomType } from "../../../../../service/callAPI/cmsAPI";
import { useSelector, useDispatch } from 'react-redux';
import { toggleModalFun, deatilDataFun } from "../../../../../redux/acction/cmsAcction";
function ModelRoomType() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const toggleModal = useSelector((state) => state.cms.toggleModal);
  const dataDeatil = useSelector((state) => state.cms.dataDeatil);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

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
  const createData = () => {

    // const validator = new Validator({
    //   username: 'required|min:6|max:60',
    //   password: 'required|min:6|max:60',
    //   fullname: 'required|min:6|max:60',
    //   role: 'required',
    //   address: 'required',
    //   note: 'required',
    // });
    // console.log(validator);
    const data = {
      username: username,
      password: password,
      fullname: fullname,
      role: role,
      address: address,
      note: note
    }
    const setFunctions = {
      setUsername,
      setPassword,
      setFullname,
      setRole,
      setAddress,
      setNote,
    };
    dispatch(addUser(data, setFunctions, handleClose));
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
    if (dataDeatil && dataDeatil !== null) {
      setUsername(dataDeatil.name);
      setNote(dataDeatil.note);
    }
  }, [dataDeatil])

  return (
    <>
      <div className='icon-box flex_center' onClick={handleShow}>
        <i class="fa-solid fa-plus"></i>
      </div>

      <Modal show={toggleModal} onHide={handleClose} className='user-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{dataDeatil && dataDeatil !== null ? "Cập nhật tài khoản" : " Thêm mới tài khoản"} </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                <img className='upload-img' src='https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg' />
              </div>
              <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12'>
                <Row className="mb-3">
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" >
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={dataDeatil && dataDeatil !== null}
                      value={username}
                    />

                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" >
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" >
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => setFullname(e.target.value)}
                      value={fullname}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" >
                    <Form.Label>Chọn chức vụ</Form.Label>
                    <Form.Select onChange={(e) => setRole(e.target.value)}  >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className='col-12' >
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </Form.Group>
                </Row>
              </div>
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
      </Modal>
    </>
  );
}

export default ModelRoomType;