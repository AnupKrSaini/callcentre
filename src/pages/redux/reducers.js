import actionworkReducers  from './actionworkReducers';
import { combineReducers } from "redux";
 const rootReducer=combineReducers({
   Actionwork:actionworkReducers
 });

 export  default rootReducer;