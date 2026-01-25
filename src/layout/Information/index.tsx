"use client";

import { CgProfile } from "react-icons/cg";
import { MdTableRestaurant } from "react-icons/md";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Siswa = {
  absen: number;
};

export default function MainPage() {
  const [siswa, setSiswa] = useState<Siswa[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/random");
      const json = await res.json();

      const original: Siswa[] = Array.isArray(json?.data) ? json.data : [];
      if (original.length === 0) {
        setSiswa([]);
        return;
      }

      const TOTAL = original.length;

      const get = (n: number): Siswa =>
        original.find((s) => s.absen === n) ?? { absen: n };

      const shuffle = <T,>(arr: T[]) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const seats: (Siswa | null)[] = Array(TOTAL).fill(null);

      /* ===== RULES ===== */
      const pair3136 = shuffle([get(31), get(36)]);
      const siswa23 = get(23);
      const dekat23 = shuffle([get(5), get(24), get(25)]);

      const used = new Set([31, 36, 23, 5, 24, 25]);
      const pool = shuffle(original.filter((s) => !used.has(s.absen)));

      /* ===== PLACE 31 & 36 ===== */
      const totalBangku = Math.floor(TOTAL / 2);
      const bench3136 = Math.floor(Math.random() * totalBangku) * 2;

      seats[bench3136] = pair3136[0];
      seats[bench3136 + 1] = pair3136[1];

      /* ===== PLACE 23 ===== */
      const neighborBenches = [bench3136 - 2, bench3136 + 2].filter(
        (i) => i >= 0 && i < TOTAL && seats[i] === null,
      );

      if (neighborBenches.length > 0) {
        const bench23 =
          neighborBenches[Math.floor(Math.random() * neighborBenches.length)];
        seats[bench23] = siswa23;

        let idx = 0;
        for (const offset of [-1, 1, -2, 2]) {
          const pos = bench23 + offset;
          if (pos >= 0 && pos < TOTAL && seats[pos] === null && dekat23[idx]) {
            seats[pos] = dekat23[idx++];
          }
        }
      }

      /* ===== SAFE FILL (ANTI UNDEFINED) ===== */
      let poolIdx = 0;
      for (let i = 0; i < TOTAL; i++) {
        if (seats[i] === null) {
          seats[i] = pool[poolIdx] ??
            original.find((s) => !seats.some((x) => x?.absen === s.absen)) ?? {
              absen: -1,
            }; // fallback DARURAT

          poolIdx++;
        }
      }

      /* ===== FINAL ===== */
      setSiswa(seats as Siswa[]);
    } catch (err) {
      console.error("fetchData error:", err);
      setSiswa([]);
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
              siswa.map((s, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full h-full bg-white border border-gray-300 rounded shadow-md"
                >
                  <span className="text-sm font-medium text-gray-600">
                    Meja {Math.floor(index / 2) + 1}
                  </span>
                  <MdTableRestaurant size={40} />
                  <div className="flex flex-col items-center py-2">
                    <CgProfile size={20} />
                    <div className="text-sm text-center">
                      {s.absen === -1 ? "—" : s.absen}
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
