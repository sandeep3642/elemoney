import React from 'react'
import SubAdmin from '../SubAdmin';
import Home from '../Home';
import FundsPage from '../Funds';
import Customers from '../Customers';
import Partners from '../Partners';

const Dashboard = ({ currentPage }) => {

  return (
    <>
      {currentPage === "home" && <Home />}
      {currentPage === "subadmin" && <SubAdmin />}
      {currentPage === "funds" && <FundsPage />}
      {currentPage === "customers" && <Customers />}
      {currentPage === "partners" && <Partners />}
    </>
  )
}

export default Dashboard