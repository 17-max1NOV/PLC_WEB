import React from 'react'
import LeftImg from "../../../assets/images/logos/leftImg.jpg"
import RightImg from "../../../assets/images/logos/rightImg.jpg"
import Badge from 'react-bootstrap/Badge';

function LogoDashbroad() {
  return (
    <div className='row'>
            <div className='col-4'>
                    <img src={LeftImg} className='img-logo-class' />
            </div>
            <div className='col-5 flex_center'>
            <h3 className='titel-center'>
               Quản lý sản xuất mô hình nhà máy thông minh
            </h3>
            </div>
            <div className='col-3' >
                    <img src={RightImg} className='img-logo-class'/>
            </div>
    </div>
  )
}

export default LogoDashbroad
