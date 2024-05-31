import "./output.css"
import './App.css'
import { useState } from "react"
import { useEffect } from "react"
import PlanetDetails from "./components/planet"

function App() {
  

  return (
    <>
     <div className=" min-h-screen flex justify-center items-center">
      <div>
        <PlanetDetails/>
      </div>
     </div>
    </>
  )
}

export default App
