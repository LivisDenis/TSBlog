import React, {FC, useEffect, useState} from "react";

import Post from "../components/Post";
import Index from "../components/AddComment";
import CommentsBlock from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import axios from "../axios";
import {PostType} from "../redux/posts/types";

const PostPage: FC = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState<PostType>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(({data}) => setPostData(data))
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }, [id])

    const dateCreated = postData?.createdAt.replace(/T.*/, '')

    if (isLoading) {
        return <Post isLoading={isLoading} />
    }

    return (
        <>
            <Post
                id={postData?._id}
                title={postData?.title}
                imageUrl={postData?.imageUrl}
                user={postData?.user}
                createdAt={dateCreated}
                viewsCount={postData?.viewsCount}
                commentsCount={3}
                tags={postData?.tags}
                isFullPost>
                <p>{postData?.text}</p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: "Вася Пупкин",
                            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                        },
                        text: "Это тестовый комментарий 555555",
                    },
                    {
                        user: {
                            fullName: "Иван Иванов",
                            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                        },
                        text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
                    },
                ]}
            >
                <Index/>
            </CommentsBlock>
        </>
    );
};

export default PostPage