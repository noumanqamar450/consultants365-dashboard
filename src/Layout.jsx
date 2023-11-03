import React, { useContext, useEffect } from 'react'
import Header from './Components/Header'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/Auth/AuthContext';

export default function Layout({ children }) {
    const { token } = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
      if (!token.status) {
          return navigate('/login')
      }
    
    }, [token, navigate])
    

    return (
        <>
            <Header />
            {children}
        </>
    )

}
