import { useField } from "formik";
import classNames from "classnames";


const MessageTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);
    return (
    <div className="form-group">
        <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} className={classNames("form-control", {"is-valid":meta.touched && !meta.error}, 
        {"is-invalid": meta.touched && meta.error})}/>
        {meta.touched && meta.error && <div className="invalid-feedback">
                {meta.error}
            </div>}
    </div>);
}

export default MessageTextInput;