import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
const Dashboard = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [rows, setPosts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const URLPrincipal = 'http://localhost:5000/proveedor';

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




 const getcreate = (() => {

  var nombre = document.getElementById("nombre").value; 
  var razonSocial = document.getElementById("razonSocial").value; 
  var direccion = document.getElementById("direccion").value; 

  if(nombre=="" || razonSocial=="" || direccion==""){
    alert("Faltan campos por llenar");
  }else{
    var prove = {
      "nombre":nombre,
      "razonSocial":razonSocial,
      "direccion":direccion
  };
    fetch(URLPrincipal, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(prove)
    })
    .then((data) => {
      handleClose();
      getProveedores();
   })
    .catch((err) => {
      console.log(err.message);
   });
  }

  console.log(nombre);


 });
 const getDelete = (() => {
  if(selectedRows.length>0){
    for (var elemento of selectedRows){
      fetch(URLPrincipal+"/id/" + elemento.id, {
        method: 'DELETE',
      })
      .then((data) => {
        getProveedores();
     })
      .catch((err) => {
        console.log(err.message);
     });
    }
  }else{
    alert("Selecione un registro");
  }


});

 const columns = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'nombre', headerName: 'Nombre', width: 300 },
  { field: 'razonSocial', headerName: 'Razon Social', width: 300 },
  { field: 'direccion', headerName: 'Direccion', width: 300 },
];
  return (
    <>
<div>

<CRow>
<CCol className="mb-4">
      <CButton onClick={handleOpen} className='m-2' color="success">Crear</CButton>

      <CButton onClick={() => getDelete()} className='m-2' color="danger">Eliminar</CButton>
  </CCol>
</CRow>
<CRow>

<CCol xs>

<CCard className="mb-4">
<DataGrid
    rows={rows}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: {
          pageSize: 5,
        },
      },
    }}
    pageSizeOptions={[5,10]}
    checkboxSelection
    onRowSelectionModelChange={(ids) => {
      const selectedIDs = new Set(ids);
      const selectedRows = rows.filter((row) =>
        selectedIDs.has(row.id)
      );
      console.log(selectedRows);
      setSelectedRows(selectedRows);
    }}
    disableRowSelectionOnClick
  />
            </CCard>
        </CCol>
      </CRow>
</div>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField
          required
          id="nombre"
          label="Nombre"
        />
        <br></br>
        <br></br>
          <TextField
          required
          id="razonSocial"
          label="Razon Social"
        />
<br></br>
<br></br>
        <TextField
          required
          id="direccion"
          label="Direccion"
        />
<br></br>
<br></br>
<CButton onClick={handleClose} className='m-2' color="danger">Cancelar</CButton>
          <CButton onClick={getcreate} className='m-2' color="success">Enviar</CButton>
        </Box>


      </Modal>
   </>


  )
}

export default Dashboard
