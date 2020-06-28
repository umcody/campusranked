import React,{useState} from "react";

function CreateSchool() {

    const [schoolName, setSchoolName] = useState("");
    const [schoolFullName, setSchoolFullName] = useState("");
    const [state, setState] = useState("");
    const [isPublic, setPublic] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [gym, setGym] = useState([]);
    const [residentialhall, setResidentialhall] = useState([]);
    const [dininghall, setDininghall] = useState([]);
    const [library, setLibrary] = useState([]);

    function submit(){
        const data = fetch("/api/admin/newSchool", { // FETCH TO LOGIN
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                schoolName: schoolName,
                schoolFullName: schoolFullName,
                state: state,
                public: isPublic,
                latitude: latitude,
                longitude: longitude,
                gym:gym,
                residentialhall:residentialhall,
                dininghall:dininghall,
                library:library
            })
        });
    }

  return (
  <div style = {{"position":"absolute", "top":"40%", "left": "50%", "transform":"translate(-50%,-50%)"}}>
      <form>
          <input type = "text" onChange={(e)=> {setSchoolName(e.target.value)} } placeholder = "School Name"></input>
          <input type = "text" onChange={(e)=> {setSchoolFullName(e.target.value)}} placeholder = "School Full Name" ></input>
          <input type = "text" onChange={(e)=> {setState(e.target.value)} } placeholder = "State"></input>

          <input type = "text" onChange={(e)=> {setLatitude(e.target.value)} } placeholder = "Latitude"></input>
          <input type = "text" onChange={(e)=> {setLongitude(e.target.value)} } placeholder = "Longitude"></input>


          <input type = "radio" value = "true"onClick={(e)=> {setPublic(Boolean(e.target.value))} } placeholder = "Public"></input>
          <input type = "radio" value = "false" onClick={(e)=> {setPublic(Boolean(e.target.value))} } placeholder = "Private"></input>

          <input type = "text" onChange={(e)=> {setGym(e.target.value.split(","))} } placeholder = "Gym Buildings"></input>
          <input type = "text" onChange={(e)=> {setResidentialhall(e.target.value.split(","))} } placeholder = "ResidentialHall Buildings"></input>
          <input type = "text" onChange={(e)=> {setDininghall(e.target.value.split(","))} } placeholder = "Dininghall Buildings"></input>
          <input type = "text" onChange={(e)=> {setLibrary(e.target.value.split(","))} } placeholder = "Library Buildings"></input>

      </form>
      <p onClick= {submit}> SUBMIT</p>
  </div>
  );
}
export default CreateSchool;