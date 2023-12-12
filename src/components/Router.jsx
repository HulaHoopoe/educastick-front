import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./screens/home/Home.jsx";
import Groups from "./screens/groups/Groups.jsx";
import Tests from "./screens/tests/Tests.jsx"

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<Home />} path='/'/>
            <Route element={<Groups />} path='/groups'/>
            <Route element={<Tests />} path='/tests'/>

            <Route path='*' element={<div>Not found</div>} />
        </Routes>
    </BrowserRouter>
};

export default Router;