import React, {useEffect} from 'react';
import './global.scss';
import HomePage from "./pages/HomePage";

function App(): JSX.Element {

  useEffect(() => {
    getAssets();
  }, []);

  async function getAssets() {
    let assets;

    assets = await fetch('https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&owner=0x0000000000000000000000000000000000000000');
    assets = await assets.json();

    console.log(assets);
    return assets;
  }

  return (
    <div className="App">
      <HomePage/>
    </div>
  );
}

export default App;
