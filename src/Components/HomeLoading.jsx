import React from 'react'
import { Container } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import Layout from '../Layout'

export default function Loading() {
    return (
        <Layout>
            <Container className='py-5 mt-5'>
                <div className='shadow-sm p-4 bg-body-tertiary rounded-4'>
                    <h2 className='m-0'><Skeleton style={{ height: '50vh' }} className='rounded-3'/></h2>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                            <h2 className='m-0'><Skeleton style={{ height: '40px' }} /></h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                            <h2 className='m-0'><Skeleton style={{ height: '40px' }} /></h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                            <h2 className='m-0'><Skeleton style={{ height: '300px' }} className='rounded-3'/></h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                            <h2 className='m-0'><Skeleton style={{ height: '300px' }} className='rounded-3'/></h2>
                        </div>
                    </div>
                </div>

            </Container>
        </Layout>
    )
}
