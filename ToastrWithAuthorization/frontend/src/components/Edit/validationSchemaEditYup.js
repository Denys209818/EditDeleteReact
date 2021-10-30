import * as Yup from 'yup';

export default Yup.object({
    firstname: Yup.string().required("Поле обов'язкове для заповнення!"),
    secondname: Yup.string().required("Поле обов'язкове для заповнення!"),
    phone: Yup.string().matches(/^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/, 
    'Номер введено не коректно!').required("Поле обов'язкове для заповнення!"),
    email: Yup.string().email("E-mail введено не коректно!").required("Поле обов'язкове для заповнення!"),
    oldPassword: Yup.string().min(6, "Мінімальна кількість символів - 6"),
    password: Yup.string().min(6, "Мінімальна кількість символів - 6"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Поля 'Пароль' не співпадають!")
});