import { push } from "connected-react-router";
import { Form, Formik, validateYupSchema } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FlashMessage from "../../actions/FlashMessage";
import axiosService from "../../services/axiosService";
import ImageTextInput from "../TextInputs/ImageTextInput";
import MessageTextInput from "../TextInputs/MessageTextInput";
import PhoneTextInput from "../TextInputs/PhoneTextInput";
import validationSchemaEditYup from "./validationSchemaEditYup";


const Edit = () => 
{
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");


    var initialValues = {
        firstname: '',
        secondname: '',
        phone:'',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
        id: id
    };

    axiosService.send('api/account/getuser', id)
    .then(result => {
        Object.entries(result.data).forEach(([key, value]) => {
            refFormik.current.setFieldValue(key, value);
        });
    });

    const [invalid, setInvalid] = useState([]);

    var refFormik = useRef();
    var dispatch = useDispatch();

    const onSubmitHandler = (values, {}) => 
    {
        axiosService.sendImage('api/Account/edit', values)
        .then(result => {
            dispatch(FlashMessage({
                type: 'success',
                text: 'Успішно редаговано!'
            }));
            dispatch({type: "CHANGE_NAME", payload: values.firstname});

            dispatch(push("/"));

        }, error => {
            var errors = error.response.data.errors;

            Object.entries(errors).forEach(([key,value]) => {
                
                refFormik.current.setFieldError(key, value);
            });
            
            if(errors.invalid && errors.invalid.length > 0) 
            {
                setInvalid(errors.invalid);
            }
        });  
        
    }

    return (<div className="container">
        <div className="row">
            <div className="offset-md-3 col-md-6 mt-4">
                <h2 className="text-center">Редагування</h2>
                {
                    invalid && invalid.length > 0 &&
                    <div className="alert alert-danger">
                        <ul>
                            {invalid.map((element, index) => {
                                return (<li key={index}>{element}</li>);
                            })}
                        </ul>
                    </div>
                }
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchemaEditYup}
                    onSubmit={onSubmitHandler}
                    innerRef={refFormik}
                >
                    <Form>
                        <MessageTextInput
                            label="Ім'я"
                            name="firstname"
                            id="firstname"
                            type="text"
                        />
                        <MessageTextInput
                            label="Прізвище"
                            name="secondname"
                            id="secondname"
                            type="text"
                        />
                        <MessageTextInput
                            label="Елктронна пошта"
                            name="email"
                            id="email"
                            type="text"
                        />
                        <PhoneTextInput
                            label="Телефон"
                            name="phone"
                            id="phone"
                            type="text"
                        />
                        <hr className="mt-2"/>
                        <h3 className="text-center">Змінити пароль</h3>
                        <MessageTextInput
                            label="Старий пароль"
                            name="oldPassword"
                            id="oldPassword"
                            type="password"
                        />
                        <MessageTextInput
                            label="Пароль"
                            name="password"
                            id="password"
                            type="password"
                        />
                        <MessageTextInput
                            label="Підтвердження пароля"
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                        />
                        <hr className="mt-2"/>
                        <h3 className="text-center">Фотографія</h3>
                        <ImageTextInput
                            name="image"
                            id="image"
                            refFormik={refFormik}
                        />
                        <p className="text-center">Загрузіть нову фотографію</p>
                        <input type="submit" className="btn btn-success mt-4" value="Змінити" />
                    </Form>
                </Formik>
            </div>
        </div>
    </div>);
}

export default Edit;