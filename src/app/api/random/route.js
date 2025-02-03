import { NameList } from "../../../Data/index.js";

// Simpan data di memori untuk contoh (hanya berlangsung sementara)
let dataStorage = NameList;

export function POST(request) {
  const shuffleArray = (array) => {
    // Pisahkan absen khusus
    const special21 = array.find((item) => item.absen === 21);
    const specialStudents = array.filter((item) =>
      [13, 23, 8, 20].includes(item.absen)
    );

    // Kumpulkan siswa lainnya
    const otherStudents = array.filter(
      (item) => ![21, 13, 23, 8, 20].includes(item.absen)
    );

    // Shuffle siswa lainnya
    for (let i = otherStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherStudents[i], otherStudents[j]] = [
        otherStudents[j],
        otherStudents[i],
      ];
    }

    // Shuffle posisi absen khusus agar acak tetapi tetap berdekatan
    for (let i = specialStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [specialStudents[i], specialStudents[j]] = [
        specialStudents[j],
        specialStudents[i],
      ];
    }

    // Tentukan posisi kelompok yang selalu bersebelahan
    let pairIndex = Math.floor(Math.random() * (otherStudents.length / 2)) * 2;
    otherStudents.splice(pairIndex, 0, ...specialStudents);

    // Gabungkan semua kembali
    const finalList = [special21, ...otherStudents];
    return finalList;
  };

  dataStorage = shuffleArray([...NameList]);
  return Response.json({ message: "Data berhasil dirandom" });
}

export function GET(request) {
  return Response.json({ data: dataStorage });
}

// AdMinSUanGar#72
