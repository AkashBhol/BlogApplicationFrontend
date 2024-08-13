const MainContent = (props) => {
    return (
        <div className="main-content">
            <div>{props.title}</div>
            {props.children}
        </div>
    )
}
export default MainContent;