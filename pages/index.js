import Head from "next/head";
import Link from "next/link";
import Header from "./template/header.js";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
const axios = require("axios");
import { ADMIN_URL, API_URL } from "../config/constants";
import { isStudentLoggedIn, StudentData } from "../utils/Student";
import Banner from "../components/ui/banner";
import PWD from "../components/ui/pwd";
import CountUp from "react-countup";

export default function Home() {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const [courseModules, setCourseModules] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [webinarData, setWebinarData] = useState();
  const [studentID, setStudentID] = useState(
    StudentData().ID ? StudentData().ID : 0
  );

  /*
  function setLocalColors(bg, color) {
    localStorage.setItem("background_color", bg);
    localStorage.setItem("text_color", color);
  }

  function setLocalFonts(heading, text) {
    localStorage.setItem("heading",heading);
    localStorage.setItem("text", text);
  }

  function onColoursLoading() {
    document.getElementById("mydiv1").style.backgroundColor =
      localStorage.getItem("background_color");
    document.getElementById("mydiv1").style.color =
      localStorage.getItem("text_color");
  }


  function onFontLoading() {

    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize =
      localStorage.getItem("heading");
    document.getElementsByClassName("text1")[i].style.fontSize =
      localStorage.getItem("text");
    }

    
  }

  function firstcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
    document.getElementById("mydiv1").style.color = "#343A40";

    setLocalColors("#FFFFFF",  "#343A40");
  }

  function secondcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#343A40";
    document.getElementById("mydiv1").style.color = "#FFFF00";

    setLocalColors("#343A40", "#FFFF00");
  }

  function thirdcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#0F2B5B";
    document.getElementById("mydiv1").style.color = "#FFFFFF";

    setLocalColors("#0F2B5B", "#FFFFFF");
  }

  function fourthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#51B5E0";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#51B5E0","#000000");
  }
  function fifthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#CEE007";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#CEE007", "#000000");
  }
  function sixthcolor() {
    document.getElementById("mydiv1").style.backgroundColor = "#F77F00";
    document.getElementById("mydiv1").style.color = "#000000";

    setLocalColors("#F77F00", "#000000");
  }



  function size1() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "35px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "15px";
    }

setLocalFonts("35px","15px");

  }
  function size2() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "40px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "20px";
    }

    setLocalFonts("40px","20px");
  }
  function size3() {
    for (let i = 0; i < 3; i++) {
      document.getElementsByClassName("heading1")[i].style.fontSize = "45px";
    }

    for (let i = 0; i < 4; i++) {
      document.getElementsByClassName("text1")[i].style.fontSize = "25px";
    }
    setLocalFonts("45px","25px");
  }


  useEffect(() => {
    if(document.getElementById("mydiv1")){
      onColoursLoading();
      onFontLoading();
      }
  });
*/

  useEffect(() => {
    axios
      .post(API_URL + "home.php", {
        level: 1,
        student: studentID,
      })
      .then(function (response) {
        if (response?.data?.meta?.error) {
          // setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
        }
        if (!response?.data?.meta?.error) {
          // setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
          setCourseModules(response?.data?.data);
          setWebinarData(response?.data?.webinar);
          // console.log(response?.data?.data);
        }
        setPageLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const supporters = [
    {
      name: "Infosys",
      role: "Copywriter",
      imageUrl: "/infosys-logo-png.png",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
    {
      name: "HSBC",
      role: "Copywriter",
      imageUrl: "/sponsor-placeholder.jpg",
      twitterUrl: "#",
      linkedinUrl: "#",
    },
  ];
  return (
    <div id="first">
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header activePage="Home" />
      <div className="absolute w-full h-screen bg-black bg-opacity-20"></div>
      <div className="pt-24 sm:pt-34 pb-8 w-full bg-fixed  bg-cover bg-hero h-screen">
        <div className="relative container pt-52 mx-auto">
          <h1 className="text-white text-6xl font-bold leading-tight text-center">
            Women in Technology
          </h1>
          <h2 className="text-white text-2xl text-center">
            An Initiative by Nirmaan Organization
          </h2>
        </div>
      </div>
      <div
        id="mydiv1"
        onload="revertColor()"
        className="font-nirmaan pt-9 md:pt-0"
      >
        <section className="body-font scroll-smooth px-1 md:px-7 lg:px-5" id="about">
          <div className="mx-auto flex pb-10 md:py-5 px-3 md:px-0 lg:py-20 lg:px-10 md:flex-col lg:flex-row flex-col items-center justify-between xl:px-28">
            <div className="max-w-3xl lg:flex-grow md:w-full lg:pr-24  flex flex-col md:items-start md:text-center mb-16 md:mb-0 items-center text-center  lg:ml-0">
              <h1 className="title-font text-3xl sm:text-4xl mb-4 font-bold heading1">
                About the Program
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-justify text1">
                Nirmaan Organization with the support of Infosys and HSBC provides Free
                Training and Placement program for graduated women. This is a
                certification cum placement training program, which means that
                we will issue a certificate & provide placement assistance. The
                details of the program are as follows.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-justify text1">
                <b className="underline">Duration</b>: 3 months <br />
                <b className="underline">Courses Covered</b>: Web Development Technologies,
                Information Technology Enabled Services and Soft Skills <br />
                <b className="underline">Qualification:</b><br/>
                <span className="text-gray-600 font-bold">Web Development</span>:
                  for womens only with B.Sc., B.Tech., M.Sc.,B.C.A
                M.Tech. and M.C.A.,	Pass out batches from 2018 to 2022. <br/>
                <span className="text-gray-600 font-bold">Information Technology Enabled Services</span>:
                  for womens only with SSC, Diploma, Intermediate, Degree,
                	Pass out batches from 2018 to 2022. <br/>

                <b className="underline">Age Limit:</b><br/>
                <span className="text-gray-600 font-bold"> Web Development</span>: 20-27 years old<br/>
                <span className="text-gray-600 font-bold"> Information Technology Enabled Services</span>: 18-27 years old
                
                
              </p>
            </div>
            <div className="mb-10 flex right-0 justify-end lg:max-w-lg lg:w-full md:w-full sm:w-full items-center">
              <img
                className="object-cover object-center rounded-lg"
                alt="hero"
                src="/images/edit_3.jpg"
              />
            </div>
          </div>
        </section>
        {/* end coding classes for kids online */}

        {/* <section className=" bg-white">
          <div className="container  mx-auto">
            <div className="p-16 bg-blue-50">
              <div className="flex flex-wrap items-center -mx-10 -mb-10">
                <div className="w-full md:w-1/2 lg:w-1/4 px-10 mb-10 text-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="mx-auto mb-6 text-blue-800 h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="mb-3 text-3xl font-bold font-heading text-green-400">
                    1250
                  </h3>
                  <p className="text-sm uppercase text-gray-500">
                    Enrolled Students
                  </p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-10 mb-10 text-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="mx-auto mb-6 text-blue-800 h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="mb-4 text-3xl font-bold font-heading text-green-400">
                    389
                  </h3>
                  <p className="text-sm uppercase text-gray-500">
                    Joined Students
                  </p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-10 mb-10 text-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="mx-auto mb-6 text-blue-800 h-8 w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="mb-4 text-3xl font-bold font-heading text-green-400">
                    289
                  </h3>
                  <p className="text-sm uppercase text-gray-500">
                    Course Completed
                  </p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 px-10 mb-10 text-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="mx-auto mb-6 text-blue-800 h-8 w-8"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      ></path>
                    </svg>
                  </span>
                  <h3 className="mb-4 text-3xl font-bold font-heading text-green-400">
                    128
                  </h3>
                  <p className="text-sm uppercase text-gray-500">
                    Placed Students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="body-font xl:px-28" id="topics">
          <div className=" mx-auto py-10 md:py-10 px-3 md:px-6 lg:py-24 lg:px-1">
            <div className="mb-10">
              <p className="font-bold text-left text-4xl leading-tight tracking-normal uppercase">
                COURSE CURRICULUM
              </p>
              <p className="font-medium text-sm text-gray-400 tracking-widest inline-flex uppercase">
                TOPICS
              </p>
              <hr className="w-32 border-t border-nirmaan inline-flex mt-auto mb-auto align-middle ml-1" />
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 text-center ">
              <div className="md:px-10 lg:px-5">
                <div className="rounded-lg border-2 shadow-lg">
                  <img
                    src={"images/course1.jpg"}
                    alt="web development"
                    className="w-full rounded-t-lg h-60"
                  />
                  <div className="m-5 box-border h-32">
                    <div className="title">
                      <span className="inline-flex items-center justify-center px-4 py-2 text-lg leading-none text-white bg-nirmaan rounded-lg w-full ">
                        Web Development
                      </span>
                    </div>
                    {/* <div className="body text-gray-500  pt-8 grid grid-cols-4 gap-1">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {" "}
                        <span></span> HTML
                      </span>
                      <span className=" bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                        CSS3
                      </span>
                      <span className=" bg-green-100 text-green-800 text-sm font-medium text-center  px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                        JavaScript
                      </span>
                      <span className=" bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">
                        PHP
                      </span>
                      <span className=" bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">
                        AngularJS
                      </span>
                      
                    </div> */}
                    <div className="pt-8">
                        <a
                          href="/web_development"
                          className="text-blue-500 underline"
                        >
                           See Curriculum
                        </a>
                      </div>
                  </div>
                </div>
              </div>
              <div className="md:px-10 lg:px-5">
                <div className="rounded-lg border-2  shadow-lg">
                  <img
                    src={"images/course3.jpg"}
                    alt="ites"
                    className="w-full rounded-t-lg h-60"
                  />
                  <div className="m-5 box-border h-32">
                    <div className="title">
                      <span className="inline-flex items-center justify-center px-4 py-2 text-lg leading-none text-white bg-nirmaan rounded-lg w-full">
                        Information Technology Enabled Services
                      </span>
                    </div>
                    {/* <div className="body text-gray-500 py-3 pt-8"> */}
                      {/* <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {" "}
                        <span>MS Word</span>
                      </span>
                      <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">MS Excel</span>
                      <span className="ml-3 bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">MS Powerpoint</span> */}
                      {/* <span className="ml-3 bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">English Typing</span> */}
                      {/* <span className="ml-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">Internet Concepts</span> */}
                      <div className="pt-8">
                        <a href="/ites" className="text-blue-500 underline">
                        See Curriculum
                        </a>
                      </div>
                    </div>
                  {/* </div> */}
                </div>
              </div>
              <div className="md:px-10 lg:px-5 mt-7 md:mt-0">
                <div className="rounded-lg border-2  shadow-lg">
                  <img
                    src={"images/course2.png"}
                    alt="soft skills"
                    className="w-full rounded-t-lg h-60"
                  />
                  <div className="m-5 box-border h-32">
                    <div className="title">
                      <span className="inline-flex items-center justify-center px-4 py-2 text-lg leading-none text-white bg-nirmaan rounded-lg w-full">
                        Soft Skills
                      </span>
                    </div>
                    {/* <div className="body text-gray-500 pt-8 grid grid-cols-3 gap-1">
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 p-1 rounded dark:bg-blue-200 dark:text-blue-800">
                        {" "}
                        <span></span> Basic English
                      </span>
                      <span className=" bg-green-100 text-green-800 text-sm font-medium text-center mr-2 p-1 rounded dark:bg-green-200 dark:text-green-900">
                        Vocabulary
                      </span>
                      <span className=" bg-pink-100 text-pink-800 text-sm font-medium mr-2 p-1 rounded dark:bg-pink-200 dark:text-pink-900">
                        Comm Skills
                      </span>

                     
                    </div> */}
                    <div className="pt-8">
                        <a
                          href="/soft_skills"
                          className="text-blue-500 underline"
                        >
                         See Curriculum
                        </a>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="body-font xl:px-28" id="testimonials">
          <div className=" mx-auto py-10 pb-10 md:py-10 px-3 md:px-6 lg:px-1">
            <div className="mb-10">
              <p className="font-bold text-left text-4xl leading-tight tracking-normal uppercase">
                TESTIMONIALS
              </p>
              <p className="font-medium text-sm text-gray-400 tracking-widest inline-flex uppercase">
                See what our lovely students said
              </p>
              <hr className="w-32 border-t border-nirmaan inline-flex mt-auto mb-auto align-middle ml-1" />
            </div>
          </div>
        </section> */}

        {/* <section className="pb-36 overflow-hidden md:px-24 px-12">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 xl:grid-cols-3  -m-8 ">
              <div className="w-full  p-8">
                <div className="p-4 h-full bg-opacity-70 rounded-xl bg-gray-100 border-2 border-nirmaan shadow-lg">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="mb-9 w-full overflow-hidden rounded-md">
                         <iframe width="100%" height="200" src="https://www.youtube.com/embed/WqZwNOvYqIE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                      <h3 className="text-lg font-bold font-heading leading-normal text-gray-600">
                        Swarna Chinta
                      </h3>
                      <p className="text-base text-gray-500 mt-3 text-justify">
                        An Electronic background student shares her experience of how this program helped her to achieve a job in the IT industry
                      </p>                      
                    </div>
                    <p className="text-sm text-gray-400 font-medium">12 May 2020</p>
                  </div>
                </div>
              </div>
              <div className="w-full  p-8">
                <div className="p-4 h-full bg-opacity-70 rounded-xl bg-gray-100 border-2 border-nirmaan shadow-lg">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="mb-9 w-full overflow-hidden rounded-md">
                         <iframe width="100%" height="200" src="https://www.youtube.com/embed/lOU-pDKXz4w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                      <h3 className="text-lg font-bold font-heading leading-normal text-gray-600">
                        Yamini
                      </h3>
                      <p className="text-base text-gray-500 mt-3 text-justify">
                        A student from a lower economic background shares how this free of cost soft skills training helped her to crack the interview
                      </p>                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full  p-8">
                <div className="p-4 h-full bg-opacity-70 rounded-xl bg-gray-100 border-2 border-nirmaan shadow-lg">
                  <div className="flex flex-col justify-between h-full">
                    <div className="">
                      <div className="mb-9 w-full overflow-hidden rounded-md">
                         <iframe width="100%" height="200" src="https://www.youtube.com/embed/UBblISuvTzY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                      </div>
                      <h3 className="text-lg font-bold font-heading leading-normal text-gray-600">
                        Shanti Devi
                      </h3>
                      <p className="text-base text-gray-500 mt-3 text-justify">
                        A Computer Science student from 2019 batch shares how this training helped her in achieving a job at Infosys as System Engineer
                      </p>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="body-font xl:px-28 pb-20" id="sponsors">
          <div className=" mx-auto py-10 pb-10 md:py-10 px-3 md:px-6 lg:px-1">
            <div className="mb-10">
              <p className="font-bold text-left text-4xl leading-tight tracking-normal uppercase">
                SPONSORS
              </p>
              <p className="font-medium text-sm text-gray-400 tracking-widest inline-flex uppercase">
                Our Corporate Partners
              </p>
              <hr className="w-32 border-t border-nirmaan inline-flex mt-auto mb-auto align-middle ml-1" />
            </div>
            <div className="flex justify-around">
              <div className="md:px-5 w-56 ">
                {/* <a href="https://www.infosys.com/" target="_blank"> */}
                  <img
                    className="block h-full w-full mx-auto"
                    src="/infosys-logo.jpg"
                    alt="Sponsors"
                  />
                {/* </a> */}
                
              </div>
              <div className="md:px-5 w-80 h-52">
                {/* <a href="https://www.infosys.com/" target="_blank"> */}
                  <img
                    className="block  w-full mx-auto mt-12"
                    src="/HSBC-logo.png"
                    alt="Sponsors"
                  />
                {/* </a> */}
                
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
