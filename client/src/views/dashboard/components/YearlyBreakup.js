import React,{useState,useEffect} from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';
import APILink from "../../../service/APILink";
import { toast } from 'react-toastify';
import DashboardCard from '../../../components/shared/DashboardCard';

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const red = "#ff6c60";
  const yellow = "#FCB322";
  const blue = "#5D87FF";
  const [arr,setArr]=useState(null);

  // chart
  useEffect(()=>{
    callAPI();
},[])
const callAPI =()=>{
    const data={
        value:1
    }
    APILink.get(`statistical/staticical-percent`,data)
    .then((response) => {
        console.log(response.data)
    if (response.data.status === "success") {
        setArr(response.data.result)
    }else{
    toast.error(response.data.mess)
    }
    })
    .catch((error) => {
    });
  }
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [red, yellow, blue],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      y: {
        // Định dạng dữ liệu hiển thị trong tooltip
        formatter: function(value) {
          return value + " sản phẩm";
        }
      }
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart = arr && arr.length > 0 ? arr : [];
  
  return (
    <DashboardCard title="Biểu đồ tỉ lệ sản phẩm 1 ngày">
      <Grid container spacing={3}>
        <Grid item xs={7} sm={7}>
          <Typography variant="h3" fontWeight="700">
            Tổng  :
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            {/* <Typography variant="subtitle2" fontWeight="600">
              1000
            </Typography> */}
            <Typography variant="subtitle2" color="textSecondary">
              sản phẩm
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: red, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
              S1
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: yellow, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
              S2
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: blue, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                S3
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={5} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
