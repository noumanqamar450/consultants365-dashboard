import React from 'react'
import Table from 'react-bootstrap/Table';

export default function TableCom({children, heading, caption}) {
  return (
      <Table responsive="xl w-100 rounded-3 overflow-hidden text-center px-4 py-2 bg-white">
         {caption && <caption>{caption}</caption>}
         {
          heading && (
            <thead>
              <tr>
                {
                  heading?.map((h, i)=>(
                    <th key={i}>{h}</th>
                  ))
                }
              </tr>
            </thead>
          )
         }
        <tbody>
          {children}
        </tbody>
      </Table>
  )
}
