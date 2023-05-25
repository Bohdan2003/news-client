import "./skeletonVideo.scss"

const SkeletonVideoItem = () => {
    return (
        <div className="skeleton-video__item">
            <div className="skeleton-video__img"></div>
            <div className="skeleton-video__date"></div>
            <div className="skeleton-video__descr"></div>
        </div>
    )
}

export const SkeletonVideo = () => {
    return (
        <div className="video__list">
            <SkeletonVideoItem/>
            <SkeletonVideoItem/>
            <SkeletonVideoItem/>
            <SkeletonVideoItem/>
            <SkeletonVideoItem/>
        </div>
    )
}