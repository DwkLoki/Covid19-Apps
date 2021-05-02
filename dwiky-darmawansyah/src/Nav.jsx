import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <>
            <div className="container">
                <nav className="row">
                    <div style={{ marginRight: "15px" }}>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/provinsi">Provinsi</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Nav
