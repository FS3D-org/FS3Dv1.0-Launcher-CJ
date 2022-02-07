/*--------------------------------------
		FS3D/Prepar3d Launcher
		----------------------

	Author: 	FS3D
	Version:	0.5
	Year:		2022

--------------------------------------*/

/* Expose functions and data to the display pages (scenario, controls, etc)
   Note that this is the "proper" way to do it per the docs, but very roundabout.
   You have to declare your function handling in js/ipc.js, reference it here, and work
   with the resulting data in your display page js. For more reference, read up
   on ipcRenderer and contextBridge in the docs.
*/
const {contextBridge, ipcRenderer} = require('electron');
contextBridge.exposeInMainWorld('FS3D', {
	setData: (options) => ipcRenderer.invoke('setData', options),
	showWarning: (options) => ipcRenderer.invoke('showWarning', options)
})

//Generic Electron additions, leave them alone.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
