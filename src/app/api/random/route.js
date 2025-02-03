import { NameList } from "../../../Data/index.js";

// Simpan data di memori untuk contoh (hanya berlangsung sementara)
let dataStorage = NameList;

const femaleAbsens = new Set([
  5, 6, 7, 8, 12, 13, 15, 16, 17, 20, 21, 24, 25, 26, 32, 35, 36, 38,
]);

export function POST(request) {
  const shuffleArray = (array) => {
    // Pisahkan absen khusus
    const special21 = array.find((item) => item.absen === 21);
    const special23 = array.find((item) => item.absen === 23);
    const special13 = array.find((item) => item.absen === 13);
    const special8 = array.find((item) => item.absen === 8);
    const special20 = array.find((item) => item.absen === 20);

    // Salin objek untuk menghindari referensi duplikat
    const special13B = { ...special13 };
    const special23B = { ...special23 };
    const special8B = { ...special8 };
    const special20B = { ...special20 };

    // Kumpulkan siswa cewek dan siswa lainnya
    const femaleStudents = array.filter(
      (item) => femaleAbsens.has(item.absen) && item.absen !== 21
    );
    const otherStudents = array.filter(
      (item) =>
        !femaleAbsens.has(item.absen) &&
        ![21, 23, 13, 8, 20].includes(item.absen)
    );

    // Shuffle siswa lainnya
    for (let i = otherStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherStudents[i], otherStudents[j]] = [
        otherStudents[j],
        otherStudents[i],
      ];
    }

    // Pilih pasangan cewek untuk absen 21
    const randomFemaleIndex = Math.floor(Math.random() * femaleStudents.length);
    const pairedFemale = femaleStudents.splice(randomFemaleIndex, 1)[0];

    // Gabungkan absen 21 dengan pasangan ceweknya
    const grouped21 = [special21, pairedFemale];

    // Tentukan posisi kelompok yang selalu bersebelahan
    let pairIndex =
      Math.floor(Math.random() * Math.ceil(otherStudents.length / 4)) * 4;
    otherStudents.splice(pairIndex, 0, special13);
    otherStudents.splice(pairIndex + 1, 0, special23);
    otherStudents.splice(pairIndex + 2, 0, special8);
    otherStudents.splice(pairIndex + 3, 0, special20);

    // Variasi posisi lain dari kelompok tersebut
    let pairIndexB =
      Math.floor(Math.random() * Math.ceil(otherStudents.length / 4)) * 4;
    otherStudents.splice(pairIndexB, 0, special13B);
    otherStudents.splice(pairIndexB + 1, 0, special23B);
    otherStudents.splice(pairIndexB + 2, 0, special8B);
    otherStudents.splice(pairIndexB + 3, 0, special20B);

    // Gabungkan semua kembali
    const finalList = [...grouped21, ...otherStudents, ...femaleStudents];
    return finalList;
  };

  dataStorage = shuffleArray([...NameList]);
  return Response.json({ message: "Data berhasil dirandom" });
}

export function GET(request) {
  return Response.json({ data: dataStorage });
}
