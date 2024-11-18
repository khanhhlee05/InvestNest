import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import "./components.css";
const PostCard = ({ id, time, title, upvotes, type }) => {

   

    const calculatedTime = (time) => {
        const postedTime = new Date(time);
        const currentTime = new Date();

        const difference = Math.abs(currentTime.getTime() - postedTime.getTime());
        const hours = Math.floor(difference / (1000 * 3600));   
        
        return hours
    }

    return (
        <div className="post-card-container">
            <Link to={`/post/${id}`}> 
            <div className="post-card">
                <div className="post-header">
                    <h2>Posted {calculatedTime(time)} {calculatedTime(time) > 1 ? "hours" : "hour"} ago</h2>
                </div>
                <div className="post-contents">
                    <h1>{title}</h1>
                </div>
                <div className="post-footer">
                    <h3>{upvotes} {upvotes === 1 ? "upvote" : "upvotes"}</h3>
                    <h3>{type}</h3>
                </div>
            </div>
            </Link>
        </div>

    )
}

export default PostCard;