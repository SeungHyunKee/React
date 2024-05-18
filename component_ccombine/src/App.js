import Grid from "./components/Table.js";

function App() {
  const cols = ["Title1", "Title2"];
  const bodys = [
    ["A", "A1"],
    ["B", "B1"],
    ["C", "C1"],
  ];

  return (
    <div>
      <Grid cols={cols} bodys={bodys} />
    </div>
  );
}

export default App;
