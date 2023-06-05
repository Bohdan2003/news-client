import './loadingPage.scss'

export const LoadingPage = () => {
    return (
        <div className="gooey-wrapper">
            <div className="gooey">
                <span className="dot"></span>
                <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    )
}