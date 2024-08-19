import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./components/UpdatePost"
import PostPages from "./pages/PostPage"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route  element={<PrivateRoute/>}>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPages />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App