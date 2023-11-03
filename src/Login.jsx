import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { AuthContext } from './Context/Auth/AuthContext'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { login, otp } from './libs/apis';
import ToastMe from "./Components/ToastMe"
import LoadSpinner from "./Components/LoadSpinner"

let formInput = {email: '', otp: ''};
export default function Login() {
  const [show, setShow] = useState(false)
  const [alert, setAlert] = useState('')
  const { token, setToken, setAdmin } = useContext(AuthContext)
  const [formData, setFormData] = useState(formInput)
  const [otpShow, setOtpShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (token.status) {
      return navigate('/')
    }
    
  }, [token, navigate])
  
  const onShow = () => {
    setShow(false)
  }

  const emailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    let res = await login(formData.email)
    if(res.status) {
      setOtpShow(true)
      setShow(true)
      setAlert(res.message)
      setLoading(false)
    } else {
      setShow(true)
      setAlert(res.message)
      setLoading(false)
    }
  } 
  
  const otpCheck = async (e) => {
    e.preventDefault()
    setLoading(true)
    let res = await otp(formData.email, formData.otp);
    const cred = jwtDecode(res.credential);
    if(res.status) {
      setAdmin(cred)
      setToken({status: true, credential: res.credential})
      localStorage.setItem('token', res.credential)
      setFormData(formInput)
      setShow(true)
      setAlert(res.message)
      setLoading(false)
    } else {
      setShow(true)
      setAlert(res.message)
      setLoading(false)
    }
  }
  
  return (
    <div style={{background: 'url(./bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center center'}}>
      <Container>
        <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
          <div className='shadow-sm p-4 bg-body-tertiary rounded-4 text-center overflow-hidden position-relative' style={{width: '500px'}}>
            <LoadSpinner active={loading}/>
            <h4 className='mb-3'>Admin Login</h4>
            <form onSubmit={(e)=>{
              !otpShow ? emailLogin(e) : otpCheck(e);
            }}>
              <input type="email" className='form-control mb-3' onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} placeholder='Enter admin email' required/>
              {otpShow && <input type="text" className='form-control mb-3' onChange={(e) => setFormData({...formData, otp: e.target.value})} value={formData.otp} placeholder='Enter code' required/>}
              <button className='btn btn-dark w-100'>{otpShow ? 'Login' : 'Send Code'}</button>
            </form>
          </div>
        </div>
          <ToastMe text={alert} show={show} onShow={onShow}/>
      </Container>
    </div>
  )
}
