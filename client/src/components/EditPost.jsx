import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  let { id } = useParams();
  let [title, setTitle] = useState("");
  let [summary, setSummary] = useState("");
  let [content, setContent] = useState("");
  let [imgCover, setImgCover] = useState("");
  let [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:9000/post/${id}`)
      .then((response) => response.json())
      .then((postData) => {
        setTitle(postData.title);
        setSummary(postData.summary);
        setContent(postData.content);
        setImgCover(postData.cover);
      });
  }, []);

  let handleClose = () => {
    history.back();
  };

  async function updatePost(e) {
    e.preventDefault();
    let response = await fetch(`http://localhost:9000/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        content,
        cover: imgCover,
        id: id,
      }),
      credentials: "include",
    });
    if (response.ok) {
      alert("Post Updated Successfully.");
    } else {
      alert("Failed updating the Post.");
    }
  }

  let deletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:9000/post/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Post Deleted successfully.");
        setRedirect(true);
      } else {
        throw new Error("Failed deleting the Post.");
      }
    } catch (error) {
      console.log("Failed deleting the Post:", error.message);
    }
  };

  if (redirect) {
    return <Navigate to={`/posts`} />;
  }

  return (
    <>
      <Form onSubmit={updatePost}>
        <Img>
          <img className="imgData" src={`${imgCover}`} alt="123" />
        </Img>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          autoComplete="off"
          required
        />
        <input
          type="text"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          autoComplete="off"
          required
        />
        <input
          type="text"
          value={imgCover}
          onChange={(e) => setImgCover(e.target.value)}
          placeholder="Image URL"
          autoComplete="off"
          required
        />
        <ReactQuill
          className="textbox"
          value={content}
          theme="snow"
          onChange={(newValue) => setContent(newValue)}
          required
        />
        <div className="btns">
          <button type="button" onClick={handleClose}>
            CLOSE
          </button>
          <button type="submit">UPDATE POST</button>
          <button type="button" onClick={() => deletePost(id)}>
            DELETE
          </button>
        </div>
      </Form>
    </>
  );
};

export default EditPost;

let Img = styled.div`
  width: 100%;
  height: 15rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;

let Form = styled.form`
  width: 60%;
  max-height: 35rem;
  box-shadow: 0 0 0.5rem violet;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  overflow-y: auto;

  input {
    width: 100%;
    border: none;
    border-bottom: 0.01rem solid violet;
    outline: none;
    padding: 0.5rem 0;

    &::placeholder {
      font-style: italic;
      letter-spacing: 0.25rem;
    }
  }

  .textbox {
    width: 100%;
  }

  .btns {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.75rem 1.75rem;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    background-color: #39ef88;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.25rem;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover,
    &:focus {
      background-color: #36f88a;
    }
  }
`;