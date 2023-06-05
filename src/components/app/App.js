import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LoadingPage } from "../loadingPage/LoadingPage";


const MainPage = lazy(() => import('../pages/MainPage'))
const AdminPage = lazy(() => import('../pages/AdminPage'))

const App = () => {

    return (
        <Suspense fallback={<LoadingPage/>}>
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