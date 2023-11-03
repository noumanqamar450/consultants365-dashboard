import React from 'react'
import TableCom from './TableCom'
import { Link } from 'react-router-dom'
import { BsEye } from 'react-icons/bs'

export default function NewEntries({ report }) {
    return (
        <div className="row">
            <div className="col-md-6">
                <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                    <h4 className='mb-3 text-center'>New User</h4>
                    <TableCom>
                        {
                            report?.chatUserTopEntries?.map((u) => (
                                <tr key={u.id}>
                                    <td><span className="badge rounded-pill text-bg-dark">New</span></td>
                                    <td className='text-start'>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <Link to={`/user/${u.uniqId}`} className={`btn-sm text-danger`}><BsEye /></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </TableCom>
                </div>
            </div>
            <div className="col-md-6">
                <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                    <h4 className='mb-3 text-center'>Latest Conversation</h4>
                    <TableCom>
                        {
                            report?.chatTopEntries?.map((c) => (
                                <tr key={c.id}>
                                    <td><span className="badge rounded-pill text-bg-dark">New</span></td>
                                    <td className='text-start'>{c.chatId}</td>
                                    <td>
                                        <Link to={`/chat/${c.chatId}`} className={`btn-sm text-danger`}><BsEye /></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </TableCom>
                </div>
            </div>
        </div>
    )
}
