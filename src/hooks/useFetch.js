import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [method, setMethod] = useState(null);
  const [config, setConfig] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch {
        setError("Houve um erro ao carregar os livros :(");
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        const json = await res.json();
        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  const httpConfig = (data, method) => {
    setConfig({
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setMethod(method);
  };

  const httpDelete = (id) => {
    let deleteUrl = `${url}/${id}`;
    let config = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch(deleteUrl, config)
      .then((response) => {
        if (response.ok) {
          setCallFetch(!callFetch);
        } else {
          throw new Error("Erro ao deletar o livro");
        }
      })
      .catch((error) => console.error(error));
  };

  return { data, httpConfig, loading, error, httpDelete };
};
