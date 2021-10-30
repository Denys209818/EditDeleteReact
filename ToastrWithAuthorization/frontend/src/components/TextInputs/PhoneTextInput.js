import { useField } from "formik";
import classNames from "classnames";
import { useIMask } from 'react-imask';
import { useState } from "react";


const PhoneTextInput = ({label, ...props}) => {

    const [field, meta] = useField(props);

    const [opts] = useState({mask: '+00(000) 000 00 00'});
    const {ref} = useIMask(opts);

    return (
    <div className="form-group">
        <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} className={classNames("form-control", {"is-valid":meta.touched && !meta.error}, 
        {"is-invalid": meta.touched && meta.error})} ref={ref}/>

        {meta.touched && meta.error && <div className="invalid-feedback">
                {meta.error}
            </div>}
    </div>);
}

export default PhoneTextInput;