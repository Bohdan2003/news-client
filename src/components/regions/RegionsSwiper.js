import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { useGetNewsRegionsQuery } from '../../api/apiSlice';

import { SkeletonRegionsColumn } from './SkeletonRegions';
import { RegionsColumn } from './RegionsColumn';
import { Error } from "../error/Error";

import './regions.scss';

const RegionsSwiper = () => {
    const { 
        data = [],
        isLoading,
        isError
    } = useGetNewsRegionsQuery()

    const setContent = () => {       
        if(isLoading) return <SkeletonRegionsColumn/>;
        if(isError) return <Error/>;

        return (
            <Swiper
                className='regions__items'
                modules={[ Pagination ]}
                pagination={{ 
                    clickable: true,
                    renderBullet: (i, className) => {
                        return `<span class="${className}"> 
                                    ${data[i].title}
                                </span>`;
                    },
                    el: '.regions__paginations'
                 }}
                spaceBetween={15}
                slidesPerView={1}
            >   
                {data.map(({title, articles, _id}) => (
                    <SwiperSlide key={_id}>
                        <RegionsColumn title={title} articles={articles}/>  
                    </SwiperSlide>
                ))} 
            </Swiper>
        )
    }

    const content = setContent()

    return (
        <section className="regions regions-swiper">
            <div className="regions__box">
                <h2 className="regions__title">Регіони</h2>
                <a  className="regions__link" href="#">Всі новини розділу</a>
            </div>
            <div className="regions__paginations"></div>
            {content}
        </section>
    )
}

export default RegionsSwiper;