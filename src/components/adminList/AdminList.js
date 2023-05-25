import { memo } from "react"
import { useGetSLidesQuery } from "../../api/apiSlice"

import { AdminListItem } from "./AdminListItem"
import { Error } from "../error/Error"

import "./adminList.scss"

const MemoAdminListItem = memo(AdminListItem);

const AdminList = () => {
    const {
        data,
        isLoading,
        isFetching,
        isError
    } = useGetSLidesQuery()

    const listStyle = () => {
        if(isFetching && !isLoading) return {"opacity": "0.5", "pointerEvents": "none"}
    }

    const setContent = () => {
        if ( isLoading )        return <div>loading...</div>;
        if ( isError )          return <Error/>;
        if ( data.length == 0 ) return <div>No slides</div>

        return data.map((item) => (                  
            <MemoAdminListItem item={item} key={item._id}/>                  
        ))
    }

    const content = setContent();

    return (
        <div className="admin-list">
            <ul className="admin-list__items" style={listStyle()}>
                {content}
            </ul>
        </div>
    )
}

export { AdminList }