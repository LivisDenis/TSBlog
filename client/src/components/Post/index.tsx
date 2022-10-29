import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import UserInfo from '../UserInfo';
import PostSkeleton from './Skeleton';
import {Link} from "react-router-dom";
import {UserType} from "../../redux/posts/types";
import {baseUrl} from "../../axios";

// type PostUserType = {
//     avatarUrl: string | undefined
//     fullName: string | undefined
// }

type PostType = {
    id?: string | undefined
    title?: string | undefined
    createdAt?: string | undefined
    imageUrl?: string | undefined
    user?: UserType | undefined
    viewsCount?: number | undefined
    commentsCount?: number | undefined
    tags?: string[] | undefined
    isFullPost?: boolean | undefined
    isEditable?: boolean | undefined
    isLoading?: boolean | undefined
    children?: ReactNode
}

const Post: FC<PostType> = (props) => {
    const {
        id, title, createdAt, imageUrl, user, viewsCount,
        commentsCount, tags, children, isFullPost, isEditable, isLoading
    } = props

    const dateCreated = createdAt?.replace(/T.*/, '')

    if (isLoading) {
        return <PostSkeleton/>
    }

    return (
        <div className={clsx(styles.root, {[styles.rootFull]: isFullPost})}>
            <div className={styles.editButtons}>
                <a href='/'>
                    <IconButton color="primary">
                        <EditIcon/>
                    </IconButton>
                </a>
                <IconButton color="secondary">
                    <DeleteIcon/>
                </IconButton>
            </div>
            {imageUrl && <img src={baseUrl + imageUrl}
                              className={clsx(styles.image, {[styles.imageFull]: isFullPost})}
            />}
            <div className={styles.wrapper}>
                <UserInfo additionalText={dateCreated} fullName={user?.fullName} avatarUrl={user}/>
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, {[styles.titleFull]: isFullPost})}>
                        <Link to={`/posts/${id}`}>{title}</Link>
                    </h2>
                    <ul className={styles.tags}>
                        {tags?.map(tag =>
                            <li key={tag}>
                                <Link to={`/tag/${tag}`}>{tag}</Link>
                            </li>
                        )}
                    </ul>
                    <div className={styles.content}>
                        {children}
                    </div>
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon/>
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <CommentIcon/>
                            <span>1</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Post