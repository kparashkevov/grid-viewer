import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { parse as csv } from "csv-parse/sync";
import fs from 'node:fs'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    let config: any = {}
    const data = fs.readFileSync('./baseConfig.json');
    config = JSON.parse(data.toString())

    const content = fs.readFileSync(config['csvFile'], "utf16le");
    const cnt = csv(content, { delimiter: "\t", bom: true })
    const headers = cnt[0]
    const rows: any[] = []
    for (let index = 1; index < cnt.length; index++) {
      const obj: any = {}
      obj.type = cnt[index][headers.indexOf('Type')]
      obj.id = Number(cnt[index][headers.indexOf('Id')])
      obj.summary = cnt[index][headers.indexOf('Summary')]
      obj.status = cnt[index][headers.indexOf('Status')]
      obj.ownedBy = cnt[index][headers.indexOf('Owned By')]
      obj.techOwner = cnt[index][headers.indexOf('Technical Owner')]
      obj.qaOwner = cnt[index][headers.indexOf('QA owner')]
      obj.qaConfirmed = parseBoolean(cnt[index][headers.indexOf('QA confirmed')])
      obj.baConfirmed = parseBoolean(cnt[index][headers.indexOf('BA confirmed')])
      obj.wsConfirmed = parseBoolean(cnt[index][headers.indexOf('WS confirmed')])
      rows.push({ color: determineColor(obj, config.colorMapping), rowData: obj })
    }
    const finalView = {
      columns: {
        col0: { colName: determineTitle(config.col0Name), entries: rows.filter(x=>filterRows(x, config.col0Name)) },
        col1: { colName: determineTitle(config.col1Name), entries: rows.filter(x=>filterRows(x, config.col1Name)) },
        col2: { colName: determineTitle(config.col2Name), entries: rows.filter(x=>filterRows(x, config.col2Name)) },
        col3: { colName: determineTitle(config.col3Name), entries: rows.filter(x=>filterRows(x, config.col3Name)) },
        col4: { colName: determineTitle(config.col4Name), entries: rows.filter(x=>filterRows(x, config.col4Name)) },
        col5: { colName: determineTitle(config.col5Name), entries: rows.filter(x=>filterRows(x, config.col5Name)) },
        col6: { colName: determineTitle(config.col6Name), entries: rows.filter(x=>filterRows(x, config.col6Name)) },
        col7: { colName: determineTitle(config.col7Name), entries: rows.filter(x=>filterRows(x, config.col7Name)) },
        col8: { colName: determineTitle(config.col8Name), entries: rows.filter(x=>filterRows(x, config.col8Name)) },
        col9: { colName: determineTitle(config.col9Name), entries: rows.filter(x=>filterRows(x, config.col9Name)) }
      },
      profiles: config.profiles
    }
    win?.webContents.send('main-process-message', JSON.stringify(finalView))
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
})

function determineColor(obj: any, colorMap: any): string {
  if (obj.type === 'Task' && typeof (colorMap[obj.ownedBy]) != 'undefined') {
    return colorMap[obj.ownedBy]
  }
  if (typeof (colorMap[obj.techOwner]) != 'undefined') {
    return colorMap[obj.techOwner]
  }

  return "255, 255, 255"
}

function determineTitle(value: any): string {
  if(Array.isArray(value)) {
    return value[0]
  }
  return value
}

function filterRows(obj: any, value: any): boolean {
  if(Array.isArray(value)) {
    return value.indexOf(obj.rowData.status) > -1
  }
  return value == obj.rowData.status
}

function parseBoolean(value: any): boolean {
  return value == 'true'
}