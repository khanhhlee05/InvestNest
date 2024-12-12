import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./components.css";
import { supabase } from '../client';

const Thread = ({ id }) => {
    const [post, setPost] = useState({});
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await supabase
                    .from("Posts")
                    .select()
                    .eq('id', id)
                setPost(data[0]);
            } catch (error) {
                console.error("Error fetching post:", error);
            }

        }


        fetchPost();
    }, [])
    const calculatedTime = (time) => {
        const postedTime = new Date(time);
        const currentTime = new Date();

        const difference = Math.abs(currentTime.getTime() - postedTime.getTime());
        const hours = Math.floor(difference / (1000 * 3600));

        return hours
    }
return (
    <>
        {post && (
            <Link to={`/post/${id}`}>
                <div className="post-card">
                    <div className="post-header">
                        <p>Posted by: {post.author}</p>
                        <h2>Posted {calculatedTime(post.created_at)} {calculatedTime(post.created_at) > 1 ? "hours" : "hour"} ago</h2>
                    </div>
                    <div className="post-contents">
                        <h1>{post.title}</h1>
                    </div>
                    <div className="post-footer">
                        <h3>{post.upvotes} {post.upvotes === 1 ? "upvote" : "upvotes"}</h3>
                        <h3>{post.type}</h3>
                    </div>
                </div>
            </Link>
        )}
    </>
) 
}  



export default Thread;