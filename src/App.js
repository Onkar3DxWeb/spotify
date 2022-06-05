import React, { useEffect} from "react";
import './App.css';
import Login from './Login';
import Player from './Player';
import {getTokenFromResponse} from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider"

const spotify = new SpotifyWebApi();

function App() {
  
  const [{ token}, dispatch] = useStateValue();
  
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;
   
    if(_token){
     
       
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);

      spotify.getMe().then(user =>{
        console.log(" ",user);
        console.log(" ", token);
        
          dispatch({
            type: "SET_USER",
            user,
          });
        
          spotify.getUserPlaylists().then((playlists) => {
            dispatch({
              type: "SET_PLAYLISTS",
              playlists,
            });
          });
      })
    }
    
   

    console.log(" i have a token",_token);
  }, [token, dispatch]);
  return (
    <div className="App">
      {
      token ? (<Player spotify={spotify}/>):(<Login/>)
      }
      
          </div>
  );
}

export default App;
