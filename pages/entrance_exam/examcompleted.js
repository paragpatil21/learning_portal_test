import Head from "next/head";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { isStudentLoggedIn, Logout, StudentData } from "../../utils/Student";

export default function Expired(){
    const router = useRouter();    
    const [loading, setLoading] = useState(true);
    useEffect(() => {  
        if (isStudentLoggedIn() !== true || StudentData().status!='Written Test Completed') {
            Logout();
            router.push("../");
        }
        else
            setLoading(false);
    },[]);
    return loading==false?(
        <>
            <Head>
            <title>Entrance Exam - Future Ready Youth Skilling Program</title>
            <link rel="icon" href="/favicon.png" />
            </Head>
            <Header />
            <div className="mt-36 mx-4 text-center">
                <BadgeCheckIcon className="md:h-20 h-10 text-green-400 mx-auto"/>
                <h2 className="text-xl font-bold tracking-tight">Your answers are submitted successfully. Our team will contact you based on the result after validation. Contact us at shiksha@nirmaan.org or +91-6281450591, +91-8247717684 for any further clarifications.</h2>
                <button
                    onClick={() => {Logout();router.reload(window.location.pathname);}}
                    className="px-6 py-3 mt-6 rounded-md shadow-sm text-base font-medium text-white bg-nirmaan">
                    Logout
                </button>
            </div>
            <Footer />
        </>
    ):
    <div className="flex justify-center items-center h-screen">
        <img src="../../images/loading.gif" className="h-36"/>
    </div>;
}