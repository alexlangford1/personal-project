import axios from "axios"

const initialState = {
    user: {},
    vacation: [],
    loading: true,
}

const GET_DATA = "GET_DATA"
const GET_VACAY = "GET_VACAY"
const GET_LISTS = "GET_LISTS"

export function getData() {
    let data = axios.get("/auth/user-data").then((res) => res.data)
    return {
        type: GET_DATA,
        payload: data,
    }
}
export function getVacay() {
    let data = axios.get("/api/vacation").then((res) => res.data)
    return {
        type: GET_VACAY,
        payload: data,
    }
}
export function getLists(vacation_id) {
    let data = axios.get(`/api/list/${vacation_id}`).then((res) => res.data)
    return {
        type: GET_LISTS,
        payload: data,
    }
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATA + "_FULFILLED":
            return { user: action.payload }

        case GET_VACAY + "_PENDING":
            return { ...state, loading: true }

        case GET_VACAY + "_FULFILLED":
            return { ...state, vacation: action.payload }

        case GET_VACAY + "_REJECTED":
        return {...state, loading: false}

        case GET_LISTS + "_FULFILLED":
            return { ...state, lists: action.payload }

        default:
            return state
    }
}
