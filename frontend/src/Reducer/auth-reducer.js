import * as actions from '../Actions/auth-actions';
let initialState = {
    authenticated: false
}
// Reducers in store to modify state -- don't directly manipulate state
const reducer = (state = initialState, action) =>{
    console.log('Action recieved at reducer***  ', action);
    switch(action.type){
        case actions.USER_LOGIN:
            return {
                authenticated: action.payload
            }  
        case actions.RESET_AUTH: return initialState    
        default : return state
    }

}
export default reducer;