import { useState } from "react";
import './../../css/ImageText.css';
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

const ImageTextInput = ({refFormik, ...props}) => {

    const [src, setSrc] = useState( "https://bytes.ua/wp-content/uploads/2017/08/no-image.png");

   const auth = useSelector(redux => redux.auth);
    var dispatch = useDispatch();

    const onImageClick = (e) => {
        e.preventDefault();
        dispatch({type: "DRAG_OUT"});

        var file;

        if(e.target.files) 
        {
            file = e.target.files[0];
        }else if(e.dataTransfer) 
        {
            file = e.dataTransfer.files[0];
        }

        if(file !== 'undefined') 
        {
            var source = URL.createObjectURL(file);
            setSrc(source);
            refFormik.current.setFieldValue('image', file);
        }
    }
        
    const EnterImage = (e) => {
        e.preventDefault();
        dispatch({type: "DRAG_IN"});
    } 

    const LeaveImage = (e) => {
        e.preventDefault();
        dispatch({type: "DRAG_OUT"});
    } 

    return (<div className="container mt-3">
        <div className="row">
            <div className="offset-3 col-md-6">
                <label htmlFor={props.name || props.id} className="d-flex justify-content-center">
                    <img src={src}  width="250" height="250" alt="no-image"
                    onDrop={onImageClick}
                    onDragEnter={EnterImage}
                    onDragLeave={LeaveImage}
                    onDragOver={EnterImage}
                    className={classNames({"borderSolid": !auth.isDrag}, {"borderDashed":auth.isDrag})}
                    />
                </label>

                <input onChange={onImageClick}
                type="file" {...props} className="d-none"/>
            </div>
        </div>
    </div>)
}

export default ImageTextInput;