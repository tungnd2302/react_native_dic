import { createStore } from "redux";
import { rootReducer } from "./src/redux/rootReducer.js"
export const store = createStore(rootReducer)