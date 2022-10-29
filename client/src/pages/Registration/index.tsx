import React, {FC} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Registration.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {UserRegisterType} from "../../redux/auth/types";
import {RootState, useAppDispatch} from "../../redux/store";
import {fetchRegister} from "../../redux/auth/AsyncActions";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Registration: FC = () => {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors}} = useForm<UserRegisterType>({mode: "onChange"});

    const onSubmit: SubmitHandler<UserRegisterType> = async (values) => {
        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            alert('Не удалось зарегистрироваться')
        }

        if ('token' in data.payload) {
            localStorage.setItem('token', data.payload.token)
        }
    }

    if (localStorage.getItem('token')) {
        return <Navigate to='/'/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("fullName",  { required: 'Укажите имя' })}
                           className={styles.field}
                           label="Полное имя"
                           error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
                           fullWidth/>
                <TextField {...register("email",  { required: 'Укажите почту' })}
                           className={styles.field}
                           type='email'
                           label="E-Mail"
                           error={Boolean(errors.email?.message)}
                           helperText={errors.email?.message}
                           fullWidth/>
                <TextField {...register("password",  { required: 'Укажите пароль', minLength: 6 } )}
                           type='password'
                           className={styles.field}
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           label="Пароль"
                           fullWidth/>
                <Button type='submit' size="large" variant="contained" fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    );
};

export default Registration