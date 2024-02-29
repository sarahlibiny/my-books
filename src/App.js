import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [titulo, setTitulo] = useState("");
  const [editora, setEditora] = useState("");
  const [genero, setGenero] = useState("");
  const [resumo, setResumo] = useState("");
  const [autor, setAutor] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const url = "http://localhost:3000/livros";

  const { data: items, httpConfig, loading, error, httpDelete } = useFetch(url);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = {
      titulo: `Título: ${titulo}`,
      autor: `Autor: ${autor}`,
      editora: `Editora: ${editora}`,
      genero: `Gênero: ${genero}`,
      resumo: `Resumo: ${resumo}`,
      imageSrc,
    };

    httpConfig(book, "POST");

    setTitulo("");
    setAutor("");
    setEditora("");
    setGenero("");
    setResumo("");
    setImageSrc("");
  };

  return (
    <>
      <div className="Container-Titulo">
        <h1>Bem vindo(a) a minha biblioteca!</h1>
      </div>
      {loading && <p>Carregando livros...</p>}
      {error && <p>{error}</p>}
      {!error && (
        <div className="ContainerLivros">
          {items &&
            items.map((book) => (
              <div key={book.id} className="ContainerLivro">
                <div className="ContainerIcons">
                  <MdDeleteForever
                    onClick={() => httpDelete(book.id)}
                    size={25}
                    className="IconDelete"
                  />
                </div>
                <img src={book.imageSrc} alt={book.alt} />
                <div className="ContainerContext">
                  <h2>{book.titulo}</h2>
                  <span>{book.autor}</span>
                  <span>{book.editora}</span>
                  <span>{book.genero}</span>
                </div>
                <p>{book.resumo}</p>
              </div>
            ))}
        </div>
      )}
      <div className="ContainerPost">
        <h2 className="Subtitle-post">
          Preencha os campos abaixo para inserir um novo livro:
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            placeholder="Escreva o título"
            value={titulo}
            name="titulo"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        <label>
          Autor:
          <input
            type="text"
            placeholder="Escreva o nome do Autor"
            value={autor}
            name="autor"
            onChange={(e) => setAutor(e.target.value)}
          />
        </label>
        <label>
          Editora:
          <input
            type="text"
            placeholder="Escreva a editora"
            value={editora}
            name="editora"
            onChange={(e) => setEditora(e.target.value)}
          />
        </label>
        <label>
          Gênero:
          <input
            type="text"
            placeholder="Escreva a gênero"
            value={genero}
            name="genero"
            onChange={(e) => setGenero(e.target.value)}
          />
        </label>
        <label>
          Resumo:
          <textarea
            placeholder="Escreva o resumo"
            value={resumo}
            name="resumo"
            onChange={(e) => setResumo(e.target.value)}
          />
        </label>
        <label>
          URL da imagem de capa:
          <input
            placeholder="Cole aqui a URL da imagem"
            value={imageSrc}
            name="imageSrc"
            onChange={(e) => setImageSrc(e.target.value)}
          />
        </label>
        {loading && <input type="submit" value="Aguarde" disabled />}
        {!loading && <input className="Button" type="submit" value="Salvar" />}
      </form>
    </>
  );
}

export default App;
