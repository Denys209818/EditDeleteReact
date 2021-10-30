import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { FlashMessageDelete } from "../../actions/FlashMessage";


const ToastCustom = () => {
    var toasts = useSelector(redux => redux.toast);
var dispatch = useDispatch();
    const toastCloseClick = (e) => {
        dispatch(FlashMessageDelete(e.target.id));
    }

    return (<div className="container mt-3">
        <div className="row">
            <div className="offset-3 col-md-6">

            {toasts.map((element, index) => {
                
                return (<div key={element.id} className={classNames("alert", { "alert-success": element.type === 'success' },
                { "alert-danger": element.type === 'error' })}>
                    {element.text}
                    <button onClick={toastCloseClick} id={element.id} className="btn-close float-end"></button>
                </div>);
            })}
            </div>
        </div>
    </div>);
}

export default ToastCustom;