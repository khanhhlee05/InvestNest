import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";    
const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from("Posts")
                .select()
                .eq('id', id)

            setPost(data[0]);
        }

        const fetchComments = async () => {
            const { data } = await supabase
                .from("Comments")
                .select()
                .eq('postID', id)

            setComments(data);
        }

        
        fetchComments();
        fetchPost();
    }, [id])

    const calculatedTime = (time) => {
        const postedTime = new Date(time);
        const currentTime = new Date();

        const difference = Math.abs(currentTime.getTime() - postedTime.getTime());
        const hours = Math.floor(difference / (1000 * 3600));

        return hours
    }
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== "") {
            event.preventDefault(); 
    
            const { data, error } = await supabase
                .from("Comments") 
                .insert({ 
                    comments: event.target.value, 
                    postID: id
                })
                .select();
    
            if (error) {
                console.error("Error inserting comment:", error);
                return;
            }
    
            
            setComments([...comments, data[0]]);
            event.target.value = ""; 
        }
    };
    

    const handleUpVote = async () => {
        await supabase
            .from("Comments")
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id)
            .select()
        setPost({ ...post, upvotes: post.upvotes + 1 })
    }

    const handleDelete = async () => { 
        const {data, error} = await supabase
            .from("Posts")
            .delete()
            .eq('id', id)
        
        const {data: commentsData, error: commentsError} = await supabase  
            .from("Comments")
            .delete()
            .eq("postID", id)
        
        window.location = "/";  
    }

    return (
        <div>
            <div className="post-content">
                <h2>Posted {calculatedTime(post.created_at)} {calculatedTime(post.created_at) > 1 ? "hours" : "hour"} ago</h2>
                <h1>{post.title}</h1>
                <p>{post.body}</p>
                <img src={post.imageURL} alt="postImage" />
            </div>
            <div className="post-actions">
                <div className="upvote">
                    <h3>{post.upvotes} {post.upvotes === 1 ? "upvote" : "upvotes"}</h3>
                    <button onClick={handleUpVote}>🚀</button>
                </div>
                <div className="edit-delete">
                    <Link to={`/update/${id}`}>
                        <button>✏️</button>
                    </Link>
                  
                    <button onClick={handleDelete}>🗑️</button>
                </div>
            </div>
            <div className="comment-section">
                <div className="comment-contents">
                    {comments.length > 0 ? comments.map((comment) => (
                        <div>
                            <p>{comment.comments}</p>
                        </div>
                    )) : "Be the first the comment 🤔"  }
                </div>
                <div className="comment-input">
                    <input type="text" placeholder="Comment" onKeyPress={handleKeyPress} />
                </div>
            </div>
        </div>
    )
}

export default Post;

