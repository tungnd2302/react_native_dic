import { LOADING } from "./constants";
import { initState } from "./state"

const CommonsReducer = (state = initState, action) => {
    console.log(action.payload,111)
    switch (action.type) {
        case LOADING:
            return {
                ... state, 
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default CommonsReducer;