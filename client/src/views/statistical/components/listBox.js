import React from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import Card from 'react-bootstrap/Card';
const SalesOverview = () => {
    return (
        <DashboardCard title="Hôm nay" >
            <div className='row'>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <Card className='card-home bg-primaryKey'>
                    <Card.Body>
                        <Card.Title>Nhân viên</Card.Title>
                        <Card.Text> 4 </Card.Text>
                    </Card.Body>
                    <i class="fa-solid fa-user icon-from-home"></i>
                </Card>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <Card className='card-home bg-redPink'>
                    <Card.Body>
                        <Card.Title>Kế hoạch </Card.Title>
                        <Card.Text> 10</Card.Text>
                    </Card.Body>
                    <i class="fa-solid fa-user icon-from-home"></i>
                </Card>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <Card className='card-home bg-yellow-green'>
                    <Card.Body>
                        <Card.Title>Chức vụ</Card.Title>
                        <Card.Text> Quản lý  </Card.Text>
                    </Card.Body>
                    <i class="fa-solid fa-user icon-from-home"></i>
                </Card>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                <Card className='card-home bg-org'>
                    <Card.Body>
                        <Card.Title>Sản phẩm</Card.Title>
                        <Card.Text> 113  </Card.Text>
                    </Card.Body>
                    <i class="fa-solid fa-user icon-from-home"></i>
                </Card>
            </div>
            </div>
           
        </DashboardCard>
    );
};

export default SalesOverview;
