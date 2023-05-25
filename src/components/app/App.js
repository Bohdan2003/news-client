import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Loading } from "../loading/Loading";


const MainPage = lazy(() => import('../pages/MainPage'))
const AdminPage = lazy(() => import('../pages/AdminPage'))

const App = () => {

    return (
        <Suspense fallback={<Loading/>}>
            <Router>
                <Routes>               
                    <Route path="/" element={<MainPage/>} />
                    {/* <Route path="/" element={<AdminPage/>} /> */}
                    <Route path="/admin" element={<AdminPage/>}/>             
                </Routes>
            </Router>    
        </Suspense>           
    )
};

export {App};