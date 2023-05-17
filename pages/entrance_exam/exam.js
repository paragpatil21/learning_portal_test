import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { API_URL } from "../../config/constants";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";
import Alert from "../../components/ui/alert";
import { Offline, Online } from "react-detect-offline"
import { ExclamationIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { useTimer } from 'use-timer';
import Cookies from "js-cookie";
const axios = require("axios");

export default function Instructions() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paper, setPaper] = useState({});
  const [subject, setSubject] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "", icon: "" });
  const [formattedTime, setFormattedTime] = useState('30:00');
  const [mode, setMode] = useState(()=>'auto');
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 1800, //in seconds
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeUpdate: (time) => {       
      setInterval(function(){
        if(navigator.onLine && time!=0 && mode!='manual'){
          start();
        }
        else if(time==0){
          pause();
          setFormattedTime("Time Up");
        }
        else{
          pause();
        }
      },1000);
       let minutes = String(Math.floor(time/60)).padStart(2,0);
       let seconds = String(time%60).padStart(2,0);
       setFormattedTime(minutes+" : "+seconds);
    },
    onTimeOver : () => {
      submitpaper('auto');
    }
  });
  function submitpaper(smode){
    if(smode=='manual'){
      if(Object.keys(formData).length<50){
        setMode('auto');
        setSubmitMessage({ type: "error", message: "Please submit all answers", icon: "error" });
      }
      else{
        setSubmitMessage({ type: "", message: "", icon: "" });
        sendpaper();
      }
    }
    else{
      setSubmitMessage({ type: "", message: "", icon: "" });
      sendpaper();
    }
  }  
  function sendpaper(){
    axios
      .post(API_URL+"entrance_exam/submitpaper.php", {regID:StudentData().regID, formData: formData})
      .then(function (response) {
          if (response?.data?.meta?.error) {
            setSubmitMessage({ type: "error", message: "Something Went Wrong! Please Resubmit!", icon: "error" });
          }
          if (!response?.data?.meta?.error) {
            setSubmitMessage({ type: "success", message: "Successfully Submitted Answers", icon: "success" });
            //clearing old cookies
            Cookies.remove("student_login_token");
            Cookies.remove("student_data");
            //adding new cookies            
            Cookies.set("student_login_token", response.data?.data?.ID, { expires: 10 });
            Cookies.set("student_data", JSON.stringify(response.data?.data), { expires: 10 });
            router.push("../examcompleted");
          }
      })
      .catch(function (error) {
          console.log(error);
          setSubmitMessage({ type: "error", message: "Something went wrong! Please try again!", icon: "error" });
      });
  }
  function convertDataToHtml(code) {
    var convertedHtml = "";
    var blocks = JSON.parse(code).blocks;
    blocks.map((block) => {
      switch (block.type) {
        case "header":
          convertedHtml += `<h${block.data.level}>${block.data.text.trim()}</h${
            block.data.level
          }>`;
          break;
        case "embded":
          convertedHtml += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
          break;
        case "paragraph":
          convertedHtml += `<p>${block.data.text}</p>`;
          break;
        case "delimiter":
          convertedHtml += "<hr />";
          break;
        case "raw":
          convertedHtml += block.data.html;
          break;
        case "rawTool":
          convertedHtml += block.data.html;
          break;
        case "image":
          convertedHtml += `<img className="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" />`;
          // <br /><em>${block.data.caption}</em>
          break;
        case "code":
          convertedHtml +=
            `<pre>` +
            block.data.code
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;") +
            `</pre>`;
          convertedHtml +=
            `<a target="_blank" href="/editor.html?topic=` +
            courseTopic?.ID +
            `&id=` +
            block.id +
            `">
              <span className="text-lg no-underline cursor-pointer bg-nirmaan hover:bg-nirmaan-dark hover:text-nirmaan-light text-nirmaan-darker font-bold py-1 px-4 rounded inline-flex items-center">
                Try it on Code Editor
              </span></a>`;
          break;
        case "table":
          convertedHtml += "<table>";
          block.data.content.forEach(function (tr) {
            convertedHtml += "<tr>";
            tr.forEach(function (td) {
              convertedHtml += `<td>${td.replace(
                /\[\[\[(.+?)\]\]\]/g,
                function (m, url) {
                  return '<img src="' + url + '">';
                }
              )}</li>`;
            });
            convertedHtml += "</tr>";
          });
          convertedHtml += "</table>";
          break;
        case "list":
          convertedHtml += "<ul>";
          block.data.items.forEach(function (li) {
            convertedHtml += `<li>${li}</li>`;
          });
          convertedHtml += "</ul>";
          break;
        default:
          console.log("Unknown block type", block.type);
          break;
      }
    });
    return convertedHtml;
  }

  const handleChange=(evt)=>{
      setFormData({...formData,[evt.target.name]:evt.target.value})
  }

  useEffect(() => {
    if (isStudentLoggedIn() !== true || StudentData().status != "Registered") {
      Logout();
      router.push("../");
    } else {
      setLoading(false);
      axios
        .post(API_URL + "entrance_exam/get_questions.php")
        .then(function (response) {
          console.log(response);
          setPaper(() => {
            return Object.assign({}, response.data.meta.questions);
          });
          start();
          //console.log(questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return loading == false ? (
    <div>
      <Head>
        <title>Exam - Future Ready Youth Skilling Program</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Offline>
        <div className="mt-36 text-center">
            <ExclamationIcon className="md:h-24 h-12 text-red-600 mx-auto"/>
            <h2 className="text-xl font-bold tracking-tight max-w-4xl mx-auto">Your Internet connectivity is Lost. Please wait until internet is reconnected. Please do not refresh the page or do not press previous, next buttons in browser.</h2>
        </div>
      </Offline>
      <Online>
      <form className="md:mt-28 mt-32">
        {paper
          ? Object.keys(paper).map(
              (value, index) =>
                subject === index && (
                  <div className="xl:max-w-5xl lg:max-w-4xl md:max-w-xl mx-auto mt-6 mb-16 pt-4 overflow-auto border-2 rounded-md">
                    <h2 className="font-bold tracking-tight text-2xl text-center">
                      {value}
                    </h2>
                    <ol className="list-decimal p-10" id="index">
                      {paper[value].map((item) => (
                        <li>
                          <div
                            className="mt-5"
                            dangerouslySetInnerHTML={{
                              __html: convertDataToHtml(item.question),
                            }}
                          ></div>
                          <ul>
                            <input
                              type="radio"
                              className="mr-3"
                              name={item.ID}
                              value="A"
                              onChange={handleChange}
                              checked={formData[item.ID]==="A"}
                            />
                            A.
                            <span className="ml-2">
                              {JSON.parse(item.options)["optiona_type"] ==
                              "text" ? (
                                JSON.parse(item.options)["optiona"]
                              ) : (
                                <img
                                  className="inline"
                                  src={JSON.parse(item.options)["optiona"]}
                                />
                              )}
                            </span>
                          </ul>
                          <div>
                            <input
                              type="radio"
                              className="mr-3"
                              name={item.ID}
                              value="B"
                              onChange={handleChange}
                              checked={formData[item.ID]==="B"}
                            />
                            B.
                            <span className="ml-2">
                              {JSON.parse(item.options)["optionb_type"] ==
                              "text" ? (
                                JSON.parse(item.options)["optionb"]
                              ) : (
                                <img
                                  className="inline"
                                  src={JSON.parse(item.options)["optionb"]}
                                />
                              )}
                            </span>
                          </div>
                          {item.optioncount >= 3 ? (
                            <div>
                              <input
                                type="radio"
                                className="mr-3"
                                name={item.ID}
                                value="C"
                                onChange={handleChange}
                                checked={formData[item.ID]==="C"}
                              />
                              C.
                              <span className="ml-2">
                                {JSON.parse(item.options)["optionc_type"] ==
                                "text" ? (
                                  JSON.parse(item.options)["optionc"]
                                ) : (
                                  <img
                                    className="inline"
                                    src={JSON.parse(item.options)["optionc"]}
                                  />
                                )}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.optioncount >= 4 ? (
                            <div>
                              <input
                                type="radio"
                                className="mr-3"
                                name={item.ID}
                                value="D"
                                onChange={handleChange}
                                checked={formData[item.ID]==="D"}
                              />
                              D.
                              <span className="ml-2">
                                {JSON.parse(item.options)["optiond_type"] ==
                                "text" ? (
                                  JSON.parse(item.options)["optiond"]
                                ) : (
                                  <img
                                    className="inline"
                                    src={JSON.parse(item.options)["optiond"]}
                                  />
                                )}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                          {item.optioncount >= 5 ? (
                            <div>
                              <input
                                type="radio"
                                className="mr-3"
                                name={item.ID}
                                value="E"
                                onChange={handleChange}
                                checked={formData[item.ID]==="E"}
                              />
                              E.
                              <span className="ml-2">
                                {JSON.parse(item.options)["optione_type"] ==
                                "text" ? (
                                  JSON.parse(item.options)["optione"]
                                ) : (
                                  <img
                                    className="inline"
                                    src={JSON.parse(item.options)["optione"]}
                                  />
                                )}
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </li>
                      ))}
                    </ol>
                    <div>
                      {subject != 0 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSubject(() => subject - 1);
                          }}
                          className="fixed top-1/2 w-12 h-12 left-0 rounded-full font-medium text-white bg-nirmaan"
                        >
                          <ChevronDoubleLeftIcon className="w-6 mx-auto" />
                        </button>
                      ) : (
                        ""
                      )}
                      {subject != 2 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSubject(() => subject + 1);
                          }}
                          className="fixed top-1/2 w-12 h-12 right-0 rounded-full font-medium text-white bg-nirmaan"
                        >
                          <ChevronDoubleRightIcon className="w-6 mx-auto" />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )
            )
          : ""}
      </form>
      </Online>
      <section className="p-3 border-t-2 fixed bottom-0 w-full bg-white">
          <div className="container mx-auto">                
              <div className="flex flex-wrap items-center justify-between">
                 <h2 className="text-sm mx-auto md:hidden">{submitMessage.message ? <Alert type={submitMessage.type} message={submitMessage.message} icon={submitMessage.icon} /> : ""}</h2>
              </div>
              <div className="flex flex-wrap items-center justify-between">
                  <h2 className="px-5 py-2 rounded-md bg-gray-700 text-white font-semibold text-xl">{formattedTime}</h2>
                  <div className="w-full md:w-auto text-center hidden md:block">
                      <h2 className="text-lg">{submitMessage.message ? <Alert type={submitMessage.type} message={submitMessage.message} icon={submitMessage.icon} /> : ""}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={()=>{setMode(()=>'manual');submitpaper('manual')}}
                    className="px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-nirmaan mr-4">
                    Submit
                  </button>
              </div>
          </div>
      </section>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <img src="../../images/loading.gif" className="h-36" />
    </div>
  );
}
