import { useState, useEffect } from "react";
const cover_id = [10832290, 6941459, 14630218, 10952280, 12639079, 14612610, 9144523, 382159];

export function Home() {
  const [option,setOption] = useState(null);
  return (
    <div>
      {!option ?
    <div>
      <div className="menu">
        <button onClick={() => setOption("add")}>ADD Book</button>
        <button onClick={() => setOption("delete")}>Delete Book</button>
        <button onClick={() => setOption("view")}>View disponible books</button>
        <button onClick={() => setOption("view1")}>View your list</button>
      </div>
    <div className="cover">
      {cover_id.map((id) => (
        <img className="coverimg"
          key={id}
          src={`https://covers.openlibrary.org/b/id/${id}-M.jpg`}
          alt={`Book cover ${id}`}
        />
      ))}
    </div>
    </div> :
      <Form option={option} setOption={setOption}> </Form>
      }
</div>
  );
}

async function ADD(e, book_name, setOption,setError) {
  e.preventDefault();
  setError(null);
  try {
    const token = localStorage.getItem("token");
    const res = await fetch (`http://localhost:5000/searchbook?book_name=${encodeURIComponent(book_name)}`);
    if(!res.ok){
      console.log("Book not found");
      setError("This Book is not available");
      return;
    }else{
    const res1 = await fetch(`http://localhost:5000/addbook`, {
      method: "POST",                                 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ book_name }),           
    });
    if (!res1.ok) {
      console.log("Error in the response", res1.status);
      return setError;
    }
    console.log("book added");
    setOption(null);     
    }
                                 
  } catch (error) {
    console.log("An Error has occured", error);
  }
}

async function Delete(e, book_name, setOption,setError) {
  e.preventDefault();
  setError(null);
  try {
    const token = localStorage.getItem("token");
    const res1 = await fetch(`http://localhost:5000/removebook`, { 
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ book_name }),
    });
    if (!res1.ok) {
      console.log("Error in the response", res1.status);
      setError("This book is not in your list");
      return setError;
    }
    console.log("book deleted");
    setOption(null);
  } catch (error) {
    console.log("An Error has occured", error);
  }
}

const View = ({ option, setOption }) => {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      let path = option;
      if(path === "view1"){
        path = "bookadded";
      }else{
        path = "disponible"
      }
      try {
        const res = await fetch(`http://localhost:5000/${path}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        if (!res.ok) {
          if(option === "view1"){
            setError("your list is empty");
          }else{
            setError("An error occured");
          }
          return;
        }
        const data = await res.json();     
        setBooks(data.books);
      } catch (error) {
        console.log("An error occured", error);
        setError("Could not connect to the server");
      }
    }
    load();
  }, [option]);          

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {books.map((b, i) => <li key={i}>{b.book_name}</li>)}
      </ul>
      <button onClick={() => setOption(null)}>Back</button>
    </div>
  );
};

const Form = ({ option, setOption }) => {
  const [error, setError] = useState(null);
  if (option !== "add" && option !== "delete") {
    if (option === "view" || option === "view1") {
      return <View option={option} setOption={setOption} />;
  }
  }

  return (
    <form onSubmit={(e) =>
      (option == "add" ? ADD : Delete)(e, e.target.elements["book_name"].value, setOption, setError)
    }>
      {error && <p>{error}</p>}                           
      <div>
        <label>Title of the book</label>
        <input name="book_name" type="text" placeholder="book title" required />
      </div>

      <div>
        <button type="button" onClick={() => setOption(null)}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};