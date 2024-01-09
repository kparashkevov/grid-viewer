import { useEffect, useState } from 'react'
//import './App.css'
import GridView from './grid/GridView'

function App() {

  const [colData, setColDate] = useState<IGridLayout>({col0: {colName: '', entries: []}, col1: {colName: '', entries: []}, col2: {colName: '', entries: []}, col3: {colName: '', entries: []}, col4: {colName: '', entries: []}, col5: {colName: '', entries: []}, col6: {colName: '', entries: []}, col7: {colName: '', entries: []}, col8: {colName: '', entries: []}, col9: {colName: '', entries: []}})
  const [profiles, setProfiles] = useState<any>({})
  const [selectedProfile, setSelectedProfile] = useState<string>('None')

  useEffect(() => {
    window.ipcRenderer.on('main-process-message', (_event, message) => {
      const msg = JSON.parse(message)
      setColDate(msg.columns)
      setProfiles(msg.profiles)
    })
  }, []);
  

  return (
    <>
      <div style={{textAlign: "center", fontFamily: "Arial,Helvetica,sans-serif;"}}>
        <select value={selectedProfile} onChange={e => setSelectedProfile(e.currentTarget.value)}>
          <option value={'None'}></option>
          {Object.keys(profiles).map(k => {
              return <option value={k}>{k}</option>
          })}
        </select>
        <GridView colDatas={colData} profiles={profiles} activeProfile={selectedProfile} />
      </div>
    </>
  )
}

export default App
