import { useEffect, useState } from 'react';
import './App.css';
import { getBackpack, getToolkit } from './utils/fetchData';
import Header from '@skyscanner-internal/global-components/header';
import { logError, logOperationalEvent, logWarn } from 'saddlebag-logger';
import { getHeaderStrings } from './utils/getHeaderStrings';
import BpkText from '@skyscanner/backpack-web/bpk-component-text';
import '@skyscanner/backpack-web/bpk-stylesheets';
import '@skyscanner/backpack-web/bpk-stylesheets/font';


type Toolkit = { id: string; name: string };
type Backpack = { id: string; name: string };

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
    <div className="app">
      <Header isProductionEnv={false} logger={{ logOperationalEvent, logError, logWarn }} strings={getHeaderStrings} />
      <div className="layout-container">

        <div className="toolkit-container">
          <div className='toolkit-header'>
            <BpkText tagName='p'>UX toolkit</BpkText>
          </div>

          <div className="toolkit-list-container">
            {toolkitlist.map(tool => (
              <div className="item" key={tool.id}>
                <BpkText key={tool.id}>{tool.name}</BpkText>
              </div>
            ))}
          </div>
        </div>

        <div className="backpack-container">
          <div className='backpack-header'>
            <BpkText tagName='p'>Backpack</BpkText>
          </div>

          <div className="backpack-list-container">
            {backpacklist.map(item => (
              <div className="item" key={item.id}>
                <BpkText key={item.id}>{item.name}</BpkText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
