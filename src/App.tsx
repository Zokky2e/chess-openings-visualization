import { useEffect, useState } from 'react'
import './App.css'
import { ChessOpening } from './models/ChessOpening';

function App() {
  const [chessOpenings, setChessOpenings] = useState<ChessOpening[]>([]);
  const [query, setQuery] = useState<string>("");
   useEffect(() => {
    getJSON().then((result: ChessOpening[]) => {
      setChessOpenings(result.filter((f) => f.opening_name.includes(query)))
    });

  }, [query]);

  async function getJSON(){
    const response = await fetch("./assets/chess_openings.json");
    const jsonData = await response.json();
    return jsonData;
  }

  return (
    <>
      <div>Hello World</div>
    </>
  )
}

export default App
