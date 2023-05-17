import Head from "next/head";
import Link from "next/link";
import Header from "../../template/header";
import Footer from "../../template/footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL, ADMIN_URL } from "../../../config/constants";
import { Transition } from "@headlessui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { isStudentLoggedIn, StudentData } from "../../../utils/Student";
console.log(StudentData())
import { courseLevels } from "../../../utils/Data";
import Chapters from "../../../components/layouts/Chapters";
import Cookies from "js-cookie";

export default function Level(props) {
  const router = useRouter();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const slug = router.query.slug;
  console.log(slug)
  Cookies.set("moduledata",slug);
  const [courseModules, setCourseModules] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [courseLevelID, setCourseLevelID] = useState(0);
  const [loginMessage, setLoginMessage] = useState({ type: "", message: "", icon: "" });
  Level.getInitialProps = () => {
    return {};
  };

/*pwd*/

//   function setLocalColors(bg, color) {
//     localStorage.setItem("background_color", bg);
//     localStorage.setItem("text_color", color);
//   }

//   function setLocalFonts(heading, text) {
//     localStorage.setItem("heading",heading);
//     localStorage.setItem("text", text);
//   }

//   function onColoursLoading() {
//     document.getElementById("mydiv1").style.backgroundColor =
//       localStorage.getItem("background_color");
//     document.getElementById("mydiv1").style.color =
//       localStorage.getItem("text_color");
//   }


//   function onFontLoading() {


//     document.getElementsByClassName("heading1")[0].style.fontSize =
//     localStorage.getItem("heading");

//     for (let i = 0; i < 3; i++) {
     
//     document.getElementsByClassName("text1")[i].style.fontSize =
//       localStorage.getItem("text");
//     }

    
//   }
//   function firstcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#FFFFFF";
//     document.getElementById("mydiv1").style.color = "#343A40";

//     setLocalColors("#FFFFFF",  "#343A40");
//   }

//   function secondcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#343A40";
//     document.getElementById("mydiv1").style.color = "#FFFF00";

//     setLocalColors("#343A40", "#FFFF00");
//   }

//   function thirdcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#0F2B5B";
//     document.getElementById("mydiv1").style.color = "#FFFFFF";

//     setLocalColors("#0F2B5B", "#FFFFFF");
//   }

//   function fourthcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#51B5E0";
//     document.getElementById("mydiv1").style.color = "#000000";

//     setLocalColors("#51B5E0",  "#000000");
//   }
//   function fifthcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#CEE007";
//     document.getElementById("mydiv1").style.color = "#000000";

//     setLocalColors("#CEE007", "#000000");
//   }
//   function sixthcolor() {
//     document.getElementById("mydiv1").style.backgroundColor = "#F77F00";
//     document.getElementById("mydiv1").style.color = "#000000";

//     setLocalColors("#F77F00", "#000000");
//   }

//   function size1() {
//       document.getElementsByClassName("heading1")[0].style.fontSize = "35px"; 

//     for (let i = 0; i < 5; i++) {
//       document.getElementsByClassName("text1")[i].style.fontSize = "15px";
//     }

// setLocalFonts("35px","15px");

//   }
//   function size2() {

//       document.getElementsByClassName("heading1")[0].style.fontSize = "40px";
    

//     for (let i = 0; i < 5; i++) {
//       document.getElementsByClassName("text1")[i].style.fontSize = "20px";
//     }

//     setLocalFonts("40px","20px");
//   }
//   function size3() {
   
//       document.getElementsByClassName("heading1")[0].style.fontSize = "45px";
 

//     for (let i = 0; i < 5; i++) {
//       document.getElementsByClassName("text1")[i].style.fontSize = "25px";
//     }
//     setLocalFonts("45px","25px");
//   }


  useEffect(() => {
    if(StudentData().course=="WAD" && slug=="ites"){
      router.push("/courses")
    }
    if(StudentData().course=="ITES" && slug=="web_development"){
      router.push("/courses")
    }
    if (isStudentLoggedIn() !== true) {
      
      router.push("/login?refer=/courses/level/" + slug);
    }
    if (isStudentLoggedIn() === true) {
      
      slug
        ? axios
            .post(API_URL + "courses/get_module_courses.php", {

              level: courseLevels.find((x) => x.slug == slug).id,
              student: StudentData().UniqueID,
            })
            .then(function (response) {
              
              if (response?.data?.meta?.error) {
                setLoginMessage({ type: "error", message: response.data?.meta?.message, icon: "error" });
              }
              if (!response?.data?.meta?.error) {
                setLoginMessage({ type: "success", message: response.data?.meta?.message, icon: "loading" });
                setCourseModules(response?.data?.data);
              }
              setPageLoading(false);
            })
            .catch(function (error) {
              console.log(error);
            })
        : "";
    }
    // if(document.getElementById("mydiv1")){
    //   onColoursLoading();
    //   onFontLoading();
    //   }
  }, [router]);
  return pageLoading === false ? (

   ////condition/////////
    <>
      <Head>
        <title>Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Header activePage="Courses" />
      <div>
        <section className="py-20 bg-indigo-100 pt-36" id="mydiv1">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight text-center heading1">{slug ? courseLevels.find((x) => x.slug == slug).title : ""} Modules</h2>
            {/* <p className="mt-2 text-lg text-center text-gray-600">Check out our list of {slug ? courseLevels.find((x) => x.slug == slug).slug : ""} modules below.</p> */}
            <div className="p-4 grid grid-cols-4 gap-8 mt-10 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
              {courseModules ? (
                courseModules.map((module, index) => {
                  return (
                    <>
                      {/* <Link key={module.ID} href={"/courses/module/" + module.ID}> */}
                      {/* <a className="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 className="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p className="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}
                      <div className="bg-cover bg-no-repeat bg-center relative col-span-12 overflow-hidden bg-white rounded-xl">
                        {/* <img src={ADMIN_URL + module.Image} className="rounded-xl h-48 w-full" /> */}
                        <div className="font-medium text-gray-700 px-6 py-3 border-b-2 flex justify-between items-center">
                          <div>
                            <span className="text-sm text-nirmaan">Module {index + 1}:</span>
                            <h4 className="text-xl text1">{module.ModuleTitle}</h4>
                          </div>
                          {/* <span className="bg-nirmaan py-2 px-5 rounded-lg text-nirmaan-lighter">Try Assesment</span> */}
                        </div>
                        <div className="auto-rows-max p-4 mx-5 grid grid-cols-4 gap-8 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0 overflow-x-auto flex-nowrap">
                          <Chapters module_id={module.ID} title={module.ModuleTitle} courses={module.Courses} />
                        </div>
                        {/* <p className="text-base text-left text-gray-500 px-6 pb-8">{module.ModuleDescription}</p> */}
                      </div>
                      {/* <a className="bg-cover bg-no-repeat bg-center duration-150 hover:scale-105 transform cursor-pointer hover:shadow-2xl relative flex flex-col items-start justify-between col-span-4 px-6 pt-6 pb-12 space-y-4 overflow-hidden bg-gray-100 rounded-xl">
                        <img src={module.Image} className="rounded-xl" />
                        <h4 className="text-xl font-medium text-gray-700">{module.ModuleTitle}</h4>
                        <p className="text-base text-left text-gray-500">{module.ModuleDescription}</p>
                      </a> */}

                      {/* </Link> */}
                    </>
                  );
                })
              ) : (
                <div className="col-span-12 text-center py-5 mx-auto">
                  {/* <div className="absolute bg-nirmaan opacity-50"> */}
                  {/* style={{ backgroundImage: "url(http://localhost:3000/css.jpg)" }} */}
                  {/* </div> */}
                  <img src="../../../no-courses.svg" className="w-1/4 mx-auto mb-2" />
                  No courses available in this level.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
    
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-indigo-100">
      <span className="relative h-20 w-20">
        <span className="animate-ping inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
        <span className="absolute left-0 inline-flex rounded-full h-20 w-20 bg-purple-500 justify-center items-center text-gray-50 text-xs">Loading...</span>
      </span>
    </div>
  );
}
