import { combineReducers } from "@reduxjs/toolkit"
import dataLocalReducer from './dataLocalSlice'
const rootReducer = combineReducers({
    dataLocal: dataLocalReducer
})



export default rootReducer