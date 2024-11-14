"use client";

import { CgProfile } from "react-icons/cg";
import { MdTableRestaurant } from "react-icons/md";
import { useState, useEffect } from "react";

function MainPage() {
  const [siswa, setSiswa] = useState<any[]>([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      setSiswa(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="grid grid-cols-4 gap-2 md:gap-5">
        {
          // Show loading if data is not fetched yet
          siswa.length === 0 ? (
            <div className="col-span-4 flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
            </div>
          ) : (
            Array.from({
              length: Math.ceil(siswa.length / 2),
            }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-full h-full bg-white border border-gray-300 rounded shadow-md"
              >
                <span className="text-sm font-medium text-gray-600">
                  Meja {index + 1}
                </span>
                <MdTableRestaurant size={40} />
                <div className="space-x-1 flex">
                  <div className="flex flex-col items-center border-2 py-2">
                    <CgProfile size={20} />
                    <div className="text-sm text-center">
                      {siswa[index * 2]?.title || "Name 1"}
                    </div>
                  </div>
                  {index * 2 + 1 < siswa.length && (
                    <div className="flex flex-col items-center border-2 py-2">
                      <CgProfile size={20} />
                      <div className="text-sm text-center">
                        {siswa[index * 2 + 1]?.title || "Name 2"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default MainPage;
