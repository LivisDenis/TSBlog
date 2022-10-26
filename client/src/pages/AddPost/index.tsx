import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

const AddPost = () => {

    return (
        <Paper style={{ padding: 30 }}>
            <Button variant="outlined" size="large">
                Загрузить превью
            </Button>
            <input type="file" hidden />
            <Button variant="contained" color="error">
                Удалить
            </Button>
            <img className={styles.image} alt="Uploaded" />
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Заголовок статьи..."
                fullWidth
            />
            <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" fullWidth />
            <SimpleMDE className={styles.editor} />
            <div className={styles.buttons}>
                <Button size="large" variant="contained">
                    Опубликовать
                </Button>
                <a href="/">
                    <Button size="large">Отмена</Button>
                </a>
            </div>
        </Paper>
    );
};

export default AddPost