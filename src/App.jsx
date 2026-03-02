import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"; 
import authService from './appwrite/auth.js'
import {login , logout} from './store/authSlice.js'
import { Footer, Header } from "./components/index.js";

function App() {
  console.log("Jello");
  
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect( () => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((err) => null)
    .finally(() => setLoading(false))
  } , [])

  return !loading ? (
    <div className="min-h-screen flex-wrap flex content-between bg-gray-400">
      <div className="w-full block">
        <Header />
          <main>
            {/* <Outlet/> */}
          </main>
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App
