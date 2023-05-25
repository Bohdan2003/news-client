import { SkeletonItem } from '../tile/SkeletonTile'

import './skeletonSection.scss'

export const SkeletonSection = () => {
    return (
        <section className="skeleton-section">          
            <div className="skeleton-section__box">
                <div className="skeleton-section__title"></div>
                <div className="skeleton-section__link"></div>
            </div>    
            <div className="skeleton-section__filter-btns">
                <div className="skeleton-section__filter-btn"></div>
                <div className="skeleton-section__filter-btn"></div>
            </div>
            <div className="skeleton-section__content">
                <div className="skeleton-section__tile">
                    <SkeletonItem/>
                    <SkeletonItem/>
                    <SkeletonItem/>
                </div>
                <div className="skeleton-section__list">
                    <div className="skeleton-section__list-title"></div>
                    <div className="skeleton-section__list-item">
                        <div className="skeleton-section__list-descr"></div>
                    </div>
                    <div className="skeleton-section__list-item">
                        <div className="skeleton-section__list-descr"></div>
                    </div>
                    <div className="skeleton-section__list-item">
                        <div className="skeleton-section__list-descr"></div>
                    </div>
                    <div className="skeleton-section__list-item">
                        <div className="skeleton-section__list-descr"></div>
                    </div>
                    <div className="skeleton-section__list-item">
                        <div className="skeleton-section__list-descr"></div>
                    </div>
                </div>
            </div>       
        </section>
    )
}