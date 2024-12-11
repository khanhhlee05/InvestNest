import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";
import { supabase } from "../client";


const Home = ({color}) => {

    const [posts, setPosts] = useState([]);
    const [mostRecent, setMostRecent] = useState([]);
    const [mostUpvoted, setMostUpvoted] = useState([]);
    const [bgColor, setBgColor] = useState("#1A1A1A")
    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from("Posts")
                .select()
                .order('created_at', { ascending: false })

            const { data: upvoted } = await supabase
                .from("Posts")
                .select()
                .order('upvotes', { ascending: false })

            setMostUpvoted(upvoted)
            setMostRecent(data)
            setPosts(data);
        }
        
        fetchPost();

        if (color === 'default') {
            setBgColor("#1A1A1A")
        } else if (color === 'bearish') {
            setBgColor("#5C2E2E")
        } else {
            setBgColor("#2E5C2E")
        }

    }, [color])

    const handleMostRecent = () => {
        setPosts(mostRecent)
    }

    const handleMostUpvoted = () => {
        setPosts(mostUpvoted)
    }

    const handleOpinion = () => {
        const myPost = mostUpvoted
        const opinion = myPost.filter((post) => post.type === "Opinion")
        setPosts(opinion)

    }

    const handleQuestion = () => {
        const myPost = mostUpvoted
        const question = myPost.filter((post) => post.type === "Question")
        setPosts(question)

    }

    const handleSearch = (e) => {  
        const search = e.target.value.trim().toLowerCase();
        if (!search) {
            setPosts(mostUpvoted);
            return;
        }
        const myPost = mostUpvoted;
        const searchResult = myPost.filter((post) => post.title.toLowerCase().includes(search));
        setPosts(searchResult);
    }
    return (
        <div>
            <div className="filter"  style={{ backgroundColor: bgColor }}>
                <div className="filter-search">
                    <input type="text" placeholder="Search" onChange={handleSearch} />     
                </div>
                <div className="filters-container">
                    <div className="filter-group">
                        <h2>Order by:</h2>
                        <button onClick={handleMostRecent}>Most Recent</button>
                        <button onClick={handleMostUpvoted}>Most Upvoted</button>
                    </div>
                    <div className="filter-group">
                        <h2>Type:</h2>
                        <button onClick={handleOpinion}>Opinion</button>
                        <button onClick={handleQuestion}>Question</button>
                    </div>
                </div>
            </div>
            <div className="post">
                {
                    posts && posts.length > 0 ?
                        posts.map((post) => (
                            <PostCard id={post.id} title={post.title} time={post.created_at} upvotes={post.upvotes} type={post.type} author={post.author} />
                        )) : <h2>💵No Posts Yet💵</h2>
                }

            </div>
        </div>
    )
}

export default Home;