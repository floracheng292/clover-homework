import { useEffect, useState } from 'react';
import './App.css';
import { getBackpack, getToolkit } from './utils/fetchData';
import Header from '@skyscanner-internal/global-components/header';
import { logError, logOperationalEvent, logWarn } from 'saddlebag-logger';
import { getHeaderStrings } from './utils/getHeaderStrings';

type Toolkit = {id: string; name:string};
type Backpack = {id: string; name:string};

function App() {
  const [toolkitlist, setToolkit] = useState<Toolkit[]>([]);
  const [backpacklist, setBackpack] = useState<Backpack[]>([]);

  useEffect(() => {
    getToolkit().then(data => setToolkit(data));
    (async () => {
      const backpackData = await getBackpack();
      setBackpack(backpackData);
    })();
  }, []);

  return (
    <div className="App">
      <Header isProductionEnv={false} logger={{logOperationalEvent, logError, logWarn}} strings={getHeaderStrings}/>
      <div>
        <h1>Toolkit</h1>
        <ul>
          {toolkitlist.map(tool => (
            <li key={tool.id}>{tool.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Backpack</h1>
        <ul>
          {backpacklist.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
