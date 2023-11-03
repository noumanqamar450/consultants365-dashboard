import React from 'react'

export default function LoadSpinner({active}) {
  return (
    <div className={`${active ? 'd-flex' : 'd-none'} position-absolute top-0 start-0 bg-secondary bg-opacity-25 z-1 w-100 h-100 justify-content-center align-items-center`}>
        <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}
