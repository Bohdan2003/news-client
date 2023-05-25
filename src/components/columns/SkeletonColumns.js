import './skeletonColumns.scss'

const SkeletonColumnsItem = () => {
    return (
        <li className="skeleton-columns__item">
            <div className="skeleton-columns__top">
                <div className="skeleton-columns__img"></div>
                <div className="skeleton-columns__box">
                    <div className="skeleton-columns__name"></div>
                    <div className="skeleton-columns__vocation"></div>
                </div>
            </div>
            <div className="skeleton-columns__descr"></div>
            <div className="skeleton-columns__date"></div>
        </li>
    )
}

export const SkeletonColumns = () => {
    return (
        <ul className="skeleton-columns__items">
            <SkeletonColumnsItem/>
            <SkeletonColumnsItem/>
            <SkeletonColumnsItem/>
            <SkeletonColumnsItem/>
        </ul>
    )
}