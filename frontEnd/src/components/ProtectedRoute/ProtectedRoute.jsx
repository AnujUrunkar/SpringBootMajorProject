import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children , role})=>{

    const {authState} = useAuth();

    if(!authState.isVerified){
        return <Navigate to="/signin" replace/>   
    }

    if(role === "both"){
        return children ;
    }
    if(authState.user.authorities !== role){
        return <Navigate to="/unAuthorized" replace/>
    }

    return children ;
}

export default ProtectedRoute ;
