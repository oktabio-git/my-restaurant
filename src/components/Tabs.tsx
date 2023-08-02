function Tabs() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                    Available
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    Not Available
                </a>
            </li>
        </ul>
    );
}

export default Tabs;
