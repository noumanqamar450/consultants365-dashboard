import React, { useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from 'react-chartjs-2';
import { chartData } from '../libs/apis';
import Skeleton from 'react-loading-skeleton';

Chart.register(CategoryScale);

export default function ChartReport() {
  const [data, setData] = useState(null)
  const [chartReport, setChartReport] = useState({})

  //fetch data
  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    const res = await chartData();
    setData(res);
    setChartReport({
      labels: Object.keys(res.user),
      datasets: [
        {
          label: "Users",
          data: Object.values(res.user),
        },
        {
          label: "Conversation",
          data: Object.values(res.chat),
        }
      ]
    })
  }

  if (!data) {
    return (
      <div className='shadow-sm p-4 bg-body-tertiary rounded-4'>
        <h2 className='m-0'><Skeleton style={{ height: '50vh' }} className='rounded-3'/></h2>
      </div>
    )
  }

  return (
    <div className='shadow-sm p-4 rounded-4 bg-body-tertiary'>
      <h3 className='text-center mb-3'>Last 30 Days Report</h3>
      <Line
        data={chartReport}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Last 30 days report"
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  )
}
