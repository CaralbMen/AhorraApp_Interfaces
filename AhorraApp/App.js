import databaseService from "./database/db";
import React, {useEffect} from 'react';
import Login from "./screens/Login"
// import React, { useEffect } from 'react';
// import { iniciarBaseDeDatos } from './database/db';

//Function principal
export default function App() {
  useEffect(() => {
    (async()=>{
      try{
        databaseService.init();
        await databaseService.seed();
      }catch(error){
        console.warn(error);
      }
    })();
  }, []);
  return <Login/>
}
