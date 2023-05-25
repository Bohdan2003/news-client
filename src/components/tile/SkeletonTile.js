import './skeletonTile.scss'

export const SkeletonItem = () => {
    return (
        <div className="skeleton-item">
            <div className="skeleton-item__img"></div>
            <div className="skeleton-item__date"></div>
            <div className="skeleton-item__text"></div>
        </div>
    )
}
