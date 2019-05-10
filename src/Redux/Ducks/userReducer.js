import axios from "axios";

const initialState = {
    name: '',
    email: '',
    phoneNumber: 0,
    img: '',
    isTeacher: false,
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
    const userInfo = axios.get('/api....').then(res => {
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
            return {...state,
                    name: action.payload.name,
                    email: action.payload.email,
                    phoneNumber: action.payload.number,
                    img: action.payload.img,
                    isTeacher: action.payload.isTeacher}
        }
        case LOGOUT + "_FULFILLED": {
            return {...state, initialState}
        }
        default: {
            return {...state}
        }
    }
}