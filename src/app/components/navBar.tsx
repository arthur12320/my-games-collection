import { useState } from 'react';

interface NavBarProps {
  onSearchChange: (e: any) => void;
  searchValue: string;
}

export default function NavBar(props: NavBarProps) {
  const [responsiveNavbar, setResponsiveNavbar] = useState(false);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            My Games Collection
          </a>
        </div>
        <div className="flex-none gap-2 ">
          <div className="form-control hidden md:flex">
            <input
              value={props.searchValue}
              onChange={props.onSearchChange}
              type="text"
              placeholder="Search"
              className="input input-bordered"
            />
          </div>
          {!responsiveNavbar && (
            <button
              onClick={() => setResponsiveNavbar(true)}
              className="btn btn-ghost btn-circle md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}
          {/* <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      {responsiveNavbar && (
        <div className="navbar bg-base-100">
          <input
            value={props.searchValue}
            onChange={props.onSearchChange}
            type="text"
            placeholder="Search"
            className="input input-bordered w-full"
          />
          <button
            onClick={() => {
              setResponsiveNavbar(false);
              props.onSearchChange({target:{value:''}});
            }}
            className="btn mx-2 btn-circle btn-outline"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
