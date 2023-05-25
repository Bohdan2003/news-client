import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from "swiper";
import { transformDate } from "../../utils/helpers" ;
import { useGetNewsColumnsQuery } from "../../api/apiSlice";
import { AVATAR_URL } from "../../keys";

import { SkeletonColumns } from "./SkeletonColumns";
import { Error } from "../error/Error";

import './columns.scss'

const MemoColumnsItem = memo(({personName, personVocation, descr, imgURL, date}) => {
    return (
        <>    
            <div className="columns__item-box">
                <a className="columns__imglink" href="#">
                    <img className="columns__img" src={AVATAR_URL + imgURL} alt="Фото кориспондента"/>
                </a>
                <div>        
                    <a className="columns__name" href="#">{personName}</a>   
                    <div className="columns__vocation"> 
                        {personVocation}
                    </div>
                </div>
            </div>  
            <a className="columns__descr" href="#">
                {descr}
            </a>                                          
            <div className="columns__date">
                {transformDate(date)}                            
            </div>
        </>
    )
})

const ColumnsSwiper = () => {

    const { data = [], isLoading, isError } = useGetNewsColumnsQuery()

    const setContent = () => {
        if(isError) return <Error/>
        if(isLoading) return <SkeletonColumns/>

        return (
            <Swiper
                className="columns__items"
                freeMode
                modules={[FreeMode]}
                breakpoints={{
                    0:{
                        slidesPerView: 1.08,
                        spaceBetween: 25,
                    },
                    600:{
                        slidesPerView: 2.08,
                        spaceBetween: 25,
                    },
                    900:{
                        slidesPerView: 3.08,
                        spaceBetween: 30,
                    },
                    1200:{
                        slidesPerView: 4.08,
                        spaceBetween: 30,
                    }
                }}
            >  
                {data.map(({_id, ...props}) => 
                    <SwiperSlide className="columns__item" key={_id}>
                        <MemoColumnsItem {...props}/>
                    </SwiperSlide>
                )}
            </Swiper>
        )

    }

    const content = setContent()

    return (
        <section className="columns">
            <div className="columns__box">
                <h5 className="columns__title">
                    Колонки
                </h5>
                <a className="columns__link" href="#">
                    Всі колонки
                </a>
            </div>
                
            {content}
                    
            <button 
                className="columns__link-btn"
            >Всі колонки</button>
        </section>
    )
}

export default ColumnsSwiper