import "nprogress/nprogress.css";
import "../styles/globals.css";
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import NProgress from 'nprogress';
import {
  AuthProvider,
  AuthService,
  useAuth,
} from 'react-oauth2-pkce'
import { useEffect, useState } from "react";


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
  const [authService, setAuthService] = useState(null);

    useEffect(() => {
        setAuthService(
            new AuthService({
                clientId: 'LMS-Auth',
                authorizeEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/auth',
                tokenEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/token',
                logoutEndpoint: 'https://nirmaan-wep.azurewebsites.net/auth/realms/Springboard/protocol/openid-connect/logout',
                 redirectUri: 'http://shiksha-staging.nirmaan.org/',
                scopes: ['openid'],
            })
        );
    }, []);
    if (!authService) {
      return <div>Loading...</div>;
  }


  return (
    <>
    <AuthProvider authService={authService}>
      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
