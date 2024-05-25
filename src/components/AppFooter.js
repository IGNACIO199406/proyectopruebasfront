import React, { useState, useEffect } from 'react';
import { CFooter } from '@coreui/react'

const AppFooter = () => {
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
    <CFooter className="px-4">
      <div>
      <span className="ms-1">&copy; {posts.vaplicacion}</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
