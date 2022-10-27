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
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {UserType} from "../../redux/posts/types";

type payloadT = {
    payload: UserType
}

const Registration: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useSelector((state: RootState) => state.authSlice)
    const {register, handleSubmit, formState: {errors}} = useForm<UserRegisterType>({mode: "onChange"});

    const onSubmit: SubmitHandler<UserRegisterType> = async (values) => {
        const data = await dispatch(fetchRegister(values))

        if (!data.payload) {
            alert('Не удалось зарегистрироваться')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        }
    }

    if (user) {
        navigate('/')
    }

    return (
        <Paper classes={{root: styles.root}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}}/>
                </div>
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
                           error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
                           fullWidth/>
                <TextField {...register("password",  { required: 'Укажите пароль', minLength: 6 } )}
                           type='password'
                           className={styles.field}
                           error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
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