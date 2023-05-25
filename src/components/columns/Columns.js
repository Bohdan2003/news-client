import { memo, useState } from "react";
import { useGetNewsColumnsQuery } from "../../api/apiSlice";
import { transformDate } from "../../utils/helpers" ;
import { AVATAR_URL } from "../../keys";

import { SkeletonColumns } from "./SkeletonColumns";
import { Error } from "../error/Error";

import './columns.scss';

const MemoNewsNolumnsItem = memo(({personName, personVocation, descr, imgURL, date}) => {
    return (
        <li className="columns__item">   
            <blockquote className="columns__item-content">
                <div className="columns__item-box">
                    <a className="columns__imglink" href="#">
                        <img className="columns__img" src={AVATAR_URL + imgURL} alt="Фото кориспондента" />
                    </a>
                    <div>        
                        <cite> <a className="columns__name" href="#">{personName}</a> </cite>  
                        <div className="columns__vocation"> 
                            {personVocation}
                        </div>
                    </div>
                </div>  
                <a className="columns__descr" href="#">
                    {descr}
                </a>                                          
                <div className="columns__date">
                    <time dateTime={date.slice(0,10)}>{transformDate(date)}</time>
                </div>
            </blockquote> 
        </li>
    )
})

const Columns = () => {
    const { data = [], isLoading, isError } = useGetNewsColumnsQuery();

    const setContent = () => {
        if(isError) return <Error/>
        if(isLoading) return <SkeletonColumns/>

        return (
            <ul className="columns__items">
                {data.map(({_id,...props}) => 
                    <MemoNewsNolumnsItem {...props} key={_id}/>
                )}
            </ul> 
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

            <a href="#" className="columns__link-btn">Всі колонки</a>
        </section>
    )
}

export default Columns