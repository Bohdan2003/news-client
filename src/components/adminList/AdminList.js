import { memo, useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGetSLidesQuery, useChangeTheOrderOfSlidesMutation } from "../../api/apiSlice"

import { AdminListItem } from "./AdminListItem"
import { Error } from "../error/Error"
import { Loading } from "../loading/Loading"

import "./adminList.scss"

const MemoAdminListItem = memo(AdminListItem);

const compareArr = (firstArr, secondArr) => {
    if(firstArr.length === 0 || secondArr.length === 0 || secondArr.length !== firstArr.length) return true
    for(let i = 0; i < firstArr.length; i++) if(firstArr[i].index !== secondArr[i].index) return false
    return true
}

export const AdminList = () => {
    const [items, setItems] = useState([]);
    const {
        data = [],
        isLoading,
        isFetching,
        isError
    } = useGetSLidesQuery()   
    const [ changeTheOrderOfSlides ] = useChangeTheOrderOfSlidesMutation();
    
    useEffect(() => {
        if(!isFetching) setItems(data)      
    }, [isFetching])

    const listStyle = () => {
        if(isFetching && !isLoading) return {"opacity": "0.5", "pointerEvents": "none"}
    }

    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const newItems = Array.from(items)
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
  
        setItems(newItems)
    }
    
    // встановити індекс як середнє значення між попереднім і наступним слайдоами

    const setContent = () => {
        if ( isLoading )        return <Loading/>
        if ( isError )          return <Error/>;
        if ( data.length == 0 ) return <div>No slides</div>

        return items.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>  
                {(provided) => (
                    <MemoAdminListItem item={item} provided={provided}/>
                )}                
            </Draggable>                  
        ))
    }

    const content = setContent();

    return (
        <div className="admin-list">
            <form className={`admin-list__form ${compareArr(data, items) || isFetching ? 'admin-list__form--hidden' : ''}`} 
                onSubmit={e => {
                    e.preventDefault();
                    const slides = [];

                    items.forEach((item, i) => {
                        slides[i] = ({_id: item._id, index: i})
                    })

                    changeTheOrderOfSlides(slides);
                }}>
                <input 
                    className={`admin-list__btn-clear`}
                    type="button"
                    value="Відмінити"
                    onClick={() => {
                        setItems(data)         
                    }}
                />
                <button 
                    type="submit"
                    className={`admin-list__btn-submit`}
                >
                    Оновити
                </button>
            </form>
            <DragDropContext onDragEnd={handleOnDragEnd}>    
                <Droppable droppableId='admin-list__items'>
                    {(provided) => (
                        <ul className="admin-list__items" 
                            ref={provided.innerRef} 
                            style={listStyle()}
                            {...provided.droppableProps} 
                        >
                            {content}
                        </ul>
                    )}
                </Droppable>           
            </DragDropContext>
        </div>
    )
}