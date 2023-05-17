import Head from "next/head";
import Link from "next/link";
import Header from "./template/header";
import Footer from "./template/footer";


export default function Home() {
    return (
        <div id="first">
            <Head>
                <title>Nirmaan Learning Platform</title>
                <link rel="icon" href="/favicon.png" />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <Header activePage="topics" />
            <div className="" id="mydiv1">
                <div className="max-w-7xl mx-auto pt-32 px-4 sm:px-6 lg:px-8 lg:pt-32">
                    <div className="mb-8 shadow-md  rounded-md border-2">
                    <div className="mt-4 ml-4">
              <p className="font-bold text-left text-4xl leading-tight tracking-normal uppercase  ">
                Soft Skills
              </p>
              <p className="font-medium text-sm text-gray-400 tracking-widest inline-flex uppercase ">
                Topics
              </p>
              <hr className="w-32 border-t border-nirmaan inline-flex mt-auto mb-auto align-middle ml-1" />
            </div>
                        <div className='pl-7'>
                            <h2 className="text-2xl font-semibold mt-6 text-gray-600">Basic English</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>Parts of Speech</li>
                                <li>Tenses</li>
                                <li>Active and Passive Voice</li>
                            </ul>
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">Vocabulary</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>Correct Pronunciation of Words</li>
                                <li>Phrasal Verbs</li>
                            </ul>
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">Communication Skills</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>Self Introduction</li>
                                <li>Non-verbal Communication</li>
                                <li>Communication Skills</li>
                            </ul>
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">Resume Building</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>Resume Writing</li>
                            </ul>                       
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">Workplace Readiness</h2>
                            <ul className="list-disc text-lg my-2 pl-7 text-gray-500">
                                <li>Self Introspection</li>
                                <li>Goal Setting</li>
                                <li>Proactive</li>
                                <li>Inter Personal Skills</li>
                                <li>Time Management</li>
                                <li>Workplace Etiquette</li>
                                <li>SWOT Analysis</li>
                                <li>Creative Thinking</li>
                                <li>Stress Management</li>
                                <li>Problem Solving Skills</li>
                                <li>Presentation Skills</li>
                                <li>Team Work</li>
                                <li>Essential Interview Skills</li>
                                <li>Effective Tips for Self Introduction</li>
                                <li>E-mail Etiquette</li>
                                <li>Interview Questions</li>
                                <li>Grooming</li>
                            </ul>
                        </div>
                        <Link href="../courses/level/soft_skills/">
                            <a
                                type="submit"
                                className="flex justify-center w-max mx-auto px-4 py-3 border border-transparent rounded-full shadow-sm text-base font-medium hover:text-nirmaan hover:border-nirmaan bg-nirmaan hover:bg-white text-white focus:outline-none focus:ring-2 focus:ring-offset-2 mb-3 focus:ring-nirmaan"
                                >
                                Start Course
                            </a>
                        </Link>                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}