import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Footer from "./components/Footer";
function App() {
  const [data,setData]= useState(null);
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  function handleToggleModal() {
    setShowModal(!showModal);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;
        
        const today = (new Date()).toDateString();
        const localkey = `NASA-${today}`
        if(localStorage.getItem(localkey)){
          const apiData = JSON.parse(localStorage.getItem(localkey));
          setData(apiData)
          console.log('fetched from cache today')
          return
        }
        localStorage.clear()
        
        try {
          const res = await fetch(url)
          const apidata = await res.json()
          localStorage.setItem(localkey, JSON.stringify(apidata))
          setData(apidata)
          console.log('fetched from API today')
        } catch (error) {
          console.log(error.message)
        }
    }
    fetchAPIData()
  }, []);
  return (
    <>
      {data ? (<Main data={data}/>): (<div className="loadingState"><i class="fa-solid fa-gear"></i></div>)}
      {showModal && <Sidebar data={data} handleToggleModal={handleToggleModal} />}
      {data && <Footer data ={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
