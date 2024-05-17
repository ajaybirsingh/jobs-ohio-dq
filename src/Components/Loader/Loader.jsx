import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "../Loader/Loader.css"
const Loader = () => {
  return (
    <div className="loader-main-div">
      <div className="loader-second-div">
        <CircularProgress />
      </div>
    </div>

  )
}
export default Loader