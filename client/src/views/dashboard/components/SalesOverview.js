import React,{useState,useEffect} from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import APILink from "../../../service/APILink";
import { toast } from 'react-toastify';

const SalesOverview = () => {

    // select
    const [month, setMonth] = React.useState('1');
    const [titelStatical,setTitelStatichcal]=useState('7 ngày gần nhât');
    const [value,setValue]=useState('7day');
    const [arr,setArr]=useState(null);
    useEffect(()=>{
        callAPI();
    },[])
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === '7day') {
            setTitelStatichcal('7 ngày gần nhất');
            setValue('7day')
        } else if (selectedValue === '7week') {
            setTitelStatichcal('7 tuần gần nhất');
        } else if (selectedValue === '6month') {
            setTitelStatichcal('6 tháng gần nhất');
        } else if (selectedValue === 'lastweek') {
            setTitelStatichcal('Tuần trước');
        } else if (selectedValue === 'weeknow') {
            setTitelStatichcal('Tuần này');
        }
        callAPI();
    };

    const callAPI =()=>{
        const data={
            value:value
        }
        console.log(data)
        APILink.post(`statistical/staticical`,data)
        .then((response) => {
            console.log(response.data)
        if (response.data.status === "success") {
            setArr(response.data.result)
        }else{
        toast.error(response.data.mess)
        }
        })
        .catch((error) => {
        console.error(error);
        });
    }

    const theme = useTheme();
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: ["#ff6c60","#FCB322","#5D87FF"],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories:arr ? arr.arrTime : [],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart = [
        {
            name: 'Sản phẩm 1',
            data: arr ? arr.arrsp1 : [],
        },
        {
            name: 'Sản phẩm 2',
            data: arr ? arr.arrsp2 : [],
        },
        {
            name: 'Sản phẩm 3',
            data: arr ? arr.arrsp3 : [],
        },
    ];

    return (

        <DashboardCard title={`Biểu đồ sản phẩm ${titelStatical}`} action={
                    <Select
                        labelId="month-dd"
                        id="month-dd"
                        value={titelStatical} 
                        size="small"
                        onChange={handleChange}
                    >
                <MenuItem value={`7day`} >7 ngày gấn nhất</MenuItem>
                <MenuItem value={`weeknow`} >Tuần này</MenuItem>
                <MenuItem value={`lastweek`} >Tuần trước</MenuItem>
                <MenuItem value={`7week`}>7 tuần gần nhất</MenuItem>
                <MenuItem value={`6month`}>6 tháng gần nhất</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default SalesOverview;
