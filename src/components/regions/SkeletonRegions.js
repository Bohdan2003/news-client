import './skeletonRegionsColumn.scss'

export const SkeletonRegionsColumn = () => {
    return (
        <div className="skeleton-regions__column">
            <div className="skeleton-regions__title"></div>
            <div className="skeleton-regions__date"></div>
            <div className="skeleton-regions__box">
                <div className="skeleton-regions__text"></div>
                <div className="skeleton-regions__text"></div>
                <div className="skeleton-regions__text"></div>
                <div className="skeleton-regions__text"></div>
                <div className="skeleton-regions__text"></div>
            </div>
            <div className="skeleton-regions__btn"></div>
        </div>
    )
}

export const SkeletonRegions = () => (
    <>
        <SkeletonRegionsColumn/>
        <SkeletonRegionsColumn/>
        <SkeletonRegionsColumn/>
    </>
)