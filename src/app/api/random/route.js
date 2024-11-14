import { NameList } from "../../../Data/index.js";

// Simpan data di memori untuk contoh (hanya berlangsung sementara)
let dataStorage = NameList;

export function POST(request) {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  dataStorage = shuffleArray([...NameList]);
  return Response.json({ message: "Data berhasil dirandom" });
}

export function GET(request) {
  return Response.json({ data: dataStorage });
}
