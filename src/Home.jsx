import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import ChartReport from './Components/ChartReport'
import TotalReport from './Components/TotalReport'
import HomeLoading from './Components/HomeLoading'
import { reportData } from './libs/apis'
import NewEntries from './Components/NewEntries'
import Layout from './Layout'

export default function Home() {
  const [report, setReport] = useState(null);
  
  useEffect(()=>{
    fetchReport()
  },[])
  
  const fetchReport = async () => {
    setReport(await reportData())
  }

  if(!report) {
    return <HomeLoading/>
  }
 
  return (
    <Layout>
      <Container className='py-5 mt-5'>
          <ChartReport/>
          <TotalReport report={report}/>
          <NewEntries report={report}/>
      </Container>
    </Layout>
  )
}
