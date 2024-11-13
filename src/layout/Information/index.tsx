// import LoadingModal from "@/components/loadingModal";
import React, { useEffect } from "react";
// import { useMediaQuery } from "@/hooks";
// import { poppins } from "@/app/layout";

function MainPage() {
  //   const isMobile = useMediaQuery("(max-width: 768px)");
  // console.log(poppins);
  // useEffect(() => {
  //   console.log("isMobile", isMobile);
  // }, [isMobile]);

  return (
    <section className="flex min-h-[100vh] items-center justify-center">
      <div className="flex text-black mb-4 w-[175px] md:w-44 h-16 border-2 rounded-md border-red-500 p-2">
        <div className="flex items-center justify-center w-full">
          <p className="font-medium">MySQL</p>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
