import { BrowserRouter, Route, Routes } from "react-router-dom";
import Recipe from "./components/recipe";
import Login from "./components/login";
import Detail from "./components/detail";

function App(){
    return (
        <div>
            <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login/>} />
          <Route path="/" element={<Recipe/>} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/recipes/:id" element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
        </div>
    )
}

export default App;