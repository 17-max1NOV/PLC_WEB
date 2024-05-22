import React,{useState,useEffect} from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';
import APILink from "../../../service/APILink";
import { toast } from 'react-toastify';
const   MonthlyEarnings = () => {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';
  const [arr,setArr]=useState(null);

  useEffect(()=>{
    callAPI();
},[])
const callAPI =()=>{
    const data={
        value:1
    }
    APILink.get(`statistical/staticical-total`,data)
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
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: arr && arr.length > 0 ? arr : [],
    },
  ];

  return (
    <DashboardCard
      title="Tổng số sản phẩm"
      action={
        <Fab color="secondary" size="medium" sx={{color: '#ffffff'}}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="60px" />
      }
    >
      <>

        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
           Tuần này
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyEarnings;
