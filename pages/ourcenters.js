import React from "react";
import Footer from "./template/footer";
import Header from "./template/header";
import { useState, useEffect } from "react";
import { PAGINATION_LIMIT } from "../config/constants";
import axios from "axios";
import { API_URL } from "../config/constants";
import { isUserLoggedIn } from "../utils/User";
import { useRouter } from "next/router";

const ourcenters = () => {
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState();
  const [pagination, setPagination] = useState({
    limit: PAGINATION_LIMIT,
    from: 0,
    to: PAGINATION_LIMIT,
  });
  const router = useRouter();

  useEffect(() => {
    axios
      .post(API_URL + "centers/get_centers.php", {
        //  limit: pagination.limit,
        // from: pagination.from,
        // to: pagination.to,
        // keyword: searchLocationKeyword,
        // state: filterstate,
      })
      .then(function (response) {
        console.log(response);
        setData(response.data?.centers);

        // return;
        if (response.data?.centers) {
          setTotalRecords(response.data?.total);
          // setAssets(response.data?.data);
        } else {
          // setAssets("");
        }
      });

    // if (isUserLoggedIn() === false) {
    //   router.push("/");
    // }
    // filtersLoad();
  }, [pagination]);

  return (
    <div className="w-full">
      <Header />

      <div className="min-h-screen bg-gray-100">
        <main className="py-10 m-6">
          <div className="mx-auto  sm:px-4 lg:px-0">
            <div className="mb-0 lg:mb-5 flex flex-col justify-center lg:flex-row lg:justify-between lg:space-x-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  Centers
                </h1>
              </div>
              <div className="max-w-3xl mx-auto mb-5 px-0 sm:px-0 md:flex md:items-center md:justify-between md:space-x-5 lg:mb-0 lg:max-w-7xl lg:px-0">
                <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-start sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 ">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow  border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y-8 divide-gray-200">
                      <thead className="bg-nirmaan-dark text-gray-50 ">
                        <tr>
                          <th
                            scope="col"
                            className="hidden md:table-cell px-6 py-3 text-left text-base font-medium text-nirmaan-lighter uppercase tracking-wider"
                          >
                            Donor Name and Location Of center
                          </th>

                          <th
                            scope="col"
                            className="hidden md:table-cell px-6 py-3 text-left text-base font-medium text-nirmaan-lighter uppercase tracking-wider"
                          >
                            Center Manager Detail
                          </th>
                          <th
                          className="bg-nirmaan-dark">

                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y-8 divide-gray-200">
                        {data ? (
                          data.map((person) => (
                            <tr key={person?.center_id}>
                              <td className="m-4 box-border py-4 md:hidden">
                                <div className="flex">
                                  <div className=" space-y-2 md:space-y-0 p-3">
                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Donor:
                                      </span>
                                      <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                        {person?.donor}
                                      </div>
                                    </div>
                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Address:
                                      </span>
                                      <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                        {person?.address}
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Center Manager:
                                      </span>

                                      <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                        {person?.center_manager}
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Designation:
                                      </span>
                                      <div className="text-sm  text-gray-900  ml-1 md:hidden ">
                                        {person?.designation}
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Contact Number:
                                      </span>
                                      <div className="text-sm  text-gray-900 md:hidden ml-1 ">
                                        <span>{person?.contact_number}</span>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <span class="text-sm  font-medium md:hidden">
                                        Mail Id:
                                      </span>
                                      <div className="text-sm  text-gray-900 md:hidden ml-1 ">
                                        <span>{person?.mail_id}</span>
                                      </div>
                                    </div>

                                    <div className="md:hidden ">
                                     
                                      
                                     
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="  px-6 py-4  hidden md:table-cell">
                                <div className="text-sm text-gray-900">
                                  {person?.donor}
                                </div>
                                <div className="text-sm text-gray-900 break-all">
                                  {person?.address}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                <div className="text-md text-gray-900">
                                  <span>{person?.center_manager}</span>
                                </div>
                                <div className="text-sm text-gray-900">
                                  <span>{person?.designation}</span>
                                </div>
                                <div className="text-sm text-gray-900">
                                  <span>{person?.contact_number}</span>
                                </div>
                                <div className="text-sm text-gray-900">
                                  <span>{person?.mail_id}</span>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                                
                              
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4 w-full">
                              No records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ourcenters;
