import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleCompany } from "../../Features/Company/CompanyApi";
import { getAllCompanyState } from "../../Features/Company/CompanySlice";

const CompanyView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleCompany } = useSelector(getAllCompanyState);
  console.log(singleCompany);
  useEffect(() => {
    dispatch(getSingleCompany(id));
  }, [dispatch, id]);
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container flex flex-col flex-wrap items-center p-5 mx-auto border-b md:flex-row">
          <nav className="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
            <a className="mr-5 text-cyan-600 hover:text-cyan-800 font-[700] cursor-pointer">
              Course
            </a>
            <a className="mr-5 text-cyan-600 hover:text-cyan-800 font-[700] cursor-pointer">
              Tutorials
            </a>
            <a className="mr-5 text-cyan-600 hover:text-cyan-800 font-[700] cursor-pointer">
              Third Link
            </a>
            <a className="mr-5 text-cyan-600 hover:text-cyan-800 font-[700] cursor-pointer">
              Fourth Link
            </a>
          </nav>
          <a className="flex items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0">
            <img
              className="w-100 h-[60px] rounded-md"
              src={singleCompany?.companyLogo}
              alt=""
            />
            <span className="ml-3 text-xl text-cyan-600">
              {singleCompany?.companyName}
            </span>
          </a>
          <Link
            to="/company"
            className="inline-flex ml-5 lg:w-2/5 lg:justify-end lg:ml-0"
          >
            <button className="inline-flex items-center px-3 py-1 mt-4 font-bold transition-all duration-500 ease-in-out bg-gray-100 border-0 rounded text-cyan-600 focus:outline-none hover:bg-cyan-800 md:mt-0 hover:text-white">
              Button
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 ml-1 hover:fill-white"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </div>
      </header>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              <div className="p-4 lg:w-1/3">
                <div className="relative h-full px-8 pt-16 pb-24 overflow-hidden text-center bg-gray-100 bg-opacity-75 rounded-lg">
                  <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                    CATEGORY
                  </h2>
                  <h1 className="mb-3 text-xl font-medium text-gray-900 title-font sm:text-2xl">
                    Raclette Blueberry Nextious Level
                  </h1>
                  <p className="mb-3 leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a className="inline-flex items-center text-blue-500">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full py-4 mt-2 leading-none text-center">
                    <span className="inline-flex items-center py-1 pr-3 mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="inline-flex items-center text-sm leading-none text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/3">
                <div className="relative h-full px-8 pt-16 pb-24 overflow-hidden text-center bg-gray-100 bg-opacity-75 rounded-lg">
                  <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                    CATEGORY
                  </h2>
                  <h1 className="mb-3 text-xl font-medium text-gray-900 title-font sm:text-2xl">
                    Ennui Snackwave Thundercats
                  </h1>
                  <p className="mb-3 leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a className="inline-flex items-center text-blue-500">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full py-4 mt-2 leading-none text-center">
                    <span className="inline-flex items-center py-1 pr-3 mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="inline-flex items-center text-sm leading-none text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/3">
                <div className="relative h-full px-8 pt-16 pb-24 overflow-hidden text-center bg-gray-100 bg-opacity-75 rounded-lg">
                  <h2 className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                    CATEGORY
                  </h2>
                  <h1 className="mb-3 text-xl font-medium text-gray-900 title-font sm:text-2xl">
                    Selvage Poke Waistcoat Godard
                  </h1>
                  <p className="mb-3 leading-relaxed">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a className="inline-flex items-center text-blue-500">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full py-4 mt-2 leading-none text-center">
                    <span className="inline-flex items-center py-1 pr-3 mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx={12} cy={12} r={3} />
                      </svg>
                      1.2K
                    </span>
                    <span className="inline-flex items-center text-sm leading-none text-gray-400">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompanyView;
