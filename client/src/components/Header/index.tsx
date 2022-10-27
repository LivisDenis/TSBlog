import React, {FC} from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

const Header: FC = () => {
    const {user} = useSelector((state: RootState) => state.authSlice)

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link to="/" className={styles.logo}>
                        <div>BLOG</div>
                    </Link>
                    <div className={styles.buttons}>
                        {user ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button variant="contained" color="error">
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Войти</Button>
                                </Link>
                                <Link to="/registration">
                                    <Button variant="contained">Создать аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Header