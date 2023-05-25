import { useCallback, useEffect, useRef } from 'react';
import './drag.scss';

export const Drag = (props) => {   
    const mouseX = useRef(0);

    const dragRef = useRef(null);
    const dragContainerRef = useRef(null);
    
    const dragStartPositionRef = useRef(null);
    const startCursorOffsetX = useRef(null);
    let isDragAvailableRef = useRef(null);

    const setPosition = (left) => {
        const dragStyle = dragRef.current.style;

        dragStartPositionRef.current = null;
        dragStyle.transition = "all .5s";
        dragStyle.pointerEvents = "none";
        dragStyle.left = `${left}px` ;
        setTimeout(()=>{
            dragStyle.transition = "none";
            dragStyle.pointerEvents = "auto";
        }, 500)
    };

    const setCompareWidth = () => {
        isDragAvailableRef.current = dragContainerRef.current.offsetWidth < props.width;
        setPosition(0);
    } 
    
    useEffect(() => {
        setCompareWidth();
        window.addEventListener("resize", setCompareWidth);
        return () => {
            window.removeEventListener("resize", setCompareWidth);
        }
    }, []);

    const handleTouchmove = useCallback((e) => {
        const dragStyle = dragRef.current.style;
        dragRef.current.firstElementChild.style.pointerEvents = "none";
        dragStyle.left = dragStartPositionRef.current + parseFloat(e.changedTouches[0].screenX, 2) - startCursorOffsetX.current + 'px'; 
    }, []);

    const handleMousemove = useCallback((e) => {
        const dragStyle = dragRef.current.style;
        dragRef.current.firstElementChild.style.pointerEvents = "none";
        dragStyle.left = dragStartPositionRef.current + e.pageX - startCursorOffsetX.current + 'px'
    }, []);

    const handleRange = () => {
        const dragStyle = dragRef.current.style;
        const dragContainerWidth = dragContainerRef.current.offsetWidth;
        const dragWidth = dragRef.current.offsetWidth;

        const dragPosition = parseInt(dragStyle.left);  
        if(dragPosition > 0){
            setPosition(0);
        } 
        else if(dragWidth + dragPosition < dragContainerWidth){
            setPosition(dragContainerWidth - dragWidth);
        }   
    }

    const unsubscribHandleTouchmove = (e) => {
        dragRef.current.firstElementChild.style.pointerEvents = "auto";

        if(isDragAvailableRef.current){
            dragStartPositionRef.current = null;
            window.removeEventListener("touchmove", handleTouchmove);  
            handleRange(e);
        }
    }

    const unsubscribHandleMousemove = (e) => {
        dragRef.current.firstElementChild.style.pointerEvents = "auto";

        if(isDragAvailableRef.current){
            dragStartPositionRef.current = null;
            window.removeEventListener("mousemove", handleMousemove);  
            handleRange(e);
        }
    }

    const isClick = () => !('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0)
       
    return (
        <div className="drag-container" style={{position: 'relative'}} ref={dragContainerRef}>
            <div 
                className="drag" 
                ref={dragRef}
                style={{top:`${0}px`, left:`${mouseX.current}px`, minWidth: props.width}}
                onTouchStart={(e)=>{ 
                    if(isDragAvailableRef.current){
                        dragStartPositionRef.current = parseFloat(dragRef.current.style.left, 2);
                        startCursorOffsetX.current = parseFloat(e.changedTouches[0].screenX, 2);
                        window.addEventListener("touchmove", handleTouchmove);                 
                    }  
                }}
                onTouchEnd={unsubscribHandleTouchmove}
                onMouseDown={(e)=>{  
                    if(isDragAvailableRef.current && isClick()){    
                        dragStartPositionRef.current = parseFloat(e.currentTarget.style.left);
                        startCursorOffsetX.current = parseFloat(e.pageX, 2);
                        window.addEventListener("mousemove", handleMousemove);                          
                    }  
                }}
                onMouseUp={unsubscribHandleMousemove}
                onMouseLeave={unsubscribHandleMousemove}
            >{props.children}</div> 
        </div>
    )
}