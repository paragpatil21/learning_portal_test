
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import Alert from "../components/ui/alert";
import { API_URL } from "../config/constants";
import { LocationMarkerIcon, DeviceMobileIcon, MailIcon} from "@heroicons/react/outline";
const axios = require("axios");


export default function Home() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");
    const [statusMessage, setStatusMessage] = useState({ type: "", message: "", icon: "" });

    function sendrequest(e){
        setStatusMessage({ type: "loading", message: "Sending your message..Please wait..", icon: "loading" });
        e.preventDefault();
        axios.post(API_URL + "contactus.php", {
          name: name,
          email: email,
          subject: subject,
          message: message
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
            setStatisMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setStatusMessage({ type: "success", message: response.data?.meta?.message, icon: "success" });
          }

        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
    <div id="first" className="flex flex-col min-h-screen">
      <Head>
        <title>Contact Us</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header activePage="contactus" />
      <div className="pt-24 sm:pt-34 pb-8 w-full">
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30443.873233241116!2d78.412758!3d17.484387!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x6d8cbe6146dfade!2sFactSet-Nirmaan%20Skill%20Training%20Center!5e0!3m2!1sen!2sin!4v1660975230643!5m2!1sen!2sin"
          className="border-0 w-full h-96"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 grid-cols-1 mb-6 gap-6 px-3 md:px-0">
        <div>
          <LocationMarkerIcon className="h-12 w-12 text-blue-500 p-3 border rounded-full absolute bg-blue-50" />
          <h2 className="font-heading text-2xl font-semibold mb-2 pl-16">
            Location
          </h2>
          <p className="pl-16 font-content text-sm">
             Nirmaan Organization
            <br />
            H.No. 1-98/9/3, Flat No. 401, Plot No. 3, Jaihind Enclave, Madhapur, Telangana 500081
            <br/>
            <a href="/ourcenters"><span className="text-blue-500">See all centers address</span></a>


            
          </p>
          <MailIcon className="h-12 w-12 text-blue-500 p-3 border mt-6 rounded-full absolute bg-blue-50" />

          <h2 className="font-heading text-2xl font-semibold mt-6 mb-2 pl-16">
            Email
          </h2>
          <p className="pl-16 font-content text-sm">shiksha@nirmaan.org</p>
          <DeviceMobileIcon className="h-12 w-12 text-blue-500 p-3 mt-6 border rounded-full absolute bg-blue-50" />

          <h2 className="font-heading text-2xl font-semibold mt-6 mb-2 pl-16">
            Call
          </h2>
          <p className="pl-16 font-content text-sm">
          +91-6281450591 <br/>+91-8247717684
          </p>
        </div>
        <div className="col-span-3">
          <form className="grid grid-cols-2 gap-4 gap-y-7 mt-3 md:ml-10" onSubmit={(e) => sendrequest(e)}>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              autoComplete="given-name"
              placeholder="Your Name"
              className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
            />
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              autoComplete="given-name"
              placeholder="Your Email"
              className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
            />
            <input
              required
              onChange={(e) => setSubject(e.target.value)}
              type="text"
              name="subject"
              id="subject"
              autoComplete="given-name"
              placeholder="Subject"
              className="col-span-2  py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
            />
            <textarea
              required
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              name="message"
              id="message"
              autoComplete="given-name"
              placeholder="Enter your message ..."
              className="col-span-2  py-3 px-4 block w-full md:w-11/12 lg:w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md h-28"
            />
            <div className="col-span-2 block w-full">
            {statusMessage.message ? 
            <Alert type={statusMessage.type} message={statusMessage.message} icon={statusMessage.icon} />
            :""}
            </div>
            <button
              onClick={(e) =>{sendrequest(e)}}
              className="col-span-2  w-max  mx-auto px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium hover:text-nirmaan hover:border-nirmaan bg-nirmaan hover:bg-white text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
