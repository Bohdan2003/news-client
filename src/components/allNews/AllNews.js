import { useState, useRef, memo } from 'react';
import { useGetNewsAllQuery } from '../../api/apiSlice';
import { TransitionGroup, Transition } from 'react-transition-group';
import { onShowTransitionGroupItem, onHiddenTransitionGroupItem } from '../../utils/helpers';

import { ListItem } from '../listItem/ListItem';
import { Error } from "../error/Error";

import './allNews.scss';

const filterBtnContent = [
    {name: "all", label: "Всі"},
    {name: "news", label: "Новини"},
    {name: "arcticles", label: "Статті"}
];

const FilterBtn = ({filter, setFilter, name, label}) => {
    return (
        <button 
            className={`all-news__filters-btn ${filter == name ? 'all-news__filters-btn--active' : ''}`}
            onClick={()=>{
                setFilter(name)
            }}
        >{label}</button>
    )
};

const MemoListItem = memo(({className, date, descr}) => 
    <ListItem 
        className={className} 
        date={date} 
        descr={descr}
    />
);

export const AllNews = () => {
    const disabledBtnRef = useRef(false);
    const listItemsRef = useRef(null);
    const firstAdditionOfElementRef = useRef(true);

    const [filter, setFilter] = useState('all');
    const [limit, setLimit] = useState(10);

    const {
        data = {news: [], length: null},
        isLoading,
        isFetching,
        isError
    } = useGetNewsAllQuery(limit);  

    const setContent = (news) => {
        if(isLoading) return null
        if(isError) return <Error/>;

        return news.map(({type, _id, ...item}) => 
            <Transition 
                in={type === filter || filter ==='all'}
                timeout={ 500 }  
                onEnter={ e => {
                    e.style.display = 'block';
                    onHiddenTransitionGroupItem(e);  
                    onShowTransitionGroupItem(e);
                    setTimeout(() => {
                        e.style.height = `auto`;
                    }, 500)
                }}
                onExit={ e => {
                    e.style.display = 'none';
                }}
                key={_id}
            >
                <MemoListItem {...item}/>
            </Transition>
        )
    }

    const content = setContent(data.news)

    return (
        <section className="all-news">
            <div className="all-news__box">
                <h3 className="all-news__title">
                    Всі новини
                </h3>
                <div className="all-news__state">
                    Архів
                </div>
            </div>
            <div className="all-news__filters">
                {
                    filterBtnContent.map((props, i) => 
                        <FilterBtn 
                            filter={filter} 
                            setFilter={setFilter}
                            key={i} 
                            {...props}
                        />
                    )
                }
            </div>
            <div className="list">   
                <TransitionGroup>  
                    <ul className="list__items" ref={listItemsRef}>   
                        {content}
                    </ul>
                </TransitionGroup>            
            </div>
            <button 
                className={`all-news__btn ${isFetching ? 'isLoading' : ''}`}
                disabled={(data.length <= 10 || isError || disabledBtnRef.current) && !isFetching}
                onClick={()=>{
                    if(window.matchMedia("(min-width: 800px)").matches && firstAdditionOfElementRef.current){
                        const listItems = listItemsRef.current;
                        listItems.style.maxHeight = `${listItems.scrollHeight - 20}px`;
                        listItems.classList.add('list__items--short');
                        firstAdditionOfElementRef.current = false;
                    }
                    if(data.length - 10 > limit){
                        setLimit(value => value + 10);
                    } else {
                        setLimit(value => value + 10);
                        disabledBtnRef.current = true;
                    }
                }}
            >Завантажити ще</button>
        </section>
    )
}