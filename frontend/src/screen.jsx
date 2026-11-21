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
            <h1>Welcome to the Small Library</h1>
        </div>
        <div className="buttons">
            <button onClick={() => setx("createacc")}>Create account</button>
            <button onClick={() => setx("signin")}>Log in</button>
        </div>
        </div> : 
         <Home>

         </Home>
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
    <form onSubmit={(e) => handlesubmit(e, e.target.elements["name"].value, e.target.elements["mdps"].value) }>
        {error && <p>{error}</p>}
        <div>
        <div>
            <label htmlFor="name">Name</label>
            <input name="name" id="name" type="text" placeholder="name" />
        </div>

        <div>
        <label htmlFor="password">Password</label>
        <input name="mdps" id="password" type="password" placeholder="password" minLength={8} />
        </div>
        </div> 



  <div className="buttonsform">
    <button type="button" onClick={onback}>
      Back
    </button>
    <button type="submit">
        Submit
    </button>
  </div>
</form>
    )
}