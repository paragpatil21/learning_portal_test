import Head from "next/head";
import Link from "next/link";
import Header from "../template/header";
import Footer from "../template/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../../config/constants";
import Alert from "../../components/ui/alert";
import { isStudentLoggedIn, StudentData } from "../../utils/Student";




function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function studentLoggedIn() {
  return isStudentLoggedIn();
}
export default function Profile() {
  const [remember, setRemember] = useState(false);

  const [studentData, setStudentData] = useState(StudentData().UniqueID);
  const [profileData, setProfileData] = useState("");
  const[statename,setStatename]=useState("")
  const[districtname,setDistrictname]=useState("")
  const[centername,setCenterName]=useState("")
  const router = useRouter();
  useEffect(() => {

    
    axios
      .post(API_URL + "account/get_user.php", { user_id:StudentData().UniqueID})
      .then(function (response) {
         console.log("response",response)
        axios.post(API_URL+"getstatename.php",{state_code:response.data.data.state})
        .then(function (response) {
          // console.log("state",response)
          setStatename(response.data.state.name);
        }).catch(function (error) {
          console.log(error)
        })
        axios.post(API_URL+"get_districtname.php",{district_code:response.data.data.district})
        .then(function (response) {
           console.log("state",response)
          setDistrictname(response.data.district.name);
        }).catch(function (error) {
          console.log(error)
        })
        axios.post(API_URL+"get_centername.php",{center_code:response.data.data.center_id})
        .then(function (response) {
           console.log("center",response)
          setCenterName(response.data.centert.address);
        }).catch(function (error) {
          console.log(error)
        })
        if (response) {
          
          setProfileData(()=>{return Object.assign({},response.data.data)});
                
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    
  
//       const getstatename=(state)=>{
//         axios.post(API_URL+"getstatename.php",{state_code:state})
//         .then(function (response) {
//           console.log("state",response)
//           setStatename(response.data.state.name);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
    
    
//       }
      
// getstatename(profileData.state)
      
  }, []);

  
   

  

  


// console.log(StudentData().first_name)
// console.log("profileData",profileData)


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
    // localStorage.setItem("text",JSON.stringify('10px'))
    /// note: if you increased the feild increase for loop according to that so changes of size will not give error

    document.getElementsByClassName("heading1")[0].style.fontSize =
      localStorage.getItem("heading");

    for (let i = 0; i < 14; i++) {
      
    document.getElementsByClassName("text1")[i].style.fontSize =
      localStorage.getItem("text");
      console.log("text",text1)
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

    setLocalColors("#51B5E0", "#000000");
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
    document.getElementsByClassName("heading1")[0].style.fontSize = "35px";

for(let i=0;i<14;i++){
  document.getElementsByClassName("text1")[i].style.fontSize= "15px";
  console.log(document.getElementsByClassName("text1")[i]);
}
setLocalFonts("35px","15px");
    
  }
  function size2() {
    document.getElementsByClassName("heading1")[0].style.fontSize = "40px";

    for(let i=0;i<14;i++){
      document.getElementsByClassName("text1")[i].style.fontSize= "20px";
      console.log(document.getElementsByClassName("text1")[i]);
    }
    setLocalFonts("40px","20px");

    
  }
  function size3() {
    document.getElementsByClassName("heading1")[0].style.fontSize = "45px";

    for(let i=0;i<14;i++){
      document.getElementsByClassName("text1")[i].style.fontSize= "25px";
      console.log(document.getElementsByClassName("text1")[i]);
    }

    setLocalFonts("45px","25px");

  }

  Profile.getInitialProps = ({}) => {
    return {};
    // if (isStudentLoggedIn() !== true) {
    //   router.push("/");
    // }
  };
  useEffect(() => {
    if (isStudentLoggedIn() !== true) {
      router.push("/");
    }
  }, []);

  // useEffect(() => {
  //   if(document.getElementById("mydiv1")){
  //     onColoursLoading();
  //     onFontLoading();
  //     }
  // });
  



 
  return (
    <>
      <Head>
        <title>Profile - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div className="md:h-9 h-24 w-full bg-gray-200 border md:flex md:items-center md:justify-around md:grid-cols-2 grid-cols-1 space-y-3 md:space-y-0">
        <div className="border flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-2"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
            <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
          </svg>

          <span className="text-sm">
            <Link href="/screenreaderaccess"> Screen Reader Access </Link>
          </span>
        </div>

        <div className="border flex justify-center items-center  gap-x-1">
          <span className="md:text-sm text-sm"> Theme Color: </span>
          <div
          style={{backgroundColor:"#FFFFFF",color:"#343A40"}}
            onClick={() => {
              firstcolor();
            }}
            className="h-7 w-7 rounded-full bordeR uppercase flex justify-center items-center text-xl poin cursor-pointer"
          >
            A
          </div>
          <div
           style={{backgroundColor:"#343A40",color:"#FFFF00"}}
            onClick={() => {
              secondcolor();
            }}
            className="h-7 w-7 rounded-full border uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
           style={{backgroundColor:"#0F2B5B",color:"#FFFFFF"}}
            onClick={() => {
              thirdcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#51B5E0",color:"#000000"}}
            onClick={() => {
              fourthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#CEE007",color:"#000000"}}
            onClick={() => {
              fifthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>
          <div
          style={{backgroundColor:"#F77F00",color:"#000000"}}
            onClick={() => {
              sixthcolor();
            }}
            className="h-7 w-7 rounded-full border  uppercase flex justify-center items-center text-xl cursor-pointer"
          >
            A
          </div>

          <span className="md:text-sm text-sm md:ml-9 ml-0">
            {" "}
            Text Resize:{" "}
          </span>
          <div
            onClick={() => {
              size1();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-xs cursor-pointer"
          >
            A-
          </div>
          <div
            onClick={() => {
              size2();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-md cursor-pointer"
          >
            A
          </div>
          <div
            onClick={() => {
              size3();
            }}
            className="h-8 w-8 border bg-black text-white uppercase flex justify-center items-center text-lg cursor-pointer"
          >
           A+
          </div>
        </div>
      </div>




	







      <Header />
      <div ></div>
      {/* sign in form start */}
      <div className="md:mt-10">
        <div
          className="py-16 px-0 overflow-hidden sm:px-6 lg:px-8 lg:py-16"
          id="mydiv1"
          class="font1"
        >
          <div className="relative max-w-6xl mx-auto">
            {/* <svg
              className="absolute left-full transform translate-x-1/2"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg> */}
            {/* <svg
              className="absolute right-full bottom-0 transform -translate-x-1/2"
              width={404}
              height={404}
              fill="none"
              viewBox="0 0 404 404"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="85737c0e-0916-41d7-917f-596dc7edfa27"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={404}
                fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
              />
            </svg> */}
            {/* <div className="mb-5 px-5 md:px-14 md:py-10 md:border pt-4 rounded-2xl">
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-20 text-yellow-500 bi bi-trophy" viewBox="0 0 16 16">
                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
                  </svg>
                  <div className="ml-4">
                    <h3 className="text-3xl leading-6 font-extrabold text-gray-900">{studentData?.FullName}</h3>
                    <p className="mt-2 max-w-2xl text-md text-gray-500">
                      Points: <span className="font-bold">100 Pts</span>
                    </p>
                    <p className="mt-1 max-w-2xl text-md text-gray-500">
                      Level: <span className="text-yellow-500">Bronze</span>
                    </p>
                  </div>
                </div>
                <div>
                  <img src="/images/codebeginner-badge.png" width="90px" />
                </div>
              </div>
            </div> */}
{profileData &&
            <div className="px-5 md:px-10 md:py-10 md:border pt-4 mb-2 rounded-2xl">
              <div className=" flex justify-between border-b -mt-2">
            <div>
            <a class="inline-flex items-center">
              {profileData.photo_file?(<img
                      src={
                    API_URL + profileData.photo_file
                          
                      }
                      alt="User Avatar"
                      class="inline-block w-20 h-20 rounded-full"
                    />):(<img
                      src="/usericon.png"
                      alt="User Avatar"
                      class="inline-block w-20 h-20 rounded-full"
                      />
                      )}
                
          {/* <img alt="blog" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/> */}
          <span class="flex-grow flex flex-col pl-4">
            <span class="title-font font-medium text-gray-900">{profileData?.first_name + " "+profileData?.last_name}</span>
            <span class="text-gray-400 text-xs tracking-widest mt-0.5"> {profileData?.emailID}</span>
          </span>
        </a>
                  </div>
                  <div>
                  <Link href="/account/edit-profile">
                    <button class="bg-nirmaan px-0.5 mt-5 md:px-4 py-2 text-sm shadow-sm font-medium text-white rounded-md hover:bg-nirmaan-dark text1">
                      Edit profile
                    </button>
                  </Link>
                </div>
                </div>
              {/* <div className="flex justify-between"> */}
                
                {/* <div className="flex gap-x-3">
                  <div>
                    {profileData.photo_file?(<img
                      src={
                      
                  
                   API_URL + profileData.photo_file
                          
                      }
                      alt="User Avatar"
                      class="inline-block w-14 h-14 rounded-full"
                    />):(<img
                      src="/usericon.png"
                      alt="User Avatar"
                      class="inline-block w-14 h-14 rounded-full"
                      />
                      )}
                    
                  </div>

                  
                </div> */}
                
              {/* </div> */}
              <div className="mt-3 border-b border-gray-200">
             
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Student ID</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.regID}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Full name</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.first_name + " "+profileData?.last_name}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Date of Birth</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.dob}
                    </dd>
                  </div> 

                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Email</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.emailID}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Mobile</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.mobile}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Gender</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.gender}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Pwd</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.pwd}
                    </dd>
                  </div> 
                  {profileData.pwd=="Yes"?(
                     <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                     <dt className="text-sm font-medium text1">PWD type</dt>
                     <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                       {profileData?.disability}
                     </dd>
                   </div> 
                  ):" "}
                   <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Marital status</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.marital_status}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Religion</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.religion}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Caste Category</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.caste_category}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Educational Qualification</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.edqual}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Status of Educational Qualification</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.edstatus}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Year of passing/pursuing/droped</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.yofpass}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Occupation</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.occupation}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Annual Income</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.annual_income}
                    </dd>
                  </div> 
                 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">state</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {statename}
                      
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">District</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {districtname}
                    </dd>
                  </div> 
                    
                    {/* <>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text1">State</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                          {profileData?.state}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text1">District</dt>
                        <dd className="mt-1 text-smsm:mt-0 sm:col-span-2 text1">
                          {profileData?.district}
                        </dd>
                      </div>
                       <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text1">City</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                          {profileData?.City}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text1">Area</dt>
                        <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                          {profileData?.Area}
                        </dd>
                      </div> 
                    </>
                   */}
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text1">Address</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                        {profileData?.address}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text1">Gaurdian Name</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                        {profileData?.gfirst_name + " "+profileData?.glast_name }
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text1">Relation</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                        {profileData?.grelation}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text1">Gaurdian Mobile Number</dt>
                      <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                        {profileData?.gmobile}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Course</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.course}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Course Mode</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {profileData?.mode}
                    </dd>
                  </div> 
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Center Address</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2 text1">
                      {centername}
                    </dd>
                  </div> 
                  {/* )} */}
                  {/* <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">School</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.School}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text1">Class</dt>
                    <dd className="mt-1 text-sm  sm:mt-0 sm:col-span-2 text1">
                      {profileData?.Class}th Class
                    </dd>
                  </div> */}
                </dl>
              </div>
            </div>
}
          </div>
        </div>
      </div>

      {/* sign in form end */}
      <Footer />
    </>
  );
}
// export const getServerSideProps = async (ctx) => {
//   const auth = studentLoggedIn();
//   if (!auth) {
//     const { res } = ctx;
//     res.setHeader("location", "/");
//     res.statusCode = 302;
//     res.end();
//     return;
//   }

//   return {
//     props: {}, // or return user
//   };
// };
