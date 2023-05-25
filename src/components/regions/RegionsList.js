import { memo } from 'react';
import { getDay, getMonth, transformMonth } from '../../utils/helpers';

import { ListItem } from '../listItem/ListItem';

const MemoListItem = memo(({date, descr}) => 
    <ListItem 
        date={date}
        descr={descr}
    />
)

export const RegionsList = ({date, articles}) => {
    return (
        <div className="list">
            <a className="list__date" href="#">
                {`${getDay(date)} ${transformMonth(getMonth(date)).toUpperCase()}`}
            </a>
            <ul className="list__items">
                {
                    articles.map(({_id, date, descr}) => 
                        <MemoListItem 
                            date={date}
                            descr={descr} 
                            key={_id}
                        />
                    )
                }
            </ul>
        </div>
    )  
}