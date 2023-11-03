import React from 'react'
import { RiFolderUserFill } from "react-icons/ri";
import { BsChatRightDotsFill } from "react-icons/bs";

export default function TotalReport({report}) {
  return (
    <div className="row">
        <div className="col-md-6">
            <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                <h3 className='m-0'>Total User: {report.chatUserCount}<RiFolderUserFill className='float-end fs-1'/></h3>
            </div>
        </div>
        <div className="col-md-6">
            <div className='shadow-sm p-4 rounded-4 bg-body-tertiary mt-5'>
                <h3 className='m-0'>Total Conversation: {report.chatCount} <BsChatRightDotsFill className='float-end fs-1'/></h3>
            </div>
        </div>
    </div>
  )
}
