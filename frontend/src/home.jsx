import { useState } from "react";
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
      <Form setOption={setOption}></Form>
      }
</div>

  );
}

const ADD = () =>{
  async function handlesubmit(e) {
    e.preventDefault();
    try {
    const res = await fetch(`http://localhost:5000/addbook`,{
      method : "PUT",
      body : "title"
    })
    if(!res.ok){
      console.log("Error in the response");
      return;
    }
    console.log("book added");
    } catch (error) {
      console.log("An Error has occured",error);
    }
  }
  handlesubmit();
}


const  Delete = () =>{
  async function handlesubmit(e) {
    e.preventDefault();
    try {
    const res = await fetch(`http://localhost:5000/addbook`,{
      method : "DELETE",
      body : "title"
    })
    if(!res.ok){
      console.log("Error in the response");
      return;
    }
    console.log("book deleted");
    } catch (error) {
      console.log("An Error has occured",error);
    }
  }
  handlesubmit();
}

const Form = ({setOption}) => {
    return(
      <div>
        {
          setOption == "add" ?
        <form onSubmit={setOption(null) && ADD}>
        <div>
          <label>Title of the book</label>
          <input type="text" placeholder="book title" />
        </div>

        <div>
          <button onClick={setOption(null)}>Back</button>
          <button>Submit</button>
        </div>
      </form> :
        
      <form onSubmit={setOption(null) && Delete}>
        <div>
          <label>Title of the book</label>
          <input type="text" placeholder="book title" />
        </div>

        <div>
          <button onClick={setOption(null)}>Back</button>
          <button>Submit</button>
        </div>
      </form>
        } 

      </div>

    )
}