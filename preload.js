/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/
const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('FS3D', {
	getData: (source) => ipcRenderer.invoke('getData', source),
	setData: (options) => ipcRenderer.invoke('setData', options),
	showWarning: (options) => ipcRenderer.invoke('showWarning', options)
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
