import "./skeletonSlider.scss"

export const SkeletonSlider = () => {

    return (
        <div className="skeleton-slider">
           <div className="container">
                <div className="skeleton-slider__title"></div>
                <div className="skeleton-slider__subtitle"></div>
                <div className="skeleton-slider__items">
                    <div className="skeleton-slider__item"></div>
                    <div className="skeleton-slider__item"></div>
                    <div className="skeleton-slider__item"></div>
                    <div className="skeleton-slider__item"></div>
                </div>
           </div>
        </div>
    )
}