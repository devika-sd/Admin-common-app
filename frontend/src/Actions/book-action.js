import authHeader from '../services/auth-header'

export const ADD_BOOK = "ADD_BOOK"
export const ERROR_BOOK = "ERROR_BOOK"
export const FETCH_BOOKS = "FETCH_BOOKS"
const saveBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book
    }
}

export const addbook = (book) => {
    //add your code

    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/', {
            method: 'POST',
            headers: authHeader(),
            body: JSON.stringify(book)
        })
            .then(res => res.json())
            .then(book => {
                console.log(book)
                if(book.success)
                {
                  
                    dispatch(saveBook(book));
                }
                else
                {
                    dispatch({
                        type: ERROR_BOOK,
                        payload: book
                    });
                }
                
            })
    }
}

export const fetchbooks = (filter,message='') => {
    //add your code
    console.log("***************"+filter);
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book?sort=title&' + filter , {
            headers: authHeader()
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.total)
                var newdata = {...data,message}
                dispatch({ type: FETCH_BOOKS, payload: newdata });
            })
    }
}


export const deletebooks = (title, filter) => {
    //add your code
    return dispatch => {
        fetch('http://localhost:8080/api/v1/book/' + title, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' }
            headers: authHeader()
        
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                dispatch(fetchbooks(filter,data.message));
            });
    }
}