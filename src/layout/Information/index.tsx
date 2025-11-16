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

  const fetchData = async () => {
    try {
      const response = await fetch("/api/random");
      const data = await response.json();
      const originalList: Siswa[] = Array.isArray(data?.data) ? data.data : [];

      // Jika tidak ada siswa, keluar cepat
      if (originalList.length === 0) {
        setSiswa([]);
        return;
      }

      // Pasangan yang harus selalu satu bangku (eks: 8-14 dan 1-13)
      const fixedPairs: number[][] = [
        [8, 14],
        [1, 13],
        [23, 5],
      ];

      // Map objek asli untuk absen eksklusif (jika tersedia)
      const exclusiveMap: Record<number, Siswa> = {};
      fixedPairs.flat().forEach((abs) => {
        const found = originalList.find((s) => s.absen === abs);
        if (found) exclusiveMap[abs] = found;
      });

      // Buat pool siswa tanpa absen eksklusif
      const pool: Siswa[] = originalList.filter(
        (s) => !fixedPairs.flat().includes(s.absen)
      );

      // Fisher-Yates shuffle
      const shuffle = <T,>(arr: T[]) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const shuffledPool = shuffle(pool);

      // Hitung jumlah bangku berdasarkan jumlah siswa asli
      // 1 bangku = 2 slot (kolom). totalBangku = ceil(totalSiswa / 2)
      const totalSiswa = originalList.length;
      const totalBenches = Math.ceil(totalSiswa / 2);

      // Siapkan array bangku (null berarti kosong)
      const benches: (Siswa[] | null)[] = Array.from(
        { length: totalBenches },
        () => null
      );

      // Pilih posisi bench acak untuk setiap fixed pair (distinct)
      const benchIndices = shuffle(
        Array.from({ length: totalBenches }, (_, i) => i)
      );
      const chosenIndices = benchIndices.slice(0, fixedPairs.length);

      // Tempatkan pasangan di bench terpilih dengan urutan acak (kiri/kanan)
      fixedPairs.forEach((pair, idx) => {
        const benchPos = chosenIndices[idx];
        const [a, b] = Math.random() < 0.5 ? pair : [pair[1], pair[0]]; // acak kiri/kanan
        const aObj: Siswa = exclusiveMap[a] ?? { absen: a };
        const bObj: Siswa = exclusiveMap[b] ?? { absen: b };
        benches[benchPos] = [aObj, bObj];
      });

      // Isi bench yang masih kosong dengan siswa dari shuffledPool
      let poolIdx = 0;
      for (let i = 0; i < benches.length; i++) {
        if (benches[i] === null) {
          const left = shuffledPool[poolIdx++] ?? undefined;
          const right = shuffledPool[poolIdx++] ?? undefined;
          // Jika hanya satu tersedia, push single; jika tidak ada, bench tetap kosong (jarang)
          if (left && right) benches[i] = [left, right];
          else if (left && !right) benches[i] = [left]; // bench berisi 1 siswa
          else benches[i] = []; // bench kosong (safety)
        }
      }

      // Flatten benches menjadi list linear sesuai UI (1 slot = 1 siswa)
      const finalList: Siswa[] = benches.flat().filter(Boolean) as Siswa[];

      // Jika karena alasan praktis jumlah finalList < originalList (shouldn't), pad dengan placeholders dari originalList yang belum digunakan
      if (finalList.length < originalList.length) {
        const usedAbsens = new Set(finalList.map((s) => s.absen));
        const missing = originalList.filter((s) => !usedAbsens.has(s.absen));
        finalList.push(...missing);
      }

      // Jika kebaliknya (lebih banyak) trim ke originalList.length
      const trimmed = finalList.slice(0, originalList.length);

      setSiswa(trimmed);
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
              Array.from({ length: siswa.length }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full h-full bg-white border border-gray-300 rounded shadow-md"
                >
                  <span className="text-sm font-medium text-gray-600">
                    Meja {Math.floor(index / 2) + 1}
                  </span>
                  <MdTableRestaurant size={40} />
                  <div className="space-x-1 flex">
                    <div className="flex flex-col items-center py-2">
                      <CgProfile size={20} />
                      <div className="text-sm text-center">
                        {siswa[index]?.absen ?? "—"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default MainPage;
