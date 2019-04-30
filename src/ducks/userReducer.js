import axios from "axios"

const initialState = {
    user: {},
    vacation: [],
    loading: true,
}

const GET_DATA = "GET_DATA"
const GET_VACAY = "GET_VACAY"
const GET_VACAY_BY_ID = "GET_VACAY_BY_ID"
const GET_LISTS = "GET_LISTS"
const GET_BUDGET = "GET_BUDGET"
const GET_TOTAL_BUDGET = "GET_TOTAL_BUDGET"
const CHECKED = "CHECKED"

export function getData() {
    return {
        type: GET_DATA,
        payload: axios.get(`/auth/user-data`).then((res) => res.data)
    }
}
export function getVacay() {
    return {
        type: GET_VACAY,
        payload: axios.get(`/api/vacation`).then((res) => res.data)
    }
}
export function getLists(vacation_id) {
    let data = axios.get(`/api/list/${vacation_id}`).then((res) => res.data)
    return {
        type: GET_LISTS,
        payload: data,
    }
}

export function getVacayById(id) {
    let data = axios.get(`/api/vacation-id/${id}`).then((res) => res.data)
    return {
        type: GET_VACAY_BY_ID,
        payload: data,
    }
}

export function getBudget(id) {
    let data = axios.get(`/api/budget/${id}`).then((res) => res.data)
    return {
        type: GET_BUDGET,
        payload: data,
    }
}

export function getTotalBudget(id) {
    let data = axios.get(`/api/totalbudget/${id}`).then((res) => res.data)
    return {
        type: GET_TOTAL_BUDGET,
        payload: data,
    }
}

export function checked(id) {
    let data = axios.get(`/api/checked/${id}`).then((res) => res.data)
    return {
        type: CHECKED,
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
            return { ...state, vacation: action.payload, loading: false }

        case GET_VACAY + "_REJECTED":
            return { ...state, loading: false }

        case GET_LISTS + "_FULFILLED":
            return { ...state, lists: action.payload }

        case GET_VACAY_BY_ID + "_FULFILLED":
            return { ...state, vacationID: action.payload, loading: false }

        case GET_BUDGET + "_FULFILLED":
            return { ...state, budget: action.payload }

        case GET_TOTAL_BUDGET + "_FULFILLED":
            return { ...state, totalBudget: action.payload }

        case CHECKED + "_FULFILLED":
            return { ...state, check: action.payload }

        default:
            return state
    }
}
