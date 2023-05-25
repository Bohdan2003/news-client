import { getTime } from '../../utils/helpers';

import './listItem.scss'

export const ListItem = ({className = '', date = '', descr = ''}) => {
    // console.log(`render element ${index}`)
    // console.log('render')

    return (
        <li className="list__item">                           
            <div className={`list__item-inner ${className}`}>
                <h4 className="list__item-content">
                    <span className="list__item-time">
                        {getTime(date)}
                    </span>
                    {descr}
                </h4>
            </div>
        </li>
    )
}