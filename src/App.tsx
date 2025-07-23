import { useEffect, useState } from 'react';
import './App.css';
import { getBackpack, getToolkit } from './utils/fetchData';
import Header from '@skyscanner-internal/global-components/header';
import { logError, logOperationalEvent, logWarn } from 'saddlebag-logger';
import { getHeaderStrings } from './utils/getHeaderStrings';
import { BpkList, BpkListItem } from '@skyscanner/backpack-web/bpk-component-list';
import BpkText, { TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';


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
        <BpkText tagName='p'>Toolkit</BpkText>
        <BpkList>
          {toolkitlist.map(tool => (
            <BpkListItem key={tool.id}>{tool.name}</BpkListItem> 
          ))}
        </BpkList>
      </div>
      <div>
        <BpkText tagName='p'>Backpack</BpkText>
        <BpkList>
          {backpacklist.map(item => (
            <BpkListItem key={item.id}>{item.name}</BpkListItem> 
          ))}
        </BpkList>
      </div>
    </div>
  );
}

export default App;
