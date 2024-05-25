import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {

  const [posts, setPosts] = useState({});

  const URLPrincipal = 'http://localhost:5000/extras';

  function getProveedores(){
    fetch(URLPrincipal)
       .then((response) => response.json())
       .then((data) => {
          setPosts(data.data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }

  useEffect(() => {
    getProveedores();
 }, []);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                <CCard className="  py-5" >
                <CCardBody className="text-center">
                <img src="src/assets/images/avatars/logo.png" />  
                <p className="text-body-secondary">Pantalla de sesion {posts.bienvenida}</p>
                    <CRow>
                      <CCol xs={6}  className="center">
                      <Link to="/Panel">
                        <CButton   color="primary" className=" center">
                          Continuar
                        </CButton>
                        </Link>
                      </CCol>
                    </CRow>             
                </CCardBody>
              </CCard>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
