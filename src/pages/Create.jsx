import { useState } from "react";
import "./Page.css";
import { supabase } from "../client";   


const Create = () => {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState("");   
    const [image, setImage] = useState(""); 
    const [type, setType] = useState("Opinion");
    
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
    }

    const handleSubmit = async () => {
        event.preventDefault();

        await supabase
            .from("Posts")
            .insert(
                {title: title, body: body, imageURL: image, type: type}
            )
            .select();

        window.location = "/";

    }
    
 

    return (
        <div>

            <form>
                <input type="text" placeholder="Title" value={title} onChange={handleChangeTitle}/>
                <textarea placeholder="Body" value={body} onChange={handleChangeBody}></textarea>
                <input type="text" placeholder="ImageURL" value={image} onChange={handleChangeImage}/>
                <label for="type">Type:</label>
                <select id="type" name="type" onChange={handleChangeType}>
                    <option value="Opinion">Opinion</option>
                    <option value="Question">Question</option>
                </select>

                <input type="submit" onClick={handleSubmit} />
            </form>


        </div>
    )
}

export default Create;