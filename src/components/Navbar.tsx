"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "../components/Modals";
import Toastify from "toastify-js";

function Navbar({ handleFetchData }: { handleFetchData: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [randomizeSuccess, setRandomizeSuccess] = useState(false);

  useEffect(() => {
    if (randomizeSuccess) {
      const handleRandom = async () => {
        console.log("test");

        const response = await fetch("/api/random", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
      };

      handleRandom();
      Toastify({
        text: "Successfully randomized",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      handleFetchData();

      setRandomizeSuccess(false);
    }
  }, [randomizeSuccess]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);

    console.log(code);

    if (code !== "test") {
      Toastify({
        text: "Code Invalid",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      return;
    }

    setRandomizeSuccess(true);
  };

  return (
    <nav className="z-50 flex transition rounded-xl ease-in-out duration-500 my-[6px] mx-[6px] bg-white flex-col border-2 border-Red h-[89px]">
      <div className="flex p-4 justify-centers items-centers">
        <div className="pl-[25px]">
          <Link href="/">
            <img
              src="./img/XI-4.jpg"
              className="w-[60px] h-[60px] sm:w-[57px] sm:h-[57px]"
              alt="Techinovators"
            />
          </Link>
        </div>
        <div className="mx-auto w-[250px] md:w-[500px] items-center flex px-[50px] md:px-[150px]">
          <button
            className="border-2 border-Red p-2 rounded-3xl font-bold"
            onClick={handleOpenModal}
          >
            Randomize
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        code={code}
        setCode={setCode}
      />
    </nav>
  );
}

export default Navbar;
