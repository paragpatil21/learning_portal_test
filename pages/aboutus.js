import Head from "next/head";
import Header from "./template/header";
import Footer from "./template/footer";

export default function Example() {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header activePage="aboutus" />
      <div className="" id="mydiv1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-32 pb-10 pt-32">
          <div className="mb-2 shadow-md border-2 rounded-md">
            <div classNaame="sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2
                className="font-heading text-3xl sm:text-4xl mb-4 font-bold heading1 text-center"
                id="heading1"
              >
                Our History{" "}
              </h2>
            </div>
            <div className="px-7 text-lg text-gray-800">
              <div className="px-1 pb-3">
                Where people hesitate to tread their steps towards service, a
                group of students from BITS Pilani initiated the voluntary
                efforts to serve the needy people from the lower strata. They
                started teaching to the children of mess workers and
                construction labor and used to visit local villagers. One day,
                Kashiram Ka, their regular student, who worked as a Rikshawala,
                didn’t appear in the gathering. Wondered, the students visited
                his home and ended up with an epiphany on the conditions of life
                in the village of Pilani. The Riskshawala had met with an
                accident and was bed ridden. His girl child had to drop out to
                help her mother in day to day work, they couldn't afford medical
                care nor proper food - they were eating roti that is cooked days
                ago
              </div>

              <div className="px-1 pb-3">
                This encounter left a lasting impact on the students and
                motivated them to explore deeper on one’s responsibility for a
                better tomorrow for others and the nation. Back to the Campus,
                the group announced a meet-up for those who wanted to contribute
                to the Nation. The group was pleasantly surprised to see 150+
                students dropping in, realizing the very fact that 'we are NOT
                ALONE'.
              </div>
              <div className="px-1 pb-3">
                The ignited hearts didn’t give up after the passing out of their
                studies. Placed across the country in various MNCs, the
                graduates continued the Spirit by identifying various
                initiatives in and around their respective locations, formed
                Chapters, inspired their colleagues, raised funds and started
                volunteering during weekends.
              </div>
              <div className="px-1">
                Thus, ‘My India’, a humble passion driven initiative by a group
                of 10 students evolved into ‘Nirmaan’ in 2007 as a Registered
                Society with the motto ‘We Have Only One passion, The Rise of a
                Great Nation’. Since then, it has grown multifold and has
                reached out to 5+ lakh people in 8 states of India, with the
                financial and moral support of people from various walks of life
                viz., Philanthropists, Technocrats, Artists, Entrepreneurs,
                Social Activists, Social Science Experts and last but not least
                funding partners.
              </div>

              <h2 className="text-2xl font-semibold mt-6 text-gray-600">
                About the Program
              </h2>




            <img className="float-left  w-96 h-72 mt-6 rounded-2xl border-2 border-nirmaan mr-8" src="/images/WIT_center.jpg" alt="No Image Found" />
              
              
                <p>
                  {" "}
                  Nirmaan Organization with the support of Infosys and HSBC provides Free
                  Training and Placement program for graduated women. This is a
                  certification cum placement training program, which means that
                  we will issue a certificate & provide placement assistance.
                  The details of the program are as follows.
                </p>
                <b>Duration</b>: 3 months <br />
                <b>Courses Covered</b>: Web development technologies,Information Technology Enabled Services and soft
                skills <br />
                <b>Qualification:</b><br/>
                <span className="text-gray-600 font-bold">Web Development</span>:
                  for womens only with B.Sc., B.Tech., M.Sc.,B.C.A
                M.Tech. and M.C.A.,	Pass out batches from 2018 to 2022. <br/>
                <span className="text-gray-600 font-bold">Information Technology Enabled Services</span>:
                  for womens only with SSC, Diploma, Intermediate, Degree,
                	Pass out batches from 2018 to 2022. <br/>

                {/* <b className="underline">Age Limit:</b><br/>
                <span className="text-gray-600 font-bold"> Web Application Developement</span>: 20-27 years old<br/>
                <span className="text-gray-600 font-bold"> Information Technology Enabled Services</span>: 18-27 years old */}
                
                



<br /><br /><br />


              {/* <h2 className="text-2xl font-semibold mt-5 text-gray-600">
                {" "}
                Word by the Sponsor
              </h2> */}
             
              {/* <h2 className="text-2xl font-semibold mt-5 text-gray-600">BOOTSTRAP 4</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>It's a Framework Which will help for to create a webpage in an easy way.</li>
                                <li>Containers</li>
                                <li>Grid Layout and Border Layout.</li>
                                <li>Components (Navbar, Jumbotron, Modal, Forms, Cards… etc.)</li>
                                <li>Navigation Menus, Animations by Animate.css and CDN.</li>
                                <li>Project By Bootstrap using Git hosting.</li>
                            </ul>
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">PHP (Hypertext Processor)</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>For Client-Side programming we use PHP</li>
                                <li>Variables</li>
                                <li>Inserting and Using Database Data</li>
                                <li>PHP Functions and PHP oops</li>
                                <li>Form Validation by PHP</li>
                            </ul>
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">JavaScript</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>This is used to make the webpage more Functionality.</li>
                                <li>Variables (let, const and var)</li>
                                <li>Data types (Arrays, Object, Functions, Number & String)</li>
                                <li>DOM (Document Object Model)</li>
                                <li>Event Listeners (click, keyup & keydown) and also small project by all these concepts</li>
                                <li>AJAX (Asynchronous JavaScript)</li>
                            </ul>                            
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">Angular JS</h2>
                            <ul className="list-disc text-lg mt-2 pl-7 text-gray-500">
                                <li>To develop modern, responsive Single-page Web Application we use Angular</li>
                                <li>Introduction to Angular</li>
                                <li>Data types (Arrays, Object, Functions, Number & String)</li>
                                <li>Angular Fundamentals.(Components, Generation By CLI, Directives and Services)</li>
                                <li>Display Data and Handling Events(Attribute Binding, Adding Bootstrap, Two way Bindings… etc.)</li>
                                <li>Custom Pipes</li>
                            </ul>                          
                            <h2 className="text-2xl font-semibold mt-5 text-gray-600">MySQL</h2>
                            <ul className="list-disc text-lg my-2 pl-7 text-gray-500">
                                <li>MySQL Intro</li>
                                <li>Database Creation</li>
                                <li>Create Tables</li>
                                <li>Select Data, Insertion of Data</li>
                                <li>Update Data, Delete of Data</li>
                            </ul> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
