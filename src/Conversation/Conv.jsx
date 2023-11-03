import React, { useEffect, useState } from 'react'
import TableCom from '../Components/TableCom'
import { Container, Pagination } from "react-bootstrap";
import { Link, useSearchParams } from 'react-router-dom';
import { BsEye, BsSearch, BsXLg } from "react-icons/bs";
import swal from 'sweetalert';
import { deleteChat, getAllConversation, searchChats } from '../libs/apis'
import Loading from '../Components/Loading';
import LoadSpinner from '../Components/LoadSpinner';
import Layout from '../Layout'

export default function Conv() {
  const [conversation, setConversation] = useState(null)
  const [show, setShow] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams();

  // Fetch User Data
  useEffect(() => {
    const controller = new AbortController();
    if(searchParams.get('search')){
      searchRecord(searchParams) 
    } else {
      fetchUser(searchParams)
    }
    return () => controller.abort();
  }, [searchParams])
  
  const fetchUser = async (searchParams) => {
    let page = searchParams.get("page");
    page = page ? page : 1;
    setConversation(await getAllConversation(page));
  }
  
  // Search

  const searchHandler = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());
    if(searchParams.get("search") !== formData.search) {
      setShow(true)
      setSearchParams({ search: formData.search })
    }
  }

  const searchRecord = async (searchParams) => {
    let search = searchParams.get("search");
    const res = await searchChats(search);
    setConversation(res)
    setShow(false)
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
          fetchUser(searchParams)
        });
      } else {
        swal("Deleted!", res.message, "error")
      }
    }
  }

  if (!conversation) {
    return <Loading />
  }


  return (
    <Layout>
      <Container className='py-5 mt-5'>
        {/* Page Header */}
        <div className='shadow-sm p-4 bg-body-tertiary rounded-4 d-flex justify-content-sm-between justify-content-center flex-column flex-sm-row gap-3'>
          <h2 className='m-0'>Conversations</h2>
          <form className='d-flex gap-3' onSubmit={searchHandler}>
            <div>
              <input type="search" className="form-control" id="searchInput" name="search" placeholder='Search Conversation' required />
            </div>
            <button type="submit" className='btn btn-dark'><BsSearch /></button>
          </form>
        </div>

        {/* Records */}
        <div className='shadow-sm p-4 my-5 bg-body-tertiary rounded-4 position-relative overflow-hidden'>
          <LoadSpinner active={show} />
          <TableCom heading={['User Name', 'User Email', 'Chat ID', 'Created At', 'Action']} caption={`Total Record: ${conversation.total}`}>
            {
              conversation.data.length > 0 ? (
                conversation.data.map((c) => (
                  <tr key={c.id}>
                    <td>{c.user?.name}</td>
                    <td>{c.user?.email}</td>
                    <td>{c.chatId}</td>
                    <td>{c.createdAt}</td>
                    <td>
                      <div className='d-flex gap-4 justify-content-center'>
                        <Link to={`/chat/${c.chatId}`} className={`btn-sm text-danger`}><BsEye /></Link>
                        <button onClick={_ => deleteHandler(c.chatId)} className="btn btn-sm text-danger p-0"><BsXLg /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No more users</td>
                </tr>
              )
            }
          </TableCom>

          {
            conversation.pagination && (
              <Pagination className='justify-content-center mt-4'>

                {conversation.pagination.prev < conversation.pagination.page && (
                  <>
                    <Pagination.First onClick={_ => setSearchParams({ page: conversation.pagination.first })} />
                    <Pagination.Prev onClick={_ => setSearchParams({ page: conversation.pagination.prev })} />
                    <Pagination.Item onClick={_ => setSearchParams({ page: conversation.pagination.prev })}>{conversation.pagination.prev}</Pagination.Item>
                  </>
                )}
                <Pagination.Item active>{conversation.pagination.page}</Pagination.Item>
                {conversation.pagination.page < conversation.pagination.last && (
                  <>
                    <Pagination.Item onClick={_ => setSearchParams({ page: conversation.pagination.next })}>{conversation.pagination.next}</Pagination.Item>
                    <Pagination.Next onClick={_ => setSearchParams({ page: conversation.pagination.next })} />
                    <Pagination.Last onClick={_ => setSearchParams({ page: conversation.pagination.last })} />
                  </>
                )}

              </Pagination>
            )
          }
        </div>
      </Container>
    </Layout>
  )
}
