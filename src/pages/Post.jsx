import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Page.css";

const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [secretKey, setSecretKey] = useState("");

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
            .from("Posts")
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id)
            .select()
        setPost({ ...post, upvotes: post.upvotes + 1 })
    }

    const handleDelete = async (event) => {
        event.preventDefault();

        if (secretKey.trim() === "") {
            window.alert("Please enter a password to delete the post!");
            return;
        }

        if (secretKey !== post.secretKey) {
            window.alert("Incorrect password!");
            return;
        }

        try {
            await supabase
                .from("Posts")
                .delete()
                .eq("id", id);

            window.alert("Post deleted successfully!");
            window.location.href = "/"; 
        } catch (error) {
            console.error("Error deleting post:", error);
            window.alert("An error occurred while deleting the post.");
        }
    }




    return (
        <div>
            {isModalOpen ? (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      backgroundColor: '#1e1e1e',
                      padding: '20px',
                      borderRadius: '10px',
                      width: '400px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                    }}>
                      <h2 style={{
                        color: '#fff',
                        marginBottom: '10px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}>
                        “Time to Give This Post a Farewell—Enter Password”
                      </h2>
                      <h3 style={{
                        color: '#aaa',
                        fontSize: '14px',
                        marginBottom: '20px',
                      }}>
                        “You can’t undo this action. Are you sure you want to delete this post?”
                      </h3>
                      <form onSubmit={handleDelete}>
                        <input
                          type="password"
                          placeholder="Enter password"
                          value={secretKey}
                          onChange={(e) => setSecretKey(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '10px',
                            marginBottom: '15px',
                            borderRadius: '6px',
                            border: '1px solid #333',
                            backgroundColor: '#2e2e2e',
                            color: '#fff',
                          }}
                        />
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            style={{
                              padding: '10px 20px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: '#555',
                              color: '#fff',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            style={{
                              padding: '10px 20px',
                              borderRadius: '6px',
                              border: 'none',
                              backgroundColor: '#4f46e5',
                              color: '#fff',
                              cursor: 'pointer',
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
            ) : (
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

                            <button onClick={() => setIsModalOpen(true)}>🗑️</button>
                        </div>
                    </div>
                    <div className="comment-section">
                        <div className="comment-contents">
                            {comments.length > 0 ? comments.map((comment) => (
                                <div>
                                    <p>{comment.comments}</p>
                                </div>
                            )) : "Be the first the comment 🤔"}
                        </div>
                        <div className="comment-input">
                            <input type="text" placeholder="Comment" onKeyPress={handleKeyPress} />
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Post;

