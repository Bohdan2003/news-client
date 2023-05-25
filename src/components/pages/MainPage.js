import { lazy, Suspense, useEffect, useState, useCallback } from "react";

import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Stat } from "../stat/Stat";
import { Slider } from "../slider/Slider";
import { AllNews } from "../allNews/AllNews";
import { Editorial } from "../editorial/Editorial";
import { Video } from "../video/Video";
import { Section } from "../section/Section";
import { Promotion } from "../promotion/Promotion";
import { checkIsMatchesWidth } from "../../utils/helpers";

import './mainPage.scss';

const Regions = lazy(() => import("../regions/Regions"));
const RegionsSwiper = lazy(() => import("../regions/RegionsSwiper"));
const Columns = lazy(() => import("../columns/Columns"));
const ColumnsSwiper = lazy(() => import("../columns/ColumnsSwiper"));

const MainPage = () => {
    const [regionsTriger, setRegionsTriger] = useState(false);
    const [columnsTriger, setColumnsTriger] = useState(false);
    
    const compare = useCallback(() => {
        setRegionsTriger(checkIsMatchesWidth(1200));
        setColumnsTriger(checkIsMatchesWidth(1200));
    }, []);
    
    useEffect(() => {
        compare();
    }, [compare]);

    useEffect(() => {
        window.addEventListener('resize', compare);
        return () => {
            window.removeEventListener('resize', compare);
        }
    }, [compare]);
   
    return (
        <>
            <Header/>
            <Stat/>
                <main className="main">
                    <h1 className="title-hidden">Новини</h1>
                    <Slider/>
                    <div className="news">
                        <div className="container">
                            <div className="news__inner">
                                <AllNews/>
                                <div className="news__box">
                                    <Editorial/>
                                    <Suspense fallback={<span>loading...</span>}>
                                        {regionsTriger ? <RegionsSwiper/> : <Regions/>}
                                    </Suspense>                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <Video/>
                    <div className="news-bottom">
                        <div className="container">
                            <div className="news-bottom__inner">
                                <Suspense fallback={<span>loading...</span>}>
                                    {columnsTriger ? <ColumnsSwiper/> : <Columns/>} 
                                </Suspense>   
                                <div className="news-bottom__box">
                                    <Section id={'6433e37171fa1b52b9b686ff'}/>
                                    <Promotion/>
                                    <Section id={'6433e37e9e939371fa191c23'}/>
                                    <Section id={'6434073999aa63858819c2a7'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            <Footer/>
        </>
    )
}

export default MainPage