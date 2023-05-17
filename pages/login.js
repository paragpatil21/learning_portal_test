import React, { useEffect, useState, } from 'react';
import App from './App';
import {
  AuthProvider,
  AuthService,
  useAuth,
} from 'react-oauth2-pkce'
import Cookies from "js-cookie";

const axios = require("axios");
import { API_URL } from "../config/constants";
import { Router, useRouter } from 'next/router';




function SecuredApp() {
    const { authService } = useAuth();
    console.log(authService)
    const [email,setEmail] = useState()
    const [isApiCallMade, setIsApiCallMade] = useState(false);
    const [loginMessage, setLoginMessage] = useState({
        type: "",
        message: "",
        icon: "",
      });
    
const router=useRouter()

useEffect(() => {
  if(authService.isAuthenticated())
  {
    router.push("/")
  }

  
}, [authService.isAuthenticated()])
    const login = async () => authService.authorize();
  const logout = async () => {authService.logout(true),
        Cookies.remove("student_login_token");
        Cookies.remove("student_data");
    };

    if (authService.isPending()) {
     
        return <div>
            Loading...
            <button onClick={() => { logout(); login(); }}>Reset</button>
        </div>
    }

    if (!authService.isAuthenticated()) {
          login();
      
        return (
          <></>
            // <div className='text-center bg-blue-600 text-xl'>
            //     <p>Not Logged in yet</p>
            //    <a href="/"> <p>continue without login</p></a>
            //     <button onClick={login}>Login</button>
            // </div>
        )
    }
   
    
    if(email && !isApiCallMade){
        setIsApiCallMade(true);
        // console.log(email)
        axios.post(API_URL+"get_logged_user.php",{
            email:email

        })
        .then(function (response) {
            if (response?.data?.meta?.error) {
              setLoginMessage({
                type: "error",
                message: response.data?.meta?.message,
                icon: "error",
              });
            }
            if (!response?.data?.meta?.error) {
                
              setLoginMessage({
                type: "success",
                message: response.data?.meta?.message,
                icon: "loading",
              });
              Cookies.set("student_login_token", response.data?.data?.id, {
                expires: 10,
              });
              console.log("studentdata",response.data)
              Cookies.set("student_data", JSON.stringify(response.data?.data), {
                expires: 10,
              });
              if (response.data?.data) {
                if (refer) {
                  router.push(refer);
                } else {
                  //if(response.data.user==="student")
                    router.push("/");
                  //else
                  //  router.push("/admin/students");
                }
              }
            }
          }) 
          .catch(function (error) {
            console.log(error);
          });
          // router.push("/")
          
    }


    const token = authService.getAuthTokens();
    return (
      //   <div>
      //       <button onClick={logout} className='text-xl border-2 m-8 shadow-lg'>Logout</button>
      //       <p>You are able to go to springboard for more courses and content</p>
      //       <a href="https://infyspringboard.staging.onwingspan.com/web/en/page/home" target="_blank" rel="noopener noreferrer">
      //   <button className='text-xl border-2 m-8 shadow-lg'>Go to infosys Springboard</button>
      // </a>
      //       <App setEmail={setEmail} />
      //   </div>
      <App setEmail={setEmail} />
    );
}
export default SecuredApp

// function WrappedSecuredApp() {
//     const [authService, setAuthService] = useState(null);

//     useEffect(() => {
//         setAuthService(
//             new AuthService({
//                 clientId: 'LMS-Auth',
//                 authorizeEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/auth',
//                 tokenEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/token',
//                 logoutEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/logout',
//                 redirectUri: 'http://localhost:3000/login/',
//                 scopes: ['openid'],
//             })
//         );
//     }, []);

//     if (!authService) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <AuthProvider authService={authService}>
//             <SecuredApp />
//         </AuthProvider>
//     );
// }

// export default WrappedSecuredApp;
