import React from 'react'
import Header from '../../components/layouts/Header'
import OwnerDashboard from '../../components/owner/OwnerDashboard' 

function OwnerHomePage() {
  return (
    <>
        <Header isLoggedIn={true} />
        <OwnerDashboard/>
      
    </>
  )

}
export default OwnerHomePage