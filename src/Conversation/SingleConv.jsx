import React, { useEffect, useState } from 'react'
import TableCom from '../Components/TableCom'
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { BsClock, BsTrash3 } from "react-icons/bs";
import swal from 'sweetalert';
import { deleteChat, getOneChat } from '../libs/apis'
import Loading from '../Components/Loading';
import './Style.css'
import Layout from '../Layout'

export default function SingleConv() {
    const [conv, setConv] = useState(null)
    const [stickyBar, setStickyBar] = useState(false)
    let { id } = useParams();
    let navigate = useNavigate()

    // Fetch User Data
    useEffect(() => {
        fetchUser(id)
    }, [id])

    const fetchUser = async (id) => {
        setConv(await getOneChat(id));
    }

    // Delete record
    const deleteHandler = async (id) => {
        const willDelete = await swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete this record?",
          icon: "warning",
          dangerMode: true,
          buttons: [true, "Do it!"],
        });
    
        if (willDelete) {
          const res = await deleteChat(id);
          if(res.status === 'success') {
            swal("Deleted!", res.message, "success").then((value) => {
              navigate(-1)
            });
          } else {
            swal("Deleted!", res.message, "error")
          }
        }
      }

    //   Scroll Sticky bar
    const scroll = (e) => {
        const topScrollPosition = e.target.scrollTop;
        // Check if the top scroll position is greater than or equal to 10 pixels
        if (topScrollPosition >= 10) {
            setStickyBar(true)
        } else {
            setStickyBar(false)
        }
    }

    if (!conv) {
        return <Loading />
    }


    return (
        <Layout>
            <Container className='py-5 mt-5'>
                {/* Page Header */}
                <div className='shadow-sm p-4 bg-body-tertiary rounded-4 d-flex justify-content-sm-between justify-content-center flex-column flex-sm-row gap-3'>
                    <h2 className='m-0'>User: {conv.user ? conv.user.name : 'Not Found'}</h2>
                    <div className='d-flex gap-3'>
                        <button className='btn btn-dark' onClick={_=> navigate(-1)}>Go Back</button>
                        <button className='btn btn-danger' onClick={_=>deleteHandler(id)}><BsTrash3/> Delete</button>
                    </div>
                </div>

                <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4'>
                    {
                        conv.user ? (
                            <>
                                <h4 className='mb-4 text-center'>User Info</h4>
                                <TableCom>
                                    <tr>
                                        <th>Name</th>
                                        <td>{conv.user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{conv.user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{conv.user.phone !== 'undefined' ? conv.user.phone : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Created At</th>
                                        <td>{conv.user.createdAt}</td>
                                    </tr>
                                </TableCom>
                            </>
                        ) : (
                            <h4>User not found</h4>
                        )
                    }
                </div>

                {/* Records */}
                <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4'>
                    {
                        conv.chats.length > 0 ? (
                            <>
                                <h4 className='mb-4 text-center'>User Conversation</h4>
                                <div className='w-100 bg-white p-4 rounded-3 overflow-auto position-relative' style={{maxHeight: '800px'}} onScroll={scroll}>
                                    <div className={`position-sticky top-0 bg-white bg-opacity-25 rounded-3 p-2 ${stickyBar && 'shadow'} mb-5 user-sticky-bar`}>
                                        <h3 className='fs-4'>{conv.user.name}</h3>
                                        <span>Conversation Start from {conv.user.createdAt}</span>
                                    </div>
                                    { 
                                        conv.chats.length > 0 ? (
                                            conv.chats.map(c => (
                                                <div key={c.id} className={`w-100 d-flex ${c.role === 'user' && 'justify-content-end'}`}>
                                                    <div className={`chat chat-${c.role}`}>
                                                        <p>{c.message}</p>
                                                        <span style={c.role === 'user' ? { justifyContent: 'end'}: { justifyContent: 'start'}}><BsClock/> {c.createdAt.slice(11,19)}</span>
                                                    </div>
                                                </div>

                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No more conversation</td>
                                            </tr>
                                        )
                                    }
                                </div>
                            </>
                        ) : (
                            <h4>Conversation not found</h4>
                        )
                    }
                </div>
            </Container>
        </Layout>
    )
}
