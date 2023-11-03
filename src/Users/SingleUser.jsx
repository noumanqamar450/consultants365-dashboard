import React, { useEffect, useState } from 'react'
import TableCom from '../Components/TableCom'
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsEye, BsTrash3, BsXLg } from "react-icons/bs";
import swal from 'sweetalert';
import { deleteUser, getOneUser } from '../libs/apis'
import Loading from '../Components/Loading';
import Layout from "../Layout"

export default function SingleUser() {
    const [user, setUser] = useState(null)
    let { id } = useParams();
    let navigate = useNavigate()

    // Fetch User Data
    useEffect(() => {
        fetchUser(id)
    }, [id])

    const fetchUser = async (id) => {
        setUser(await getOneUser(id));
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
          const res = await deleteUser(id);
          if(res.status === 'success') {
            swal("Deleted!", res.message, "success").then((value) => {
              navigate(-1)
            });
          } else {
            swal("Deleted!", res.message, "error")
          }
        }
      }

    if (!user) {
        return <Loading />
    }

    return (
        <Layout>
            <Container className='py-5 mt-5'>
                {/* Page Header */}
                <div className='shadow-sm p-4 bg-body-tertiary rounded-4 d-flex justify-content-sm-between justify-content-center flex-column flex-sm-row gap-3'>
                    <h2 className='m-0'>User: {user.data.name}</h2>
                    <div className='d-flex gap-3'>
                        <button className='btn btn-dark' onClick={_=> navigate(-1)}>Go Back</button>
                        <button className='btn btn-danger' onClick={_=>deleteHandler(id)}><BsTrash3/> Delete</button>
                    </div>
                </div>

                <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4'>
                    <h4 className='mb-4 text-center'>User Info</h4>
                    <TableCom>
                        <tr>
                            <th>Name</th>
                            <td>{user.data.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{user.data.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{user.data.phone !== 'undefined' ? user.data.phone : '-'}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{user.data.createdAt}</td>
                        </tr>
                    </TableCom>
                </div>

                {/* Records */}
                <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4'>
                    <h4 className='mb-4 text-center'>User Conversation</h4>
                    <TableCom heading={['User Name', 'Chat ID', 'Created At', 'Action']}>
                        { 
                            user.data.chats.length > 0 ? (
                                user.data.chats.map(c => (
                                    <tr key={c.id}>
                                        <td>{user.data.name}</td>
                                        <td>{c.chatId}</td>
                                        <td>{c.createdAt}</td>
                                        <td>
                                            <div className='d-flex gap-4 justify-content-center'>
                                                <Link to={`/chat/${c.chatId}`} className=" btn-sm text-danger"><BsEye /></Link>
                                                <button onClick={deleteHandler} className="btn btn-sm text-danger p-0"><BsXLg /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No more conversation</td>
                                </tr>
                            )
                        }
                    </TableCom>
                </div>
            </Container>
        </Layout>
    )
}
