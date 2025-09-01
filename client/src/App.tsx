import { DinosaurGame } from "./components/DinosaurGame";
import "@fontsource/inter";

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <DinosaurGame width={800} height={400} />
    </div>
  );
}

export default App;
