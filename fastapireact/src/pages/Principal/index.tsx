import { useEffect, useState } from "react";
import styles from "./Principal.module.scss";
import axios from "axios";

export default function Principal() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const message = async () => {
    try {
      const response = await fetch("http://localhost:8000/items");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  // insert data to api
  const postData = () => {
    axios
      .post("http://localhost:8000/items", {
        id: 15,
        name: "alface",
        price: 100,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //get data from api
    axios
      .get("http://localhost:8000/items")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = () => {
    setLoading(true);
    axios
      .delete("http://localhost:8000/items/15")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    axios
      .get("http://localhost:8000/items")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // edit item 1
  const editData = async () => {
    setLoading(true);
    const response = await axios.put("http://localhost:8000/items/1", {
      id: 1,
      name: "tomate",
      price: 47,
    });
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/items")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Principal</h1>
      <button onClick={message}>Message</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>loading...</td>
              <td>loading...</td>
              <td>loading...</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button className={styles.btnPost} onClick={postData}>
        Post Data
      </button>
      <button className={styles.btnDelete} onClick={deleteData}>
        Delete Data
      </button>
      <button
        className={styles.btnEdit}
        onClick={function () {
          editData();
          alert("editado");
        }}
      >
        Edit Data
      </button>
    </div>
  );
}
