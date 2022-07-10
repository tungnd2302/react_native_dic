import { LOADING } from "./constants";

export const reloadPage = (isLoading) => {
    return {
        type : LOADING,
        payload : isLoading
    }
}