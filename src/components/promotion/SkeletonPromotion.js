import "./skeletonPromotion.scss"

export const SkeletonPromotion = () => {
    return (
        <div className="promotion">
            <div className="skeleton-promotion__top">
                <div className="skeleton-promotion__title"></div>
                <div className="skeleton-promotion__link"></div>
            </div>
            <div className="skeleton-promotion__content">
                <div className="skeleton-promotion__img"></div>
                <div className="skeleton-promotion__box">
                    <div className="skeleton-promotion__date"></div>
                    <div className="skeleton-promotion__text"></div>
                </div>
            </div>
            <div className="skeleton-promotion__items">
                <div className="skeleton-promotion__item"></div>
                <div className="skeleton-promotion__item"></div>
                <div className="skeleton-promotion__item"></div>
            </div>
        </div>
        
    )
}