import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../../config/constants";
import Alert from "../../components/ui/alert";
import Cookies from "js-cookie";
const axios = require("axios");

export default function Home(){    
    const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
    const router = useRouter();

    function Login(e) {
        e.preventDefault();
        axios
        .post(API_URL+"entrance_exam/login.php", new FormData(loginForm))
        .then(function (response) {
            console.log(response.data?.data);
            if (response?.data?.meta?.error) {
              setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
            }
            if (!response?.data?.meta?.error) {
              setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "success" });
              Cookies.set("student_login_token", response.data?.data?.ID, { expires: 10 });
              Cookies.set("student_data", JSON.stringify(response.data?.data), { expires: 10 });
              if (response.data?.data) {
                  if (response.data?.data?.status=='Not Attended Written Test') {
                    router.push("expired");
                  } else if (response.data?.data?.status=='Written Test Completed') {
                    router.push("examcompleted");
                  } else if (response.data?.data?.status=='Registered') {
                    router.push("instructions");
                  }
              }
            }
        })
        .catch(function (error) {
            console.log(error);
            setLoginMessage({ type: "error", message: "Something went wrong! Please try again!", icon: "error" });
        });
    }
    return (
        <>
            <Head>
            <title>Entrance Exam - Future Ready Youth Skilling Program</title>
            <link rel="icon" href="/favicon.png" />
            </Head>
            <Header />
            <div className="md:mt-28 mt-36 max-w-xl mx-auto">
              <form name="loginForm" method="POST" onSubmit={(e) => Login(e)} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 px-4 lg:py-8">
                <h2 className="sm:col-span-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center">Sign In</h2>
                <div className="sm:col-span-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    User Name
                  </label>
                  <div className="mt-1">
                    <input type="text" name="username" id="username" required className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md" />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input id="password" name="password" type="password" required className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:col-span-2">{loginMessage.message ? <Alert type={loginMessage.type} message={loginMessage.message} icon={loginMessage.icon} /> : ""}</div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-nirmaan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
            <Footer />
        </>
    );
}