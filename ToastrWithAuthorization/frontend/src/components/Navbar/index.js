import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {
    const auth = useSelector(redux => redux.auth);
var dispatch = useDispatch();
    const onClickHandlerLogout = (e) => 
    {
        e.preventDefault();
        localStorage.removeItem('token');
        dispatch({type: "LOGOUT"});
        dispatch(push("/"));
    }

    return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">

        <Link to="/" className="navbar-brand">Використання Toastr</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainMenu">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainMenu">
            <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Головна сторінка</Link>
                </li>
            </ul>

           
                {!auth.isAuth &&  <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Реєстрація</Link>
                </li> </ul>}
                {auth.isAuth && <ul className="navbar-nav">
                 <li className="nav-item">
                 <span className="nav-link">Привіт, {auth.name}</span>
                </li> 
                <li className="nav-item">
                    <Link to="/logout" onClick={onClickHandlerLogout} className="nav-link">Вихід</Link>
                </li> </ul>}
                
            
        </div>
        </div>
    </div>);
}

export default Navbar;