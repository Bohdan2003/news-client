import { useGetNewsRegionsQuery } from '../../api/apiSlice';

import { Error } from "../error/Error";
import { SkeletonRegions } from './SkeletonRegions';
import { RegionsColumn } from './RegionsColumn.js';

import './regions.scss';

const Regions = () => {
    const { 
            data = [],
            isLoading,
            isError
        } = useGetNewsRegionsQuery()

    const setContent = () => {
        if(isLoading) return <SkeletonRegions/>;
        if(isError)   return <Error/>;

        return data.map(({_id, ...props}) => (
            <RegionsColumn {...props} key={_id}/>
        ))
    }

    const content = setContent()

    return (
        <section className="regions">
            <div className="regions__box">
                <h2 className="regions__title">Регіони</h2>
                <a  className="regions__link" href="#">Всі новини розділу</a>
            </div>
            <div className="regions__columns">
                {content}
            </div>

        </section>
    )
}

export default Regions;