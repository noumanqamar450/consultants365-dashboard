import React from 'react'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import TableCom from './TableCom'
import Layout from '../Layout'

export default function Loading() {
  return (
    <Layout>
        <Container className='py-5 mt-5'>
            <div className='shadow-sm p-4 bg-body-tertiary rounded-4 d-flex justify-content-sm-between justify-content-center flex-column flex-sm-row gap-3'>
                <h2 className='m-0'><Skeleton style={{width:'150px'}}/></h2>
                <h2 className='m-0'><Skeleton style={{width:'150px'}}/></h2>
            </div>

            <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4 d-flex justify-content-sm-between justify-content-center flex-column flex-sm-row gap-3'>
                <TableCom caption={<Skeleton style={{width:'80px'}}/>}>
                    <tr>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                    </tr>
                    <tr>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                    </tr>
                    <tr>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                        <td><Skeleton style={{width:'100px'}}/></td>
                    </tr>
                </TableCom>
            </div>
            
        </Container>
    </Layout>
  )
}
