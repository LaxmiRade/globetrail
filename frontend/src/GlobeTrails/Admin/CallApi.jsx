import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API, authHeader } from '../api'

const useCallApi = (endpoint) => {
    const [data, setData]= useState([]);
    useEffect(() =>{
        axios.get(`${API}/${endpoint}/`, authHeader())
        .then(res => setData(res.data))
        .catch( err => console.log(err))
    },[endpoint])
  return data 
}

export default useCallApi