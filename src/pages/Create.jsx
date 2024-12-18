import { useState } from "react";
import "./Page.css";
import { supabase } from "../client";   
import { useParams } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState("");   
    const [image, setImage] = useState(""); 
    const [type, setType] = useState("Opinion");
    const [secretKey, setSecretKey] = useState("");
  
    const {id} = useParams();
    
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeBody = (e) => {
        setBody(e.target.value);
    }

    const handleChangeImage = (e) => {
        setImage(e.target.value);
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
        console.log(id)
    }

    const handleSubmit = async () => {
        event.preventDefault();
        if (title.trim() === "" || body.trim() === "" || secretKey.trim() === "") {
            window.alert("Please fill in all fields!");
            return;
        }
        try{
        const author = localStorage.getItem("uuid");    
        await supabase
            .from("Posts")
            .insert(
                {title: title, body: body, imageURL: image, type: type, secretKey: secretKey, author: author, threaded: id }
            )
            .select();
        
        
        window.alert("Post created successfully!");

        window.location = "/";
        } catch (error) {
            window.alert("Error creating post: " + error.message);
        }

    }

    const handleChangeSecretKey = (e) => {
        setSecretKey(e.target.value);
    }
    
 

    return (
        <div>

            <form>
                <input type="text" placeholder="Title" value={title} onChange={handleChangeTitle}/>
                <textarea placeholder="Body" value={body} onChange={handleChangeBody}></textarea>
                <input type="text" placeholder="Image/Video URL" value={image} onChange={handleChangeImage}/>
                <label for="type">Type:</label>
                <select id="type" name="type" onChange={handleChangeType}>
                    <option value="Opinion">Opinion</option>
                    <option value="Question">Question</option>
                </select>
                <input type="password" placeholder="Secret Key" value={secretKey} onChange={handleChangeSecretKey}/>

                <input type="submit" onClick={handleSubmit} />
            </form>


        </div>
    )
}

export default Create;