import styles from "./CreatePost.module.css";

//react
import { useState } from "react";
import { useNavigate } from "react-router-dom"; //parar redirecionar o usar depois que criar o post
import { useAuthValue } from "../../context/AuthContext"; //conseguir pegar o usuário e atrelar ele no post
import { useInsertDocument } from "../../hooks/useInsertDocument";


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    
    const { insertDocument, response } = useInsertDocument("posts");

    //usar o navigate para redirecionar para outra pagina
    const navigate = useNavigate();

    const {user} = useAuthValue();

    const handleSubmit = (e) => {
        
        e.preventDefault();
        setFormError("");        

        //validate image url //validar a url da imagem
        try {
            //verificamos aqui se é uma url
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // criar o array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        //call all values //checar todos os valores
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos.");
        }
        if (formError) return;        
        
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });
        
        //redirect to home page //redirecionar para home page
        navigate("/");
        
    };

    return (
        <div className={styles.create_post}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="text"
              required
              placeholder="Pense num bom título..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input
              type="text"
              name="image"
              required
              placeholder="Insira uma imagem que representa seu post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <label>
            <span>Conteúdo:</span>
            <textarea
              name="body"
              required
              placeholder="Insira o conteúdo do post"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            ></textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              required
              placeholder="Insira as tags separadas por vírgula"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
            />
          </label>            
        
            {!response.loading && <button type="submit" className="btn">Cadastrar</button>}
            {response.loading && (
                <button className="btn" disabled>
                    Aguarde...
                </button>
            )}
            {(response.error || formError) && (
                <p className="error">{response.error || formError}</p>
            )}




          {/* {!response.loading && <button className="btn">Criar post!</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde.. .
            </button>
          )}
          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )} */}
        </form>
      </div>
    )
}

export default CreatePost