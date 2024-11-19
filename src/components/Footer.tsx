// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-Red mt-4 pt-[30px] h-[90px] px-6 ">
      <div className="flex border  border-Red rounded-2xl bg-white h-[30px] w-[150px] my-auto ">
        <p className="text-sm sm:text-base mx-auto text-black">
          © {new Date().getFullYear()} SESEPUH.
        </p>
      </div>
    </footer>
  );
}
