"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="z-50 flex transition rounded-xl ease-in-out duration-500 my-[6px] mx-[6px] bg-white flex-col border-2  border-Red h-[89px]">
      <div className=" flex p-4 justify-centers items-centers">
        <div className="pl-[25px]">
          <Link href="/">
            <img
              src="./img/XI-4.jpg"
              className=" w-[38x] h-[57px]"
              alt="Techinovators"
            />
          </Link>
        </div>
        <div className="mx-auto  w-[500px] items-center flex px-[150px]">
          <div>
            <div className="mx-auto border-2 border-Red rounded-2xl px-[6px] py-[4px] ">
              <a
                href={"#"}
                className=" mx py-1 border-transparent  text-black  font-bold text-base transition ease-in-out duration-500"
              >
                SESEPUH
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
