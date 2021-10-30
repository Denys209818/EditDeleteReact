import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadUsers } from "../../actions/LoadUsers";
import axiosService from "../../services/axiosService";
import 'font-awesome/less/font-awesome.less';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import { push } from "connected-react-router";

const Main = () => {
    //var result = axiosService.sendWithoutData('api/account/get');
    
    var dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(LoadUsers());
    }, []);

    var auth = useSelector(redux => redux.auth);

    const onClickHandlerIconDelete = (e) => 
    {
        var trRow = "rowUser" + e.target.id;
        var row = document.getElementById(trRow);
        axiosService.send('api/account/delete', e.target.id)
        .then(result => {
            row.remove();
            if(auth.isAuth && auth.user.id == e.target.id) 
            {
                localStorage.removeItem('token');
                dispatch({ type: "LOGOUT" });
                dispatch(push("/"));
            }
        }).catch(error=> {
            console.log(error.response);
        });
    }

    const onClickHandlerIconEdit = (e) => {
        
    }
    
    var users = useSelector(redux => redux.users);
    return (<div className="container">
        <div className="row">
            <div className="offset-2 col-md-8">
                <table className="table table-hover table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Ідентифікатор</th>
                            <th scope="col">Ім'я</th>
                            <th scope="col">Прізвище</th>
                            <th scope="col">Номер телефону</th>
                            <th scope="col">Електронна пошта</th>
                            <th scope="col">Фотографія</th>
                            <th scope="col">Інструменти</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.users && users.users.length > 0 && users.users.map((element, index) => {
                                var imgPath = "images/" + element.image;
                                var trRow = "rowUser" + element.id;
                                var trEdit = "/edit?id=" + element.id;
                                return (<tr id={trRow} key={index}>
                                    <td scope="row">{(index+1)}</td>
                                    <td>{element.firstname}</td>
                                    <td>{element.secondname}</td>
                                    <td>{element.phone}</td>
                                    <td>{element.email}</td>
                                    <td><img width="60" src={imgPath}/></td>
                                    <td>
                                        <div className="mx-auto">
                                            <i className="fa fa-trash-o text-danger fa-2x" id={element.id} 
                                            onClick={onClickHandlerIconDelete} style={{cursor: 'pointer'}} aria-hidden="true"></i>
                                            <Link to={trEdit}><i className="fa fa-pencil text-info fa-2x ms-2" onClick={onClickHandlerIconEdit}
                                            style={{cursor: 'pointer'}} aria-hidden="true"></i></Link>
                                        </div>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
               
            </div>
        </div>
        </div>);
    
}

export default Main;