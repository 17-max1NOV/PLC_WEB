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
    const [titel,setTitel]=useState('7day');
    const [arr,setArr]=useState(null);
    useEffect(()=>{
        callAPI();
    },[value])
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === '7day') {
            setTitelStatichcal('7 ngày gần nhất');
            setValue('7day');
        } else if (selectedValue === 'weeknow') {
            setTitelStatichcal('Tuần này ');
            setValue('weeknow')
        } else if (selectedValue === 'lastweek') {
            setTitelStatichcal('6 tháng gần nhất');
            setValue('7day')
        } else if (selectedValue === 'lastweek') {
            setTitelStatichcal('Tuần trước');
            setValue('7day')
        } else if (selectedValue === '7week') {
            setTitelStatichcal('7 tuần gần nhất');
            setValue('7week');
            setTitel('week')
        }
        else if (selectedValue === '6month') {
            setTitelStatichcal('6 tháng gần nhất');
            setValue('6month');
            setTitel('month')
        }
        callAPI();
    };

    const callAPI =()=>{
        const data={
            value:value,
            titel:titel
        }
        APILink.post(`statistical/staticical-plan-Reality`,data)
        .then((response) => {
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
    console.log(value)
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
        colors: ["#ff6c60","#FCB322"],
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
            name: 'Thực tế',
            data: arr ? arr.arrReality : [],
        },
        {
            name: 'Kế hoạch',
            data: arr ? arr.arrPlan : [],
        },
    ];

    return (

        <DashboardCard title={`Biểu đồ so sánh thực tế với kế hoạch ${titelStatical}`} action={
                    <Select
                        labelId="month-dd"
                        id="month-dd"
                        value={value} 
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
