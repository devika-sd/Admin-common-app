import jwt from 'jwt-decode';

const currentUser = () => {
    var token = localStorage.getItem('token');
    console.log(token)
    if(token)
    {
       let temp1=jwt(token);
       console.log("***************"+temp1.isAdmin);
       return temp1._id;
    }
    else
    {
        return "";
    }
 }

 const isAutenticated = () => {
    var token = localStorage.getItem('token');
    console.log(token)
    if(token)
    {
       let temp1=jwt(token);
       console.log("***************"+temp1.isAdmin);
       return temp1.isAdmin;
    }
    else
    {
        return false;
    }
 }

 const isTokenExpires = () =>{
   var token = localStorage.getItem('token');
   console.log(token)
   if(token)
   {
      let temp1=jwt(token);
      console.log("***************"+temp1.exp);
      var value = new Date(temp1.exp*1000)-new Date()
      if(value>0)
      {
         console.log("*******true********");
         return true
      }
      else
      {
         console.log("*******false********");
         return false
      }
   }
   else
   {
       return false;
   }
 }

 export default {currentUser,isAutenticated,isTokenExpires};