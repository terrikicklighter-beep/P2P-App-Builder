import React, { useState } from 'react';
import axios from 'axios';

// Very small builder demo: palette -> drop to canvas. Components are simple text blocks bound to data.

type ComponentInstance = { id: string; type: 'text'|'list'|'button'; x:number; y:number; props:any };

export default function App(){
  const [components, setComponents] = useState<ComponentInstance[]>([]);
  const [dragType, setDragType] = useState<string | null>(null);
  const [sheetUrl, setSheetUrl] = useState('');
  const [rows, setRows] = useState<any[]>([]);

  async function loadSheet(){
    if(!sheetUrl) return alert('Paste published CSV URL from Google Sheets.');
    const resp = await axios.get('/api/sheets', { params: { csvUrl: encodeURIComponent(sheetUrl) } });
    setRows(resp.data.rows || []);
  }

  function onDrop(e:React.DragEvent){
    e.preventDefault();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    if(!dragType) return;
    setComponents(c => [...c, { id:Date.now().toString(), type: dragType as any, x, y, props: {} }]);
    setDragType(null);
  }

  return (
    <div className="app">
      <header>
        <h2>Mini Builder — MVP</h2>
        <div style={{display:'flex',gap:8}}>
          <input placeholder="Published CSV URL" value={sheetUrl} onChange={e=>setSheetUrl(e.target.value)} style={{width:400}} />
          <button onClick={loadSheet}>Load Sheet</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="palette">
          <div draggable onDragStart={()=>setDragType('text')} className="palette-item">Text</div>
          <div draggable onDragStart={()=>setDragType('list')} className="palette-item">List (bind rows)</div>
          <div draggable onDragStart={()=>setDragType('button')} className="palette-item">Button</div>
        </aside>

        <main className="canvas" onDragOver={e=>e.preventDefault()} onDrop={onDrop}>
          {components.map(c=>{
            if(c.type==='text') return <div key={c.id} style={{position:'absolute',left:c.x,top:c.y}} className="comp">Text</div>;
            if(c.type==='button') return <button key={c.id} style={{position:'absolute',left:c.x,top:c.y}}>Button</button>;
            if(c.type==='list') return <div key={c.id} style={{position:'absolute',left:c.x,top:c.y}} className="comp">
              {rows.length ? (<ul>{rows.slice(0,5).map((r,i)=><li key={i}>{JSON.stringify(r)}</li>)}</ul>) : <em>No data loaded</em>}
            </div>;
            return null;
          })}
        </main>
      </div>
    </div>
  );
}
