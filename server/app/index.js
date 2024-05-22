const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
app.use(cors());
const port=4000;
const bodyParser = require('body-parser');
const staffRouter=require('./router/staff');
const accountRouter=require('./router/account');
const statisticalRouter=require('./router/statistical');
const planService=require('./service/plan');
const planRouter=require('./router/plan');
const productRouter=require('./router/product');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/staff',staffRouter);
app.use('/',accountRouter);
app.use('/statistical',statisticalRouter);
app.use('/plan',planRouter);
app.use('/product',productRouter);
planService.scheduleUpdatePlanStatus()
app.listen(port, () => {
  console.log(`Server đang lắng nghe tại cổng ${port}`);
});
