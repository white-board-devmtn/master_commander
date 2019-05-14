import axios from "axios";

const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    img: '',
    isTeacher: false,
    loggedIn: false,
}

// ACTION TYPES //
const LOGIN = "LOGIN"
const LOGOUT = "LOGOUT"


// ACTION CREATORS //
export function loginUser(loginInfo) {
    const userInfo = axios.post('/Login', loginInfo).then(res => {
        return res.data;
    });
    return {
        type: LOGIN,
        payload: userInfo
    }
};

export function getUser() {
    const userInfo = axios.get('/api/getuser').then(res => {
        
        return res.data;
    })
    return {
        type: LOGIN,
        payload: userInfo
    }
};

export function logOutUser() {
    axios.delete('/Logout').then(res => {
        return res.data
    })
    return {
        type: LOGOUT
    }
};



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN + "_FULFILLED": {
            return {...state,
                    id: action.payload.userData.id,
                    firstName: action.payload.userData.firstName,
                    lastName: action.payload.userData.lastName,
                    email: action.payload.userData.email,
                    phoneNumber: action.payload.userData.phoneNumber,
                    img: action.payload.userData.img,
                    isTeacher: action.payload.userData.isTeacher,
                    loggedIn: true
                }
        }
        case LOGOUT + "_FULFILLED": {
            return {...state, initialState}
        }
        default: {
            return state
        }
    }
}