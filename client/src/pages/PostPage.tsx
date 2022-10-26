import React, {FC, useEffect, useRef, useState} from "react";

import Post from "../components/Post";
import Index from "../components/AddComment";
import CommentsBlock from "../components/CommentsBlock";
import {useParams} from "react-router-dom";
import axios from "../axios";
import {PostType} from "../redux/posts/types";
import Skeleton from "../components/Post/Skeleton";

const PostPage: FC = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState<PostType>()
    const isLoading = useRef(true)

    useEffect(() => {
        const fetch = async () => {
            const {data} = await axios.get(`/posts/${id}`)

            setPostData(data)
            isLoading.current = false
        }

        fetch()
    }, [id])

    const dateCreated = postData?.createdAt.replace(/T.*/, '')

    return (
        <>
            {isLoading.current ? <Skeleton />
                : <Post
                    id={postData?._id}
                    title={postData?.title}
                    imageUrl={postData?.imageUrl}
                    user={{
                        avatarUrl:
                            "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                        fullName: postData?.title,
                    }}
                    createdAt={dateCreated}
                    viewsCount={postData?.viewsCount}
                    commentsCount={3}
                    tags={postData?.tags}
                    isFullPost
                >
                    <p>{postData?.text}</p>
                </Post>
            }
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
                <Index />
            </CommentsBlock>
        </>
    );
};

export default PostPage