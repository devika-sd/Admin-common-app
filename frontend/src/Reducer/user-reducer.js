import * as actions from '../Actions/user-action';
let initialState = {
    users: [
        {
            email:'',
            password:'',
            name:'',
            photo:'',
            phone:'',
            addresses:[]
        }
    ],
    currentUser: "",
    totaluser: "",
    message:'',
    rolewisefilter:'none'
}

// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) => {
    console.log('Action recieved at reducer***  ', action);
    switch (action.type) {
        case actions.FETCH_USERS:
            return {
                ...state,
                message: action.payload.message,
                users: action.payload.data,
                totaluser: action.payload.total,
            }
        case actions.UPDATE_USER:
            return {
                ...state,
                users: action.payload.data,
                message: action.payload.message
            }
        case actions.LOGIN_USER:
            return {
                // users: action.payload
                ...state,
                currentUser: action.payload.userid,
                message: action.payload.message
            }
        case actions.ERROR_USER:
            return {
                // users: action.payload 
                ...state,
                message: action.payload.message
            }
        case actions.ADD_USER:
            return {
                ...state,
                message: action.payload.message
            }
        case actions.FILTER_USER:
            return {
                ...state,
                users: action.payload.data,
                totaluser: action.payload.total
            }
        case actions.SET_FILTER_ROLE:
            return {
                ...state,
                rolewisefilter:action.payload
            }
        case actions.RESET_MESSAGE:
            return {
                ...state,
                message:action.payload
            }
        case actions.RESET_USER: return initialState 
        default: return state
    }

}

export default reducer;