import React, { useState } from 'react' ;
import { createContext , useContext } from 'react';

const AuthContext = createContext() ;

export const AuthProvider = ({children}) =>{

    const [authState , setAuthState]  = useState({

        isVerified: false ,
        user : null        
    });

    const login = (userDetails) =>{
        setAuthState({
            isVerified: true ,
            user :  userDetails
        });
    }

    const logOut = ()=>{
        setAuthState({
            isVerified: false ,
            user :  null
        });
    }

    return(

        <AuthContext.Provider value={{authState ,login , logOut }} >
            {children}
            
        </AuthContext.Provider>
    )
    
}

export const useAuth = () => {
    return useContext(AuthContext);
};
