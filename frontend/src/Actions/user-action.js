import authHeader from '../services/auth-header'

export const FETCH_USERS = "FETCH_USERS"
export const UPDATE_USER = "UPDATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const ADD_USER = "ADD_USER"
export const ERROR_USER = "ERROR_USER"
export const FILTER_USER = "FILTER_USER"
export const RESET_USER = "RESET_USER"
export const SET_FILTER_ROLE='SET_FILTER_ROLE'
export const RESET_MESSAGE='RESET_MESSAGE'
var URL = 'http://localhost:8080'
export const filteruserbyname = (filter) => {
    //add your code
    // console.log("***************"+name,page,limit,rolefilter);
    // var filter = 'email[regex]='+name+'&page='+page+'&limit='+limit+rolefilter;
    console.log("*************"+filter+"************")
    if(filter.includes("&isAdmin=none"))
    {
        filter=filter.replace("&isAdmin=none",'');
    } 
    return dispatch => {
        fetch(URL+'/api/v1/users/?sort=name&'+filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ users: data.data })
                console.log(data)
                dispatch({ type: FILTER_USER, payload: data });
            })
    }
}

export const fetchusers = (filter,message='') => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch(URL+'/api/v1/users?sort=name&' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                //this.setState({ users: data.data })
                console.log(data.total)
                var newdata = {...data,message}
                dispatch({ type: FETCH_USERS, payload: newdata });
            })
    }
}

export const updateusers = (_id,roleData) => {
    //add your code
    return dispatch => {
        fetch(URL+'/api/v1/users/'+_id,
            {
                method: 'PUT',
                headers: authHeader(),
                body: JSON.stringify(roleData)
            })
            .then(res=>res.json())
            .then(data => {
                console.log("*************"+data.success);
                if (data.success === true) {
                    // this.setState({ message: "Successfully inserted" })
                    dispatch({ type: UPDATE_USER, payload: data });
                }
                else{
                    console.log("*************"+data.success);
                    dispatch({
                        type: ERROR_USER,
                        payload: data
                    });
                }
            })
    }
}

export const deleteusers = (email, filter) => {
    //add your code
    return dispatch => {
        fetch(URL+'/api/v1/users/' + email, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' }
            headers: authHeader()
            //body: JSON.stringify(inputs)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                dispatch(fetchusers(filter,data.message));
            });
    }
}

export const blockusers = (email, status, filter) => {
    //add your code
    return dispatch => {
        fetch(URL+'/api/v1/users/block/' + email + '&' + !status, {
            method: 'PATCH',
            // headers: { 'Content-Type': 'application/json' }
            //body: JSON.stringify(inputs)
            headers: authHeader()
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                //dispatch({type: MESSAGE_USER,payload:data});
                dispatch(fetchusers(filter,data.message));
            });
    }
}

export const loginusers = (user) => {
    //add your code
    return dispatch => {

        return fetch(URL+'/api/v1/users/login', {
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // localStorage.setItem('token', data.token);
                    console.log("token"+data.token)
                    localStorage.setItem('token', data.token);
                    dispatch({
                        type: LOGIN_USER,
                        payload: data
                    });
                    // show an alert message or transition into dashboard component ERROR_USER
                }
                else {
                    dispatch({
                        type: ERROR_USER,
                        payload: data
                    });
                }
            })
        }
}
const saveUser = (users) => {
    return {
        type: ADD_USER,
        payload: users
    }
}

export const addusers = (user) => {
    //add your code
    return dispatch => {
        fetch(URL+'/api/v1/users/', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(users => {
                console.log(users)
                if(users.success)
                {
                    // dispatch(fetchusers(""));
                    dispatch(saveUser(users));
                }
                else
                {
                    dispatch({
                        type: ERROR_USER,
                        payload: users
                    });
                }
                
            })
    }
}
