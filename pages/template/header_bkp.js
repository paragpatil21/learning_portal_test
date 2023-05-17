import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";
import {
  UserCircleIcon,
  UserIcon,
  LightningBoltIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
const axios = require("axios");
import { API_URL, BASE_URL } from "../../config/constants";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const [userFullName, setUserFullName] = useState(StudentData().FullName);
  const [userimage, setUserImage] = useState(StudentData().Image);
  const [loggedOut, setLoggedOut] = useState(false);
  const [studentLoggedIn, setStudentLoggedIn] = useState(isStudentLoggedIn());
  const [collectionMenuOpen, setCollectionMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);
  const [isShowing1, setIsShowing1] = useState(false);
  const [activePage2, setActivePage] = useState("");

  useEffect(() => {
    if (loggedOut === true) {
      router.reload(window.location.pathname);
    }
    if (isStudentLoggedIn() === true && StudentData().ID) {
      axios
        .post(API_URL + "get_points.php", {
          student: StudentData().UniqueID,
        })
        .then(function (response) {
          if (response?.data?.meta?.error) {
          }
          if (!response?.data?.meta?.error) {
            setPoints(response?.data?.points > 0 ? response?.data?.points : 0);
          }
          setPageLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [loggedOut]);

  function logOut() {
    Logout();
    setLoggedOut(true);
  }
  return (
    <div className="fixed left-0 top-0 right-0 z-10 font-content">
      <main>
        <nav className="bg-white block w-full z-30 border-b border-gray-200">
          <div className="mx-auto px-3 md:px-6 lg:px-2 xl:px-16">
            <div className="relative flex items-center justify-between h-24">
              {/* mobile header start */}
              <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div
                    className="ml-3 relative z-30"
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <div>
                      <button
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="flex items-center transition duration-300 ease-in-out bg-gray-50 hover:text-nirmaan text-gray-700 px-2 py-2 rounded-md text-base font-medium ml-5"
                      >
                        <img
                          src={
                            userimage ? API_URL + userimage : "/usericon.png"
                          }
                          alt="User Avatar"
                          class="inline-block w-10 h-10 rounded-full mr-2"
                        />
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {(ref) => (
                        <div
                          ref={ref}
                          className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <Link href="/account/profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Edit Profile
                            </a>
                          </Link>
                          <Link href="/account/change-password">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Change Password
                            </a>
                          </Link>
                          <Link href="/account/webinars">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Webinars
                            </a>
                          </Link>
                          <a
                            onClick={() => logOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
                {isStudentLoggedIn() !== true ? (
                  <Link href="/login">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md text-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      aria-controls="mobile-menu"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Sign In</span>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-700 p-2 text-base"
                      >
                        Sign In
                      </a>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setMainMenuOpen(!mainMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <img
                        className="block lg:hidden h-12 w-auto"
                        src="/logo.png"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-14 w-auto"
                        src="/logo.png"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                </div>
              </div>
              {/* mobile header end */}
              {/* desktop header start */}
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center justify-center sm:static sm:inset-auto sm:ml-6 sm:pr-0 text-nirmaan-header">
                <div className="hidden lg:flex ml-10">
                  <Link href={BASE_URL + "/"}>
                    <a
                      className={
                        classNames(
                          props.activePage === "Home"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      Home
                    </a>
                  </Link>
                  <Link
                    href={BASE_URL + "/aboutus"}
                    onClick={() => {
                      setActivePage("about");
                    }}
                  >
                    <a
                      className={
                        classNames(
                          activePage2 === "about"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      About
                    </a>
                  </Link>
                  <div className="relative inline-block">
                    <Link
                      href={
                        isStudentLoggedIn() === true
                          ? BASE_URL + "/courses"
                          : BASE_URL + "topics"
                      }
                    >
                      <a
                        className={
                          classNames(
                            props.activePage === "topics"
                              ? "text-nirmaan "
                              : "text-gray-700 "
                          ) +
                          "focus:ring-nirmaan focus:border-nirmaan flex items-center hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                        }
                      >
                        Topics
                      </a>
                    </Link>
                  </div>
                  {/* <Link href={BASE_URL + "#testimonials"}>
                    <a
                      className={
                        classNames(
                          props.activePage === "tesimonials"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      Testimonials
                    </a>
                  </Link> */}
                  {/* <Link href={BASE_URL + "/successstories"}>
                    <a
                      className={
                        classNames(
                          props.activePage === "successstories"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      Success Stories
                    </a>
                  </Link> */}

                  <div class="relative inline-block text-left mt-1">
                    <div>
                      <button
                        onClick={() => setIsShowing((isShowing) => !isShowing)}
                        type="button"
                        class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        Code Editors
                        <svg
                          class="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <Transition
                      show={isShowing}
                      enter="transition-opacity duration-75"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        class="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/html-compiler.html">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-0"
                            >
                              {" "}
                              HTML Editor
                            </a>
                          </Link>
                        </div>
                        <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/sqleditor.html">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                              SQL Editor
                            </a>
                          </Link>
                        </div>

                        {/* <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/quizzes">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                           333
                            </a>
                          </Link>
                         
                        </div> */}
                        {/* <div class="py-1" role="none">
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</a>
    </div>
    <div class="py-1" role="none">
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</a>
    </div> */}
                      </div>
                    </Transition>
                  </div>


                  <div class="relative inline-block text-left mt-1">
                    <div>
                      <button
                        onClick={() => setIsShowing1((isShowing1) => !isShowing1) }
                        type="button"
                        class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                      >
                        More..
                        <svg
                          class="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <Transition
                      show={isShowing1}
                      enter="transition-opacity duration-75"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        class="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabindex="-1"
                      >
                        <div class="py-1 hover:bg-gray-200" role="none">
                          <Link href="/successstories">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                              Success Stories
                            </a>
                          </Link>
                        </div>
                        <div class="py-1 hover:bg-gray-200" role="none">
                          <Link href="/contactus">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                              Contact Us
                            </a>
                          </Link>
                        </div>
                        <div class="py-1 hover:bg-gray-200" role="none">
                          <Link href="/contactus">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                              Testimonials
                            </a>
                          </Link>
                        </div>

                        {/* <div class="py-1 hover:bg-gray-100" role="none">
                          <Link href="/quizzes">
                            <a
                              class="text-gray-700 block px-4 py-2 text-sm"
                              role="menuitem"
                              tabindex="-1"
                              id="menu-item-1"
                            >
                              {" "}
                           333
                            </a>
                          </Link>
                         
                        </div> */}
                        {/* <div class="py-1" role="none">
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Share</a>
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-5">Add to favorites</a>
    </div>
    <div class="py-1" role="none">
      <a href="#" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-6">Delete</a>
    </div> */}
                      </div>
                    </Transition>
                  </div>


                  {isStudentLoggedIn() === true ? (
                    <Link href="/account/credits">
                      <a
                        className="text-lg font-bold text-yellow-400 border-2 border-yellow-400 hover:text-yellow-500 hover:border-yellow-500 rounded-full px-3 py-1 ml-3 flex justify-start align-middle items-center"
                        title="Your Learning Credits"
                      >
                        <LightningBoltIcon className="w-5 h-5" /> {points}{" "}
                        Credits
                      </a>
                    </Link>
                  ) : (
                    ""
                  )}



                  {/* <Link href={BASE_URL + "/contactus"}>
                    <a
                      className={
                        classNames(
                          props.activePage === "contactus"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "focus:ring-nirmaan focus:border-nirmaan flex items-center transition duration-300 ease-in-out hover:text-nirmaan px-3 py-2 rounded-md text-base font-medium ml-2"
                      }
                    >
                      Contact Us
                    </a>
                  </Link> */}
                  {/*
                    isStudentLoggedIn() === true ? (
                    <Link href="/account/credits">
                      <a className="text-lg font-bold text-yellow-400 border-2 border-yellow-400 hover:text-yellow-500 hover:border-yellow-500 rounded-full px-3 py-1 ml-3 flex justify-start align-middle items-center" title="Your Learning Credits">
                        <LightningBoltIcon className="w-5 h-5" /> {points} Credits
                      </a>
                    </Link>
                  ) : (
                    ""
                  )*/}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden lg:flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {isStudentLoggedIn() === true ? (
                  ""
                ) : (
                  <Link href={BASE_URL + "/login"}>
                    <a className="flex items-center transition duration-300 ease-in-out bg-nirmaan text-blue-50 hover:bg-nirmaan-dark pl-4 pr-5 py-2 rounded-full text-base font-medium mx-3">
                      Login
                    </a>
                  </Link>
                )}
                {/* Profile dropdown  */}
                {isStudentLoggedIn() === true ? (
                  <div
                    className="ml-3 relative z-30"
                    onMouseEnter={() => setAccountMenuOpen(!accountMenuOpen)}
                    onMouseLeave={() => setAccountMenuOpen(!accountMenuOpen)}
                  >
                    <div>
                      <button
                        id="user-menu"
                        aria-expanded="false"
                        aria-haspopup="true"
                        className="flex items-center transition duration-300 ease-in-out hover:text-nirmaan text-gray-700 px-5 py-5 rounded-md text-base font-medium ml-5"
                      >
                        <img
                          src={
                            userimage ? API_URL + userimage : "/usericon.png"
                          }
                          alt="User Avatar"
                          class="inline-block w-7 h-7 rounded-full mr-2"
                        />{" "}
                        <span>{userFullName}</span>
                      </button>
                    </div>
                    <Transition
                      show={accountMenuOpen}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {(ref) => (
                        <div
                          ref={ref}
                          className="absolute origin-top-right right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu"
                        >
                          <div className="-mt-1 px-4 py-2 border-b bg-cover flex-row items-center justify-center align-middle">
                            <div className="text-md text-gray-700 mt-2">
                              {userFullName}
                            </div>
                            <div className="mb-2 text-md font-bold text-black flex justify-start align-middle items-center">
                              #{StudentData().UniqueID}
                            </div>
                          </div>
                          <Link href="/account/profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              View Profile
                            </a>
                          </Link>
                          <Link href="/account/edit-profile">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Edit Profile
                            </a>
                          </Link>
                          <Link href="/account/change-password">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Change Password
                            </a>
                          </Link>
                          <Link href="/account/webinars">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              Webinars
                            </a>
                          </Link>
                          <Link href="/savedcode">
                            <a
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              role="menuitem"
                            >
                              My Programs
                            </a>
                          </Link>
                          <a
                            onClick={() => logOut()}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      )}
                    </Transition>
                  </div>
                ) : (
                  ""
                )}
                <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                  <div className="flex-shrink-0">
                    <a>
                      <img
                        className="block lg:hidden h-5 w-auto"
                        src="/infosys-logo-png.png"
                        alt="Sponsor"
                      />
                      <img
                        className="hidden lg:block h-6 w-auto"
                        src="/infosys-logo-png.png"
                        alt="Sponsor"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Transition
            show={mainMenuOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {(ref) => (
              <div
                ref={ref}
                className={`transition ease-in-out duration-200`}
                id="mobile-menu"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link href="/">
                    <a
                      className={
                        classNames(
                          props.activePage === "Home"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      Home
                    </a>
                  </Link>
                  <Link href="/aboutus" as="/aboutus">
                    <a
                      className={
                        classNames(
                          props.activePage === "Courses"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      AboutUs
                    </a>
                  </Link>
                  <Link href="/successstories" as="/successstories">
                    <a
                      className={
                        classNames(
                          props.activePage === "Courses"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      Success Stories
                    </a>
                  </Link>
                  <Link href="/contactus" as="/contactus">
                    <a
                      className={
                        classNames(
                          props.activePage === "Courses"
                            ? "text-nirmaan "
                            : "text-gray-700 "
                        ) +
                        "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      }
                      aria-current="page"
                    >
                      ContactUs
                    </a>
                  </Link>
                  {/* <Link href="/certifications">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Certifications</a>
                  </Link> */}
                  {/* <Link href="/html-compiler.html">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
                      HTML Editor
                    </a>
                  </Link>
                  <Link href="/sqleditor.html">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">
                      SQL Editor
                    </a>
                  </Link> */}
                  {/* <Link href="/sponsors">
                    <a className={classNames(props.activePage === "Sponsors" ? "text-nirmaan " : "text-gray-700 ") + "hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"}>Sponsors</a>
                  </Link>
                   <Link href="/certifications">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Certifications</a>
                  </Link> 
                   <Link href="/leaderboard">
                    <a className="text-gray-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Leaderboard</a>
                  </Link>  */}
                </div>
              </div>
            )}
          </Transition>
        </nav>
      </main>
    </div>
  );
}
