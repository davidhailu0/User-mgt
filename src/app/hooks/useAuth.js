import { useContext } from 'react'
import AuthContext from 'app/contexts/JWTAuthContext'

const useAuth = () => useContext(AuthContext)

export default useAuth


// import { useContext } from "react";
// import AuthContext from "app/contexts//AuthProvider";
// // import useAuth from '../hooks/useAuth';
// const useAuth = () => {
//     return useContext(AuthContext);
// }

// export default useAuth;