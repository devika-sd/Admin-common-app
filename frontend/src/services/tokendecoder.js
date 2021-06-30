import jwt from 'jwt-decode';

const currentUser = () => {
    var token = localStorage.getItem('token');
    console.log(token)
    if(token)
    {
       let temp1=jwt(token);
       console.log("***************"+temp1);
       return temp1._id;
    }
    else
    {
        return "";
    }
 }

 export default {currentUser};