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
          <div className="mb-8 shadow-md border-2 rounded-md">
            <div className="mt-4 ml-4">
              <p className="font-bold text-left text-4xl leading-tight tracking-normal uppercase">
                Web Developement
              </p>
              <p className="font-medium text-sm text-gray-400 tracking-widest inline-flex uppercase">
                Topics
              </p>
              <hr className="w-32 border-t border-nirmaan inline-flex mt-auto mb-auto align-middle ml-1" />
            </div>

            <div className="pl-7">
              <h2 className="text-2xl font-semibold mt-6 text-gray-600">
                HTML (Hyper Text Markup Language)
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>It is used for Graphical Representation of a Page.</li>
                <li>Text Basics</li>
                <li>
                  Text-formatting Elements i.e. (How to Make the text bold, give
                  the underlines to it and Italic text )
                </li>
                <li>Images alignment in the webpage</li>
                <li>Lists and Redirecting to the pages.</li>
                <li>Tables, nav tag, section and footer</li>
                <li>Basic Forms</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                CSS3 (Cascading Style Sheets)
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>Basics of CSS.</li>
                <li>Font Styles and color</li>
                <li>List Styles and Box Model</li>
                <li>
                  CSS Selectors (class & Id) Key Frames and Basic Design of
                  Forms
                </li>
                <li>Navigation Menus, Animations by Animate.css and CDN.</li>
                <li>
                  Social Icons by Font Awesome CDN(Content Delivery Network)
                </li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                BOOTSTRAP 4
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>
                  It's a Framework Which will help for to create a webpage in an
                  easy way.
                </li>
                <li>Containers</li>
                <li>Grid Layout and Border Layout.</li>
                <li>
                  Components (Navbar, Jumbotron, Modal, Forms, Cards… etc.)
                </li>
                <li>Navigation Menus, Animations by Animate.css and CDN.</li>
                <li>Project By Bootstrap using Git hosting.</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                PHP (Hypertext Processor)
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>For Client-Side programming we use PHP</li>
                <li>Variables</li>
                <li>Inserting and Using Database Data</li>
                <li>PHP Functions and PHP oops</li>
                <li>Form Validation by PHP</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                JavaScript
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>This is used to make the webpage more Functionality.</li>
                <li>Variables (let, const and var)</li>
                <li>Data types (Arrays, Object, Functions, Number & String)</li>
                <li>DOM (Document Object Model)</li>
                <li>
                  Event Listeners (click, keyup & keydown) and also small
                  project by all these concepts
                </li>
                <li>AJAX (Asynchronous JavaScript)</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                Angular JS
              </h2>
              <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                <li>
                  To develop modern, responsive Single-page Web Application we
                  use Angular
                </li>
                <li>Introduction to Angular</li>
                <li>Data types (Arrays, Object, Functions, Number & String)</li>
                <li>
                  Angular Fundamentals.(Components, Generation By CLI,
                  Directives and Services)
                </li>
                <li>
                  Display Data and Handling Events(Attribute Binding, Adding
                  Bootstrap, Two way Bindings… etc.)
                </li>
                <li>Custom Pipes</li>
              </ul>
              <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                MySQL
              </h2>
              <ul className="list-disc text-lg my-2 pl-7 text-gray-500">
                <li>MySQL Intro</li>
                <li>Database Creation</li>
                <li>Create Tables</li>
                <li>Select Data, Insertion of Data</li>
                <li>Update Data, Delete of Data</li>
              </ul>
            </div>
            <Link href="../courses/level/web_development/">
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
  );
}
