import { NameList } from "../../../Data/index.js";

// Simpan data di memori untuk contoh (hanya berlangsung sementara)
let dataStorage = NameList;

export function POST(request) {
  const shuffleArray = (array) => {
    // Pisahkan absen 13 dan 23
    const specialPair = [
      array.find((item) => item.absen === 21),
      array.find((item) => item.absen === 23),
    ];
    const otherStudents = array.filter(
      (item) => item.absen !== 21 && item.absen !== 23
    );

    // Shuffle siswa lain
    for (let i = otherStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherStudents[i], otherStudents[j]] = [
        otherStudents[j],
        otherStudents[i],
      ];
    }

    // Tentukan posisi pasangan spesial
    let pairIndex =
      Math.floor(Math.random() * Math.ceil(otherStudents.length / 2)) * 2; // Pastikan indeks ganjil-genap

    // Sisipkan absen 13 di posisi ganjil dan 23 di posisi genap
    otherStudents.splice(pairIndex, 0, specialPair[1]); // Absen 23 di posisi genap
    otherStudents.splice(pairIndex, 0, specialPair[0]); // Absen 13 di posisi ganjil

    return otherStudents;
  };

  dataStorage = shuffleArray([...NameList]);
  return Response.json({ message: "Data berhasil dirandom" });
}

export function GET(request) {
  return Response.json({ data: dataStorage });
}
