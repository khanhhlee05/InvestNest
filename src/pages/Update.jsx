import { useState, useEffect } from "react";
import "./Page.css";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

const Update = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [type, setType] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from("Posts")
                .select()
                .eq('id', id)

            setTitle(data[0].title);
            setBody(data[0].body);
            setImage(data[0].imageURL);
            setType(data[0].type);
        }

        fetchPost();
    }, [id])

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        await supabase
            .from("Posts")
            .update(
                { title: title, body: body, imageURL: image, type: type }
            )
            .eq('id', id);

        window.location = "/";
    }


    return (
        <div>

            <form>
                <input type="text" placeholder="Title" value={title} onChange={handleChangeTitle} />
                <textarea placeholder="Body" value={body} onChange={handleChangeBody}></textarea>
                <input type="text" placeholder="ImageURL" value={image} onChange={handleChangeImage} />
                <label for="type">Type:</label>
                <select id="type" name="type" onChange={handleChangeType} value={type}>
                    <option value="Opinion">Opinion</option>
                    <option value="Question">Question</option>
                </select>
                <div>
                    <input type="submit" value="Update" onClick={handleSubmit} />
               
                </div>
            </form>


        </div>
    )
}

export default Update;