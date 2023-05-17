import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Alert from "../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../utils/Student";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [message, setMessage] = useState({ type: "", message: "", icon: "" });
  const [newpwd, setNewpwd ] = useState("");
  const [cnewpwd, setCnewpwd] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log(router);
    if (isStudentLoggedIn() === true) {
      router.push("/");
    }
  }, []);

  function sendLink(e) {
    e.preventDefault();
    if ( newpwd !== cnewpwd) {
      setMessage({ type: "error", message: "Passwords do not match.", icon: "error" });
    } else {
      axios
        .post(API_URL + "account/recover-password.php", {
          newpwd: newpwd,
          token: router.asPath.split("=")[1]
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setMessage({ type: "success", message: response.data?.meta?.message, icon: "success" });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Head>
        <title>Future Ready Youth SKilling Portal</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header />
      {/* sign in form start */}
      <div>
        <div className="bg-white py-24 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-32">
          <div className="relative max-w-lg mx-auto">
            <svg className="absolute left-full transform translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>
            <svg className="absolute right-full bottom-0 transform -translate-x-1/2" width={404} height={404} fill="none" viewBox="0 0 404 404" aria-hidden="true">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Reset Password</h2>
            </div>
            <div className="mt-6">
              <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={(e) => sendLink(e)}>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1">
                    <input type="password" name="newpwd" id="newpwd" minLength="8" required onChange={(e) => setNewpwd(e.target.value)} className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md" placeholder="Enter Password" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="mt-1">
                    <input type="password" name="cnewpwd" id="cnewpwd" required onChange={(e) => setCnewpwd(e.target.value)} className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md" placeholder="Confirm Password" />
                  </div>
                </div>
                <div className="sm:col-span-2">{message.message ? <Alert type={message.type} message={message.message} icon={message.icon} /> : ""}</div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="disabled:opacity-50 disabled:cursor-not-allowed w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-nirmaan hover:bg-nirmaan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
