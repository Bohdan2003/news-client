import { AdminList } from "../adminList/AdminList"
import { AdminForm } from "../adminForm/AdminForm"

import './adminPage.scss'

const AdminPage = () => {

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-page__title">
                    Слайдер
                </div>
                <div className="admin-page__inner">
                    <AdminList/>
                    <AdminForm/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage