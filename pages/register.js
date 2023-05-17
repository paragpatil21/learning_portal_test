import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";
import { useState, useEffect } from "react";
//import { useRouter } from "next/router";
//import Cookies from "js-cookie";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Alert from "../components/ui/alert";
//import { isStudentLoggedIn, StudentData } from "../utils/Student";
import {
  GenderList,
  CasteCategoryList,
  ReligionList,
  MaritalStatusList,
  OccupationList,
  DisabilityList,
  LanguagesList,
  OtherIDList,
  EducationList,
  EducationStatusList,
  YearList,
  GuardianRelationList,
  AnnulaIncomeList,
  HighEducatedFamilyList,
  HighEducationFamilyList,
  SourceList,
  TechLevelList,
  CourseList,
  ModeList,
  GraduationList,
  PostGraduationList,
  //bplList,
} from "../utils/Data";
import Multiselect from "multiselect-react-dropdown";
//import { Switch } from "@headlessui/react";

//function classNames(...classes) {
//  return classes.filter(Boolean).join(" ");
//}

export default function Home() {
  const [age, setAge] = useState();
  const [isPwD, setIsPwD] = useState("No");
  const [otherID, setOtherID] = useState("");
  const [edStatus, setEdStatus] = useState();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selDistrict, setSelDistrict] = useState();
  const [edqual, setEdqual] = useState("");
  const [gender, setGender] = useState();
  const [occupation, setOccupation] = useState();
  const [languages, setLanguages] = useState();
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState("");
   const[cities,setCities]=useState([]);
  const [city, setCity] = useState("");
  // const[username, setUsername] = useState();
  // const[password, setPassword] = useState();
  // const[first_name, setFirst_name] = useState();
  // const[last_name, setLast_name] = useState();
  // const[email, setEmail] = useState();
  // const[dob, setDob] = useState();
  // const[source, setSource] = useState()
  // const[lms_code, setLms_code] =useState()

  const [regMessage, setregMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });


 


  //const router = useRouter();
  function calculateAge(dob) {
    let birthDate = new Date(dob);
    let today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() == birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      years--;
    }
    setAge(years);
  }
  function changeDistricts(state) {
    setSelDistrict("");
    axios
      .post(API_URL + "get_districts.php", { state_code: state })
      .then(function (response) {
        setDistricts(() => {
          return [...response.data.districts];
        });
        console.log(response.data.districts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    axios
      .post(API_URL + "get_states.php", {})
      .then(function (response) {
        setStates(() => {
          return [...response.data.states];
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .post(API_URL + "centers/get_centers.php", {})
      .then(function (response) {
        console.log("response", response);
        setCenters(() => {
          return [...response.data.centers];
        });    
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setCities(() => {
      return [...new Set(centers.map((center) => center.city))];
    });
  }, [centers]);
  console.log(cities)
  



  


  
  function Register(e) {
    e.preventDefault();
    setregMessage({
      type: "warning",
      message: "Submitting Data. Please Wait...",
      icon: "loading",
    });
    //save registration date, generate regID and password and send to mail
    axios
      .post(API_URL + "register.php", new FormData(regform))
      .then(function (response) {
        // console.log("response.data",response.data)
        if (response?.data?.meta?.error) {
          setregMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (!response?.data?.meta?.error) {
          setregMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "success",
          });
          // regform.reset();
         
          //  setUsername(response.data.meta.data.username)
          //   setPassword(response.data?.meta.data.password)
          //   setFirst_name(response.data?.meta.data.first_name)
          //   setLast_name(response.data?.meta.data.last_name)
          //   setEmail(response.data?.meta.data.email)
          //   setDob(response.data?.meta.data.dob)
          //   setSource(response.data?.meta.data.source)
          //   setLms_code(response.data?.meta.data.lms_code)

          //   axios.get("http://psychometric-test-staging.nirmaan.org/api/getdata.php",
          //   {
          //     params: {
          //     username,
          //     password,
          //     first_name,
          //     last_name,
          //     email,
          //     dob,
          //     source,
          //     lms_code
          //     }
          
          //   }
          //   ).then(function (response) {
              
          //     console.log("response pshychometric",response);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          

          
        }
      })
      .catch(function (error) {
        console.log(error);
      });


     


      
  }
  
  return (
    <>
      <Head>
        <title>Sign Up - Nirmaan Learning Platform</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div>
        <div className="bg-white py-12 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-16 mt-24">
          <div className="relative max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Register
              </h2>
            </div>
            <div className="mt-6">
              <form
                className="grid gap-y-6 grid-cols-4 gap-x-8 items-center"
                name="regform"
                method="post"
                onSubmit={(e) => Register(e)}
              >
                <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                  Basic Details
                </h2>
                <div>
                  <label
                    htmlFor="first_name"
                    className="font-medium text-gray-700 col-span-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="mt-1 col-span-3">
                  <input
                    required
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    placeholder="Enter First Name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="font-medium text-gray-700 col-span-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="mt-1 col-span-3">
                  <input
                    required
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    placeholder="Enter Last Name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="middle_name"
                    className="font-medium text-gray-700 col-span-1"
                  >
                    Middle Name
                  </label>
                </div>
                <div className="mt-1 col-span-3">
                  <input
                    type="text"
                    name="middle_name"
                    id="middle_name"
                    autoComplete="additional-name"
                    placeholder="Enter Middle Name"
                    className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                  />
                </div>
                {/* <div>
                  <label
                    htmlFor="gender"
                    className="font-medium text-gray-700 col-span-1"
                  >
                    Gender<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="mt-1 col-span-3">
                  <select
                    required
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                    id="gender"
                    autoComplete="sex"
                    className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                  >
                    <option value="">Select Gender</option>
                    {GenderList
                      ? GenderList.map((gender) => {
                          return <option value={gender}>{gender}</option>;
                        })
                      : ""}
                  </select>
                </div>

                {gender != "Female" ? (
                  <>
                    <div></div>
                    <div className=" text-red-500   items-center md:text-2xl  text-center  w-full col-span-3 ">
                      This programm is only for women now
                    </div>
                  </>
                ) : (
                  ""
                )}

                {gender != "Female" ? (
                  ""
                ) : (
                */}
                  <> 
                    <div>
                      <label
                        htmlFor="dob"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Date of Birth<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        onChange={(e) => calculateAge(e.target.value)}
                        type="date"
                        name="dob"
                        id="dob"
                        autoComplete="bday"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="age"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Age<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        value={age}
                        disabled
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Enter Age"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="caste_category"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Caste Category
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        name="caste_category"
                        id="caste_category"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Caste Category</option>
                        {CasteCategoryList
                          ? CasteCategoryList.map((caste) => {
                              return <option value={caste}>{caste}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="religion"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Religion
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        name="religion"
                        id="religion"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Religion</option>
                        {ReligionList
                          ? ReligionList.map((religion) => {
                              return (
                                <option value={religion}>{religion}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="marital_status"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Marital Status<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="marital_status"
                        id="marital_status"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Marital Status</option>
                        {MaritalStatusList
                          ? MaritalStatusList.map((mstatus) => {
                              return <option value={mstatus}>{mstatus}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="occupation"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Occupation<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                        name="occupation"
                        id="occupation"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Occupation</option>
                        {OccupationList
                          ? OccupationList.map((occupation) => {
                              return (
                                <option value={occupation}>{occupation}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    {occupation == "Government Employee" ||
                    occupation == "Private Employee" ||
                    occupation == "Retired" ? (
                      <>
                        <div>
                          <label
                            htmlFor="exp_file"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Experience certificate
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <input
                            required
                            type="file"
                            name="exp_file"
                            id="exp_file"
                            accept=".jpg, .jpeg, .png, .pdf"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <div>
                      <label
                        htmlFor="resume_file"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Upload Resume<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="file"
                        name="resume_file"
                        id="resume_file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pwd"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Are you physically disabled?
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setIsPwD(e.target.value)}
                        required
                        name="pwd"
                        id="pwd"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Answer</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    {isPwD == "Yes" ? (
                      <>
                        <div>
                          <label
                            htmlFor="disability"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Select Disability
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <select
                            required
                            name="disability"
                            id="disability"
                            className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                          >
                            <option value="">Select Disability</option>
                            {DisabilityList
                              ? DisabilityList.map((disability) => {
                                  return (
                                    <option value={disability}>
                                      {disability}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </div>
                        {/*<div>
                      <label
                        htmlFor="disability"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Select PwD certificate
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="file"
                        name="pwd_file"
                        id="pwd_file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>*/}
                      </>
                    ) : (
                      ""
                    )}
                    <div>
                      <label
                        htmlFor="languages"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Languages Known
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      {/*<select
                        required
                        name="languages"
                        id="languages"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Known Languages</option>
                        {LanguagesList
                          ? LanguagesList.map((language) => {
                              return (
                                <option value={language}>{language}</option>
                              );
                            })
                          : ""}
                      </select>*/}
                      <Multiselect
                        className="border-0"
                        placeholder="Select Languages"
                        isObject={false}
                        onSelect={(list) => {
                          setLanguages(list.join(", "));
                        }}
                        onRemove={(list, item) => {
                          setLanguages(list.join(", "));
                        }}
                        options={LanguagesList}
                        showCheckbox
                      />
                      <input
                        type="hidden"
                        name="languages"
                        id="languages"
                        value={languages}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="photo"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Upload Photograph<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="file"
                        name="photo"
                        id="photo"
                        accept=".jpg, .jpeg, .png,"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                      Verification Details
                    </h2>
                    <div>
                      <label
                        htmlFor="aadhaar_number"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Aadhaar Number<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        pattern="[0-9]{12}"
                        name="aadhaar_number"
                        id="aadhaar_number"
                        placeholder="Enter Aadhaar Number"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="aadhaar_file"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Upload Aadhaar Card
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="file"
                        name="aadhaar_file"
                        id="aadhaar_file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="otherID"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Other ID Proof Type
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setOtherID(e.target.value)}
                        name="otherID"
                        id="otherID"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select ID Proof</option>
                        {OtherIDList
                          ? OtherIDList.map((otherIDtype) => {
                              return (
                                <option value={otherIDtype}>
                                  {otherIDtype}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="otherID_number"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        ID Proof Number
                        <span
                          className={otherID === "" ? "hidden" : "text-red-500"}
                        >
                          *
                        </span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required={otherID === "" ? false : true}
                        type="text"
                        pattern="[0-9]+"
                        name="otherID_number"
                        id="otherID_number"
                        placeholder="Enter ID Proof Number"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="otherID_file"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Upload ID Proof{" "}
                        <span
                          className={otherID === "" ? "hidden" : "text-red-500"}
                        >
                          *
                        </span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required={otherID === "" ? false : true}
                        type="file"
                        name="otherID_file"
                        id="otherID_file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>

                    <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                      Contact Details
                    </h2>
                    <div>
                      <label
                        htmlFor="mobile"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Mobile<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        pattern="[0-9]{10}"
                        name="mobile"
                        id="mobile"
                        placeholder="Enter Mobile Number"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emailID"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Email Address<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="email"
                        name="emailID"
                        id="emailID"
                        autoComplete="email"
                        placeholder="Enter Email Address"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Address<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <textarea
                        required
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address-level4"
                        placeholder="Enter Address"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        State<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => changeDistricts(e.target.value)}
                        required
                        name="state"
                        id="state"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select State</option>
                        {states
                          ? states.map((state) => {
                              return (
                                <option value={state.ID}>{state.name}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="district"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        District<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="district"
                        id="district"
                        value={selDistrict}
                        onChange={(e) => setSelDistrict(e.target.value)}
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select District</option>
                        {districts
                          ? districts.map((district) => {
                              return (
                                <option value={district.ID}>
                                  {district.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="pincode"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        PIN Code<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        pattern="[0-9]{6}"
                        name="pincode"
                        id="pincode"
                        placeholder="Enter PIN Code"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>
                    <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                      Education Details
                    </h2>
                    <div>
                      <label
                        htmlFor="edqual"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Educational Qualification
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="edqual"
                        id="edqual"
                        onChange={(e) => setEdqual(e.target.value)}
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">
                          Select Educational Qualification
                        </option>
                        {EducationList
                          ? EducationList.map((education) => {
                              return (
                                <option value={education}>{education}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="edstatus"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Educational Status
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setEdStatus(e.target.value)}
                        required
                        name="edstatus"
                        id="edstatus"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Educational Status</option>
                        {EducationStatusList
                          ? EducationStatusList.map((edstatus) => {
                              return (
                                <option value={edstatus}>{edstatus}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    {edqual === "Graduation" ? (
                      <>
                        <div>
                          <label
                            htmlFor="gradtype"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Graduation Type
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <select
                            required
                            name="gradtype"
                            id="gradtype"
                            className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                          >
                            <option value="">Select Graduation Type</option>
                            {GraduationList
                              ? GraduationList.map((graduation) => {
                                  return (
                                    <option value={graduation}>
                                      {graduation}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {edqual === "Post Graduation" ? (
                      <>
                        <div>
                          <label
                            htmlFor="pgradtype"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Post Graduation Type
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <select
                            required
                            name="pgradtype"
                            id="pgradtype"
                            className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                          >
                            <option value="">
                              Select Post Graduation Type
                            </option>
                            {PostGraduationList
                              ? PostGraduationList.map((pgraduation) => {
                                  return (
                                    <option value={pgraduation}>
                                      {pgraduation}
                                    </option>
                                  );
                                })
                              : ""}
                          </select>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {edqual !== "Below 10th" &&
                    edqual !== "10th" &&
                    edqual != "" ? (
                      <>
                        <div>
                          <label
                            htmlFor="specialization"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Specialization
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <input
                            required
                            type="text"
                            name="specialization"
                            id="specialization"
                            placeholder="Eg: Computer Science, Electronics"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                          />
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    {edStatus === "Pass" ? (
                      <>
                        <div>
                          <label
                            htmlFor="yofpass"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Year of Passing
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <select
                            required
                            name="yofpass"
                            id="yofpass"
                            className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                          >
                            <option value="">Select Year of Pass</option>
                            {YearList
                              ? YearList.map((year) => {
                                  return <option value={year}>{year}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="mark_percentage"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Percentage of Marks
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <input
                            required
                            type="number"
                            min="1"
                            max="100"
                            name="mark_percentage"
                            id="mark_percentage"
                            placeholder="Enter Percentage of Marks"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="edproof_file"
                            className="font-medium text-gray-700 col-span-1"
                          >
                            Upload Marks Memo
                            <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-1 col-span-3">
                          <input
                            required
                            type="file"
                            name="edproof_file"
                            id="edproof_file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                          />
                          <span className="text-gray-700 text-xs italic">
                            Supported Formats: JPG, PNG, PDF
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}

                    <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                      Family Details
                    </h2>
                    <div>
                      <label
                        htmlFor="gfirst_name"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Guardian First Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        name="gfirst_name"
                        id="gfirst_name"
                        placeholder="Enter Guardian First Name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="glast_name"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Guardian Last Name{" "}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        name="glast_name"
                        id="glast_name"
                        placeholder="Enter Guardian Last Name"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="grelation"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Relationship with Guardian
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="grelation"
                        id="grelation"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Relationship</option>
                        {GuardianRelationList
                          ? GuardianRelationList.map((grel) => {
                              return <option value={grel}>{grel}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="gmobile"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Guardian Contact Details
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="text"
                        pattern="[0-9]{10}"
                        name="gmobile"
                        id="gmobile"
                        placeholder="Enter Guardian Contact Details"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="family_members"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Number of Family Members
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        required
                        type="number"
                        min="1"
                        name="family_members"
                        id="family_members"
                        placeholder="Enter Number of Family Members"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="annual_income"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Annual Income<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="annual_income"
                        id="annual_income"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Annual Income</option>
                        {AnnulaIncomeList
                          ? AnnulaIncomeList.map((ai) => {
                              return <option value={ai}>{ai}</option>;
                            })
                          : ""}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="income_file"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Upload Income certificate
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        type="file"
                        name="income_file"
                        id="income_file"
                        accept=".jpg, .jpeg, .png, .pdf"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md border"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="prof_cwo"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Guardian Profession
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <input
                        type="text"
                        name="prof_cwo"
                        id="prof_cwo"
                        placeholder="Enter Profession"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-nirmaan focus:border-nirmaan border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="highed_family"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Who is the highest educated in the family?
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="highed_family"
                        id="highed_family"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Person</option>
                        {HighEducatedFamilyList
                          ? HighEducatedFamilyList.map((hef) => {
                              return <option value={hef}>{hef}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="highedqual_family"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Highest educated qualification in the family
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="highedqual_family"
                        id="highedqual_family"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Qualification</option>
                        {HighEducationFamilyList
                          ? HighEducationFamilyList.map((hef) => {
                              return <option value={hef}>{hef}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <h2 className="col-span-4 block text-white bg-nirmaan text-2xl rounded pl-2 py-2">
                      Other Details
                    </h2>
                    <div>
                      <label
                        htmlFor="source"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        How do you know about this training?
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="source"
                        id="source"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Source</option>
                        {SourceList
                          ? SourceList.map((source) => {
                              return <option value={source}>{source}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="tech_level"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        How do you rate your technical skills?
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="tech_level"
                        id="tech_level"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Level</option>
                        {TechLevelList
                          ? TechLevelList.map((techlevel) => {
                              return (
                                <option value={techlevel}>{techlevel}</option>
                              );
                            })
                          : ""}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="course"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Select Course<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="course"
                        id="course"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Course</option>
                        {CourseList
                          ? CourseList.map((course) => {
                              return (
                                <option value={course.code}>
                                  {course.name}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        City Of Center<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setCity(e.target.value)}
                        required
                        name="city"
                        id="city"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select City</option>
                        {cities
                          ? cities.map((city) => {
                              return (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              );
                            })
                          : ""}
                      </select>
                    </div>


<div>
                      <label
                        htmlFor="center"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Center<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        onChange={(e) => setCenter(e.target.value)}
                        required
                        name="center"
                        id="center"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                        disabled={!city} // Disable until a city is selected
                      >
                        <option value="">Select Center</option>
                        {centers
                          ? centers
                              .filter((center) => center.city === city) // Filter centers by selected city
                              .map((center) => {
                                return (
                                  <option key={center.id} value={center.center_id}>
                                    {center.address}
                                  </option>
                                );
                              })
                          : ""}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="mode"
                        className="font-medium text-gray-700 col-span-1"
                      >
                        Preferred Mode of Training
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="mt-1 col-span-3">
                      <select
                        required
                        name="mode"
                        id="mode"
                        className="w-full border border-gray-300 rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none"
                      >
                        <option value="">Select Preferred Mode</option>
                        {ModeList
                          ? ModeList.map((mode) => {
                              return <option value={mode}>{mode}</option>;
                            })
                          : ""}
                      </select>
                    </div>
                    <div className="mt-1 col-span-4">
                      {regMessage.message ? (
                        <Alert
                          type={regMessage.type}
                          message={regMessage.message}
                          icon={regMessage.icon}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-sm-1"></div>
                    <div className="mt-6 sm:col-span-2">
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-nirmaan border-nirmaan hover:bg-nirmaan hover:text-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nirmaan"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </>
                {/* )} */}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* sign in form end */}
      <Footer />
    </>
  );
}
