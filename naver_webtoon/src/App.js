import { BrandBar } from "./components/BrandBar.js";
import { NavigationBar } from "./components/NavigationBar.js";
import { ComponentHead } from "./components/ComponentHead.js";
import { Image } from "./components/Image.js";

function App() {
  return (
    <div>
      <BrandBar />
      <NavigationBar />
      <ComponentHead />
      <Image />
    </div>
  );
}

export default App;
