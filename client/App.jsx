import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ChirpCard from "./components/ChirpCard.jsx";

const App = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chirps, setChirps] = useState([]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);
  /*const handleChirpSubmit = (e) => {
    e.preventDefault();

    const newChirp = {
      id: uuidv4(),
      username: username,
      message: message,
      created: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    };

    setChirps([...chirps, newChirp]);
  };*/

  useEffect(() => {
    console.log("Getting chirps...");
    getChirps()

  }, []);

  const getChirps = () => {
    fetch('http://localhost:3000/api/chirps')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(allChirps => {
        //console.log(allChirps[0]);
        setChirps(allChirps);
      });
  }

  const handleDeleteChirp = id => {
    fetch('http://localhost:3000/api/chirps/' + id, {
      method: "DELETE"
    });

    getChirps();
  }

  const handlePostChirp = (e) => {
    e.preventDefault();

    let i=0;
    //console.log('hello');
    for (i; i < chirps.length; i++) {

      if (chirps[i].username == username) {
        fetch('http://localhost:3000/api/chirps', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: null,
            userid: chirps[i].userid,
            content: message,
            location: chirps[i].location
          })
        })
          .then(response => response.json())
          .then(chirp => {
            console.log('Success:', chirp);
            getChirps();
          })
          .catch((error) => {
            console.error('Error:', error);

          })
        return;
      }  
    }
    alert('Username not found! Please register at a later date. :^)');
  }
    const handlePutChirp = (id, userid, location) => {

      /*fetch('http://localhost:3000/api/chirps/' + id)
        .then(response => response.json())
        .then(chirp => {
          console.log('Success:', chirp);
        })
        .catch((error) => {
          console.error('Error:', error);
        })*/

      fetch('http://localhost:3000/api/chirps/' + id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userid: userid,
          content: message,
          location: location
        })
      })
        .then(response => response.json())
        .then(edit => {
          console.log('Success:', edit);
          getChirps();
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    }

    return (
      <>
        <div className="container text-body text-center">
          <div className="row">
            <div className="col-12 p-0">
              <nav>
                <img
                  className="banner"
                  src="./assets/banner.jpg"
                  alt="logo for awesome site yay"
                />
                <h1>Ghibli Chirpr</h1>
              </nav>
            </div>
          </div>
          <div className="row">
            <form action="">
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Username"
                  aria-label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <textarea
                  className="form-control mb-2"
                  aria-label="With textarea"
                  placeholder="(500 characters max)"
                  value={message}
                  onChange={handleMessageChange}
                  cols="30"
                  rows="10"
                ></textarea>
                <button className="btn btn-dark" onClick={handlePostChirp}>
                  Chirp It!
                </button>
              </div>
            </form>
            <div className=" chirps mb-4">
              {chirps.map((chirp) => (
                <ChirpCard
                  key={chirp.id}
                  id={chirp.id}
                  username={chirp.username}
                  userid={chirp.userid}
                  content={chirp.content}
                  posttime={chirp.posttime}
                  handleDeleteChirp={handleDeleteChirp}
                  handlePutChirp={handlePutChirp}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  export default App;
