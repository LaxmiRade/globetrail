import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import Navbar from "./GlobeTrails/Navbar"
import Footer from "./GlobeTrails/Footer"

import './App.css'
import Routing from "./GlobeTrails/Routing"
import ManagePackages from "./GlobeTrails/Admin/ManagePackages"
import { createContext, useEffect, useState } from "react"
import MemoExample from "./Components/Hooks/MemoExample"
import RefExample from "./Components/Hooks/RefExample"
import ShirtsContainer from "./Redux/ShirtsContainer"
import { Provider } from "react-redux"
import { store } from "./Redux/Store"

 export const loginData = createContext()

// Restore the logged-in user after a page refresh
const savedLogin = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && localStorage.getItem("access")) return {status:true, user}
  } catch (e) {}
  return {status:false, user:null}
}

function App() {
  const [login , setLogin]=useState(savedLogin)

  useEffect(() => {
    if (login.status) {
      localStorage.setItem("user", JSON.stringify(login.user))
    } else {
      localStorage.removeItem("user")
      localStorage.removeItem("access")
    }
  }, [login])
  return (
    <>
    <loginData.Provider value={[login , setLogin]}>
       <Navbar />
      <Routing />
      <Footer />
    </loginData.Provider>
    {/* <Provider store={store}>
    <ShirtsContainer/>
    </Provider> */}
    </>
  )
}

export default App
