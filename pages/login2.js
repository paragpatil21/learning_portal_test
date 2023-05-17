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



function SecuredApp() {
    const { authService } = useAuth();
    const [email,setEmail] = useState()
    const [isApiCallMade, setIsApiCallMade] = useState(false);
    const [loginMessage, setLoginMessage] = useState({
        type: "",
        message: "",
        icon: "",
      });
    

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
        return (
            <div>
                <p>Not Logged in yet</p>
                <button onClick={login}>Login</button>
            </div>
        )
    }
   
    
    if(email && !isApiCallMade){
        setIsApiCallMade(true);
        console.log(email)
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
    }


    const token = authService.getAuthTokens();
    return (
        <div>
            <button onClick={logout}>Logout</button>
            
            {/* <link href='https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/login-actions/authenticate?client_id=https%3A%2F%2Finfyspringboard.staging.onwingspan.com%2Fauth%2Frealms%2Finfyspringboard&tab_id=yvrzf9DQSlQ'>infyspringboard</link> */}
            <a href="https://infyspringboard.staging.onwingspan.com/web/en/page/home" target="_blank" rel="noopener noreferrer">
        <button>Click</button>
      </a>
            <App setEmail={setEmail} />
        </div>
    );
}

function WrappedSecuredApp() {
    const [authService, setAuthService] = useState(null);

    useEffect(() => {
        setAuthService(
            new AuthService({
                clientId: 'LMS-Auth',
                authorizeEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/auth',
                tokenEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/token',
                logoutEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/logout',
                redirectUri: 'http://localhost:3000/login2/',
                scopes: ['openid'],
            })
        );
    }, []);

    if (!authService) {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider authService={authService}>
            <SecuredApp />
        </AuthProvider>
    );
}

export default WrappedSecuredApp;
