import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/outline";

export default function Instructions(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {  
        if (isStudentLoggedIn() !== true || StudentData().status!='Registered') {
            Logout();
            router.push("../");
        }
        else
            setLoading(false);
    },[]);
    return loading==false?(
        <div>
        <Head>
            <title>Instructions - Future Ready Youth Skilling Program</title>
            <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <div className='md:mt-28 mt-32 max-w-4xl mx-auto mb-16 pt-4 overflow-auto'>
            <h2 className="font-bold tracking-tight text-2xl text-center">Instructions</h2>
            <div className="mt-4 grid grid-cols-9">
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">1</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>The exam contains questions from 3 different categories. They are Technical Skills, Soft Skills and General Knowledge.</div>
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">2</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>You can navigate between the categories using <ChevronDoubleLeftIcon className="bg-nirmaan  text-white rounded-full inline w-6 mx-auto" /> and <ChevronDoubleRightIcon className="bg-nirmaan  text-white rounded-full inline w-6 mx-auto" /> buttons durinng the exam.</div>
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">3</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>The exam contains a total of 50 questions. All questions are mandatory.</div>
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">4</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>Each question carries equal marks.</div>                        
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">5</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>There is no negative marking for wrong answers.</div>                        
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">6</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>The time limit for the exam is 30 minutes. All the questions need to be answered and submitted within the given time limit.</div>                        
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">7</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>A timer will be displayed during the exam. If the exam is not submitted within the given time, It will be automatically submitted and exam will be closed.</div>
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">8</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>Do not use browser buttons such as refresh, previous and next during the examination. If you loose internet connectivity, please be patient until you reconnect. It will resume the exam from where it was left.</div>
                <div className="col-span-1 text-center w-8 h-8 text-lg text-white font-bold bg-nirmaan rounded-full md:ml-12 ml-2 mt-2">9</div>
                <div className='col-span-8 text-lg px-3 text-justify mt-2'>You cannot logout once you start the exam.</div>
            </div>
            <div className="text-center">
                <button
                    onClick={() => {router.push('../exam');}}
                    className="px-6 py-3 mt-6 w-36 rounded-md shadow-sm text-base font-medium text-white bg-nirmaan mr-4">
                    Start Exam
                </button>
                <button
                    onClick={() => {Logout();router.reload(window.location.pathname);}}
                    className="px-6 py-3 mt-6 w-36 rounded-md shadow-sm text-base font-medium text-white bg-nirmaan">
                    Logout
                </button>
            </div>
        </div>
        <Footer />
    </div>
    ):
    <div className="flex justify-center items-center h-screen">
        <img src="../../images/loading.gif" className="h-36"/>
    </div>;
}