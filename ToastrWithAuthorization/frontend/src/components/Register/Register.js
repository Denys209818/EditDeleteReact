import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FlashMessage from "../../actions/FlashMessage";
import ImageTextInput from "../TextInputs/ImageTextInput";
import MessageTextInput from "../TextInputs/MessageTextInput";
import PhoneTextInput from "../TextInputs/PhoneTextInput";
import validationSchemaYup from "./validationSchemaYup";
import axiosService from "../../services/axiosService";
import { push } from "connected-react-router";
import { AuthorizeUser } from "../../actions/authorizeUser";
import jwt from "jsonwebtoken";


export const authorizeUserSite = (token) => (dispatch) => 
{
    var user = jwt.decode(token);
    dispatch({type: "REGISTER", payload: user});
}

const Register = () => {
    var initialValues = {
        firstname: '',
        secondname: '',
        phone:'',
        email: '',
        image: null,
        password: '',
        confirmPassword: ''
    };

    const [invalid, setInvalid] = useState([]);

    var refFormik = useRef();
    var dispatch = useDispatch();

    const onSubmitHandler = (values, {}) => 
    {
        axiosService.sendImage('api/Account/register', values)
        .then(result => {
            dispatch(FlashMessage({
                type: 'success',
                text: 'Успішно зареєстровано!'
            }));
            const token = result.data.token;
            AuthorizeUser(token);
            localStorage.setItem("token", token);

            dispatch(authorizeUserSite(token));

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

    return (
    <div className="container">
        <div className="row">
            <div className="offset-md-3 col-md-6 mt-4">
                <h2 className="text-center">Реєстрація</h2>
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
                    validationSchema={validationSchemaYup}
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
                        <ImageTextInput
                            name="image"
                            id="image"
                            refFormik={refFormik}
                        />

                        <input type="submit" className="btn btn-success mt-4" value="Зареєструвати"/>
                    </Form>
                </Formik>
            </div>
        </div>
    </div>);
}

export default Register;