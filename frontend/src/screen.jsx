import { useState } from "react"
import { Home } from "./home";
export const Screen = ()=>{
    const [x, setx] = useState(null);  
    const [page,setPage] = useState(1);
    if (x) return <Form1 x={x} onback={() => setx(null)} onlogin={() => setPage(0)} />;  

    return(
        <div>
            {
                page ? <div className="screencontainer">
        <div className="title">
            <span className="logo">📚</span>
            <h1>Welcome to the Small Library</h1>
            <p className="tagline">Find, collect and keep track of the books you love.</p>
        </div>
        <div className="buttons">
            <button className="primary" onClick={() => setx("createacc")}>Create account</button>
            <button className="secondary" onClick={() => setx("signin")}>Log in</button>
        </div>
        </div> : 
         <Home />
            }
        </div>

    )
}

const Form1 = ({x, onback,onlogin}) => {
    const [error, setError] = useState(""); 
   async function handlesubmit(e,name,mdps){
        e.preventDefault();
        setError("");
        try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/${x}`, {
        method: "POST",
        headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, mdps }),
      });

            if(!res.ok){
                console.log("There is an error in the res");
                const err = await res.json().catch(() => ({}));
                console.log("Status:", res.status, err);
                if(x == "signin"){
                    setError("Wrong password or username");
                }
                return;
            }
            const data = await res.json(); 
            if (x === "signin") {
            localStorage.setItem("token", data.token);  
            onlogin();
            }
            console.log("info sent");
            onback();
            return data;           
            } catch (error) {
                console.log("An Error occured",error);
            
            }
        }


    return(
    <div className="authpage">
    <form className="card" onSubmit={(e) => handlesubmit(e, e.target.elements["name"].value, e.target.elements["mdps"].value) }>
        <h2>{x === "createacc" ? "Create account" : "Log in"}</h2>
        {error && <p className="error">{error}</p>}
        <div className="field">
            <label htmlFor="name">Name</label>
            <input name="name" id="name" type="text" placeholder="name" />
        </div>

        <div className="field">
        <label htmlFor="password">Password</label>
        <input name="mdps" id="password" type="password" placeholder="password" minLength={8} />
        </div>

        <div className="buttonsform">
            <button className="secondary" type="button" onClick={onback}>
              Back
            </button>
            <button className="primary" type="submit">
                Submit
            </button>
        </div>
    </form>
    </div>
    )
}