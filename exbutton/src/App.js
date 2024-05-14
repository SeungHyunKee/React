import { useState } from "react";
import { InputSection } from "./component/InputSection.js";
import { Table } from "./component/Table.js";

function App() {
  const [textArray, setTextArray] = useState([]);

  return (
    <div>
      <InputSection setTextArray={setTextArray} />
      <Table textArray={textArray} />
    </div>
  );
}

export default App;
