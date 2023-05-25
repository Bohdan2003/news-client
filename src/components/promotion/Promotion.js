import { memo } from 'react';
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { transformDate } from '../../utils/helpers';
import { useGetPromotionQuery } from '../../api/apiSlice';

import { IMAGE_URL } from "../../keys";
import { Error } from "../error/Error";
import { SkeletonPromotion } from './SkeletonPromotion';

import 'swiper/css';
import './promotion.scss';

const MemoSwiperSlideContent = memo(({descr, date}) => {
    return (  
        <>
            <div className="promotion__item-date">
                {transformDate(date)}
            </div>
            <a className="promotion__descrlink" href="#" >
                {descr}
            </a>
        </> 
    )
})

const Promotion = () => { 
    const { 
        data = [{}], 
        isLoading,
        isError 
    } = useGetPromotionQuery();

    const {imgURL = "", date = "", descr = "", items = []} = data[0];

    if(isLoading) return <SkeletonPromotion/>

    const setContent = () => {
        if(isError) return <section className="promotion"><Error/></section>

        return (
            <>
                <div className="promotion__content">
                    <a className="promotion__imglink" href='#'>
                        <img src={IMAGE_URL + imgURL} alt="Фото для реклами"/>
                    </a>
                    <div className="promotion__box">
                        <div className="promotion__date">
                            {transformDate(date)}
                        </div>
                        <div className="promotion__text">
                            <a className="promotion__textlink" href='#'>
                                {descr}
                            </a>
                        </div>
                    </div>
                </div>
                <Swiper className="promotion__items" 
                    modules={[Navigation, FreeMode]}
                    navigation={{
                        prevEl: '.swiper-prev__wrapper',
                        nextEl: '.swiper-next__wrapper',
                    }}
                    breakpoints={{
                        0:{
                            slidesPerView: 1.08,
                            spaceBetween: 25,
                        },
                        500:{
                            slidesPerView: 2.1,
                            spaceBetween: 25,
                        },
                        800:{
                            slidesPerView: 2.5,
                            spaceBetween: 30
                        },
                        1200:{
                            slidesPerView: 2.5,
                            spaceBetween: 30,
                        }
                    }}
                >
                    {
                        items.map(({date, descr, _id}) => 
                            <SwiperSlide key={ _id} className="promotion__item">
                               <MemoSwiperSlideContent date={date} descr={descr}/>
                            </SwiperSlide>
                        )
                    }
                    <div className="swiper-next__wrapper">
                        <button className="swiper-next"><span></span></button>
                    </div>
                    <div className="swiper-prev__wrapper">
                        <button className="swiper-prev"><span></span></button>
                    </div>
                </Swiper>
            </>
        )
    }

    const content = setContent()
    
    return(
        <div className="promotion">
            <div className="promotion__top">
                <div className="promotion__title">
                    Промо
                </div>
                <a className="promotion__morelink" href="#">
                    Всі матеріали
                </a>    
            </div>
            { content }
        </div>
    )
}

export { Promotion };