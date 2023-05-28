import { useState, memo } from 'react';
import { useGetNewsSectionQuery } from "../../api/apiSlice";

import { Tile } from '../tile/Tile';
import { ListItem } from '../listItem/ListItem';
import { Error } from "../error/Error";
import { SkeletonSection } from './SkeletonSection';

import './section.scss'

const MemoListItem = memo(({className, date, descr}) => 
    <ListItem 
        className={className} 
        date={date} 
        descr={descr}
    />
);

const MemoTile = memo(({imgURL, date, descr}) => 
    <Tile 
        imgURL={imgURL}
        date={date}
        descr={descr}
    />
);

const FilterBtns = ({filter, setFilter}) => {
    return (
        <div className="section__filter">
            <button 
                className={`section__filter-btn ${filter === 'tiles' ? 'section__filter-btn--active' : ''}`}
                onClick={() => {
                    setFilter('tiles')
                }}
                >Новини</button>
            <button 
                className={`section__filter-btn ${filter === 'list' ? 'section__filter-btn--active' : ''}`}
                onClick={() => {
                    setFilter('list')
                }}
                >Статті</button>
        </div>
    )
}

const Tiles = ({filter, news}) => {
    return (
        <div className={`section__content-box ${filter !== "tiles" ? "hidden" : ""}`}>
            <ul className="section__items">
                {
                    news.map(({_id, ...props}) => 
                        <MemoTile {...props} key={_id}/>
                    )
                }
            </ul>
            <a className="section__link-more" href='#'>
                Більше
            </a>
        </div>
    )
}

const List = ({filter, news}) => {
    return (
        <div className={`list ${filter !== "list" ? "hidden" : ""}`}>
            <div className="list__title">
                Новини розділу
            </div>
            <ul className="list__items">
              {
                news.map(({_id, ...props}) => 
                    <MemoListItem {...props} key={_id}/>
                )
              }
            </ul>
            <a className="section__link-more" href='#'>
                Більше
            </a>
        </div>
    )
}

export const Section = ({id}) => {

    const [ filter, setFilter] = useState("tiles");
    const { 
            data: news = {newsTile:[], newsList:[]}, 
            isLoading,
            isError
        } = useGetNewsSectionQuery(id)

    if(isError) return <section className="section"><Error/></section>
    if(isLoading) return <SkeletonSection/>

    return (
        <section className="section">          
            <div className="section__box">
                <h2 className="section__title">
                    {news.title}
                </h2>
                <a className="section__link" href="#" >
                    Всі новини розділу
                </a>
            </div>    
            <FilterBtns filter={filter} setFilter={setFilter}/>
            <div className="section__content">
                <Tiles filter={filter} news={news.newsTile}/>
                <List filter={filter} news={news.newsList}/>
            </div>       
        </section>
    )
}