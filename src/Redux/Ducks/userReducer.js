import axios from "axios";

const initialState = {
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
        console.log('UR', res.data.userData)
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
    axios.delete('/api.....').then(res => {
        return res.data
    })
    return {
        type: LOGOUT
    }
};



export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN + "_FULFILLED": {
            console.log(action.payload.userData)
            return {...state,
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
            return {...state}
        }
    }
}