import { actiontype } from "./actiontype";

const  initialState={Name:'Hello',CallId:0, LoggedInUser:0,UName:'',UserTypeName:'',UserType:0,currentUser:false,Session:''};

const actionworkReducers=(state=initialState, action)=>{

    if(action.type === actiontype.AddAssignClick) {
        return {
            ...state,
            CallId: action.payload
         };
       }
        else if(action.type === actiontype.UpdateUserId)
        {
            return {
                ...state,
                LoggedInUser: action.payload
             };
        }
        else if(action.type === actiontype.UpdateUName)
        {
            return {
                ...state,
                UName: action.payload
             };
        }
        else if(action.type === actiontype.UpdateUserTypeName)
        {
            return {
                ...state,
                UserTypeName: action.payload
             };
        }
        else if(action.type === actiontype.UpdateUserType)
        {
            return {
                ...state,
                UserType: action.payload
             };
        }
        else if(action.type === actiontype.UpdatecurrentUser)
        {
            return {
                ...state,
                currentUser: action.payload
             };
        }
        else if(action.type === actiontype.UpdateSession)
        {
            return {
                ...state,
                Session: action.payload
             };
        }
       return state;
    
}

export  default actionworkReducers;