import Head from "next/head";
import Link from "next/link";
// import {SocialMediaIconsReact} from 'social-media-icons-react';

export default function Footer() {
  return (
      <footer className="font-sans mt-auto">
          <section className="pt-4 overflow-hidden bg-gray-200 text-center lg:text-left ">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 lg:w-3/12 p-6">
                  <div className=" h-full">
                    <img className=" m-auto  lg:hidden h-16 w-auto" src="/logo.png" alt="Logo" />
                    <img className="hidden lg:block h-16 w-auto" src="/logo.png" alt="Logo" />
                    <p className="text-sm">
                    Nirmaan Organization is a registered NGO, started by students of BITS Pilani in 2005. We work in the areas of Education, Skill Development & Entrepreneurship and Social Leadership.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-3/12 p-6">
                  <div className="h-auto">
                    <h3 className="mb-2 font-heading font-semibold text-base text-gray-900 uppercase tracking-px">Company</h3>
                    <ul className="text-sm">
                      <li className="mb-1"><a className="text-gray-500 text-base" href="/">Home</a></li>
                      <li className="mb-1"><a className="text-gray-500 text-base" href="/aboutus">About Us</a></li>
                      <li className="mb-1"><a className="text-gray-500 text-base" href="/terms-of-service">Terms of Service</a></li>
                      <li><a className="text-gray-500 text-base" href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-3/12 p-6">
                  <div className="h-full">
                    <h3 className="mb-2 font-heading font-semibold text-base text-gray-900 uppercase tracking-px">Courses</h3>
                    <ul className="text-sm">
                      <li className="mb-1"><a className="text-base text-gray-500" href="/web_development">Web Development</a></li>
                      <li className="mb-1"><a className="text-base text-gray-500" href="/soft_skills">Soft Skills</a></li>
                      <li className="mb-1"><a className="text-base text-gray-500" href="/ites">Information Technology Enabled Services</a></li>
                    </ul>
                  </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-3/12 p-6">
                  <div className="h-full">
                    <h3 className="mb-2 font-heading font-semibold text-base text-gray-900 uppercase tracking-px">Contact Us</h3>
                    <ul className="text-sm">
                      <li className="mb-1"><p className="text-base text-gray-500" href="#">+91-6281450591, +91-8247717684</p></li>
                      <li className="mb-1"><p className="text-base text-gray-500" href="#">shiksha@nirmaan.org</p></li>
                      {/* <li><p className="text-base text-gray-500" href="#">Nirmaan Organization Centers:<a className="text-base text-blue-500" href="/ourcenters">Centers contact list</a> </p></li> */}
                    </ul>
                  </div>
                </div>
              </div>              
            </div>
            <div className="flex flex-wrap items-center justify-between bg-gray-200 px-14 mx-auto">
                <div className="w-auto p-6">
                  <p className="text-sm text-gray-900">&copy; Copyright <b>Nirmaan.org.</b> All Rights Reserved</p>
                </div>
                <div className="w-auto p-6 m-auto  md:m-0 ">
                  <div className="flex flex-wrap  items-center gap-2">


<Link href="https://www.facebook.com/nirmaanorg">
<svg className="w-8 h-8  stroke-current fill-current text-blue-500 cursor-pointer" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6 44.2 0 82.1 3.3 93.2 4.8v107.9z"></path></svg>

</Link>
<Link href="https://twitter.com/Nirmaan_Org?lang=en">
<svg className="w-8 h-8 stroke-current fill-current text-nirmaan cursor-pointer" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM727.3 401.7c.3 4.7.3 9.6.3 14.4 0 146.8-111.8 315.9-316.1 315.9-63 0-121.4-18.3-170.6-49.8 9 1 17.6 1.4 26.8 1.4 52 0 99.8-17.6 137.9-47.4-48.8-1-89.8-33-103.8-77 17.1 2.5 32.5 2.5 50.1-2a111 111 0 0 1-88.9-109v-1.4c14.7 8.3 32 13.4 50.1 14.1a111.13 111.13 0 0 1-49.5-92.4c0-20.7 5.4-39.6 15.1-56a315.28 315.28 0 0 0 229 116.1C492 353.1 548.4 292 616.2 292c32 0 60.8 13.4 81.1 35 25.1-4.7 49.1-14.1 70.5-26.7-8.3 25.7-25.7 47.4-48.8 61.1 22.4-2.4 44-8.6 64-17.3-15.1 22.2-34 41.9-55.7 57.6z"></path></svg>

</Link>
<Link href="https://www.instagram.com/nirmaanorg/?hl=en">
<svg className="w-7 h-7  stroke-current fill-current text-red-500 cursor-pointer" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"></path></svg>

</Link>
{/* <Link href="https://api.whatsapp.com/send?phone=916309987155">
<svg className="w-7 h-7  stroke-current fill-current text-green-500 cursor-pointer" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 122.8c-72.7 0-131.8 59.1-131.9 131.8 0 24.9 7 49.2 20.2 70.1l3.1 5-13.3 48.6 49.9-13.1 4.8 2.9c20.2 12 43.4 18.4 67.1 18.4h.1c72.6 0 133.3-59.1 133.3-131.8 0-35.2-15.2-68.3-40.1-93.2-25-25-58-38.7-93.2-38.7zm77.5 188.4c-3.3 9.3-19.1 17.7-26.7 18.8-12.6 1.9-22.4.9-47.5-9.9-39.7-17.2-65.7-57.2-67.7-59.8-2-2.6-16.2-21.5-16.2-41s10.2-29.1 13.9-33.1c3.6-4 7.9-5 10.6-5 2.6 0 5.3 0 7.6.1 2.4.1 5.7-.9 8.9 6.8 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9c-7.6 15.2-15.7 14.6-11.6 21.6 15.3 26.3 30.6 35.4 53.9 47.1 4 2 6.3 1.7 8.6-1 2.3-2.6 9.9-11.6 12.5-15.5 2.6-4 5.3-3.3 8.9-2 3.6 1.3 23.1 10.9 27.1 12.9s6.6 3 7.6 4.6c.9 1.9.9 9.9-2.4 19.1zM400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM223.9 413.2c-26.6 0-52.7-6.7-75.8-19.3L64 416l22.5-82.2c-13.9-24-21.2-51.3-21.2-79.3C65.4 167.1 136.5 96 223.9 96c42.4 0 82.2 16.5 112.2 46.5 29.9 30 47.9 69.8 47.9 112.2 0 87.4-72.7 158.5-160.1 158.5z"></path></svg>

</Link> */}
<Link href="https://www.linkedin.com/company/nirmaanorganization/">

<svg className="w-8 h-8  stroke-current fill-current text-blue-700 cursor-pointer" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path></svg>
</Link>


                        
                      {/* <SocialMediaIconsReact borderWidth="0" icon="twitter" iconColor="rgba(255,255,255,1)" iconSize="0" backgroundColor="rgba(26,166,233,1)"roundness="50%" url="https://twitter.com/Nirmaan_Org?lang=en" size="35"/>
                      <SocialMediaIconsReact borderWidth="0" icon="facebook" iconColor="rgba(255,255,255,1)" iconSize="0" backgroundColor="rgba(26,166,233,1)"roundness="50%" url="https://www.facebook.com/nirmaanorg" size="35" />
                      <SocialMediaIconsReact borderWidth="0" icon="instagram" iconColor="rgba(255,255,255,1)" iconSize="0" backgroundColor="rgba(26,166,233,1)"roundness="50%" url="https://www.instagram.com/nirmaanorg/?hl=en" size="35" />
                      <SocialMediaIconsReact borderWidth="0" icon="whatsapp" iconColor="rgba(255,255,255,1)" iconSize="0" backgroundColor="rgba(26,166,233,1)"roundness="50%" url="https://api.whatsapp.com/send?phone=916309987155" size="35" />
                      <SocialMediaIconsReact borderWidth="0" icon="linkedin" iconColor="rgba(255,255,255,1)" iconSize="0" backgroundColor="rgba(26,166,233,1)"roundness="50%" url="https://www.linkedin.com/company/nirmaanorganization/" size="35" /> */}
                    </div>
                  </div>
                </div>
          </section>
      </footer>
  );
}
