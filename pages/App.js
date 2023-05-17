import jwtDecode from 'jwt-decode';
import { useAuth } from 'react-oauth2-pkce';
import styles from '../styles/Home.module.css';

// function loopJWT(jwt) {
//   console.log(jwt);

//   const liList = Object.keys(jwt).map(function (key) {
//     if (
//       Array.isArray(jwt[key]) ||
//       (!(typeof jwt[key] === 'string' || jwt[key] instanceof String) &&
//         Object.keys(jwt[key]).length > 0)
//     ) {
//       const sublist = loopJWT(jwt[key]);
//       return (
//         <li key={key}>
//           {key} {sublist}
//         </li>
//       );
//     } else {
//       return (
//         <li key={key}>
//           {key}: {jwt[key]}
//         </li>
//       );
//     }
//   });

//   return <ul>{liList}</ul>;
// }

export default function App({setEmail}) {
  const { authService } = useAuth();
  const jwtPayload = jwtDecode(authService.getAuthTokens().access_token);
  const roles = jwtPayload.groups || [];
  // const jwtList = loopJWT(jwtPayload);
  // console.log(jwtPayload);
  setEmail(jwtPayload.email)
  return (
    <></>
    // <div className={styles.container}>
    //   <h1>Logged in</h1>
    //   <h2>JWT</h2>
    //   {jwtList}
    // </div>
  );
}
