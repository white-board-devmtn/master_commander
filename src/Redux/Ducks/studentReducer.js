import axios from 'axios';

const initialState = {
    students: []
};


// ACTION TYPE
const GET_STUDENTS = "GET_STUDENTS";


// ACTION CREATOR //

export function getStudents() {
    const students = axios.get('/api....').then(res => {
        return res.data;
    });
    return {
        type: GET_STUDENTS,
        payload: students
    }
}

// REDUCER //

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS + "_FULFILLED": {
            return {...state, students: action.payload}
        }
        default: {
            return {...state}
        }
    };
};