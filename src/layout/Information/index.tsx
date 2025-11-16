"use client";

import { CgProfile } from "react-icons/cg";
import { MdTableRestaurant } from "react-icons/md";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

type Siswa = {
  absen: number;
  [key: string]: any;
};

function MainPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);

  // === FUNGSI FETCH DATA DENGAN RANDOMIZER YANG MEMPERTAHANKAN PASANGAN ===
  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      // Pastikan data.data adalah array
      let siswaList: Siswa[] = Array.isArray(data?.data) ? data.data : [];

      // --- Pasangan wajib berdampingan (gunakan nilai absen) ---
      const pairs: number[][] = [
        [8, 14], // Pasangan 1
        [1, 13], // Pasangan 2
      ];

      // Ambil objek siswa untuk absen eksklusif jika tersedia, lalu hapus dari list utama
      const exclusiveMap: Record<number, Siswa> = {};
      const allExclusive = pairs.flat();

      // Simpan objek asli untuk absen eksklusif (jika ada)
      siswaList.forEach((s) => {
        if (allExclusive.includes(s.absen)) {
          exclusiveMap[s.absen] = s;
        }
      });

      // Filter siswaList untuk menghapus semua absen eksklusif
      siswaList = siswaList.filter((s) => !allExclusive.includes(s.absen));

      // Shuffle helper (Fisher-Yates)
      const shuffle = <T,>(arr: T[]): T[] => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      // Acak siswa non-eksklusif
      siswaList = shuffle(siswaList);

      // Helper untuk mendapatkan objek siswa berdasarkan absen; jika tidak ada, buat placeholder sederhana
      const getSiswaObj = (absen: number): Siswa => {
        return exclusiveMap[absen] ?? { absen };
      };

      // Sisipkan pasangan ke posisi acak (agar selalu berdampingan)
      const insertPairRandom = (arr: Siswa[], [a, b]: number[]) => {
        const aObj = getSiswaObj(a);
        const bObj = getSiswaObj(b);
        const pos = Math.floor(Math.random() * (arr.length + 1));
        // Sisipkan a lalu b agar a berada di sebelah kiri b.
        arr.splice(pos, 0, aObj, bObj);
        return arr;
      };

      // Sisipkan semua pasangan
      pairs.forEach((p) => insertPairRandom(siswaList, p));

      setSiswa(siswaList);
    } catch (error) {
      console.error("fetchData error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar handleFetchData={fetchData} />
      <main className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mt-4">
        <div className="flex justify-center min-h-screen">
          <div className="grid grid-cols-8 gap-2 md:gap-5">
            {siswa.length === 0 ? (
              <div className="col-span-4 flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-gray-900"></div>
              </div>
            ) : (
              Array.from({ length: Math.ceil(siswa.length) }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-full h-full bg-white border border-gray-300 rounded shadow-md"
                  >
                    <span className="text-sm font-medium text-gray-600">
                      Meja {index + 1}
                    </span>
                    <MdTableRestaurant size={40} />
                    <div className="space-x-1 flex">
                      <div className="flex flex-col items-center py-2">
                        <CgProfile size={20} />
                        <div className="text-sm text-center">
                          {siswa[index]?.absen ?? "Name 1"}
                        </div>
                      </div>
                      <div className="h-full w-[1px]"></div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
