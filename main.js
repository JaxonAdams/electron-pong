// this file handles the main process for this electron app

// import modules
const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

// create app window
const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: false
	});

	window.loadFile(path.join(__dirname, './views/menu.html'));
	// if (process.env.NODE_ENV !== 'production') window.webContents.openDevTools(); 
};

// menu template
const menuTemplate = [
	{
		label: 'Options',
		submenu: [
			{ role: 'quit' }
		]
	}
];

// set up menu from template
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

// when app is ready, open window
app.whenReady().then(() => {
	createWindow();

	// open new window if no windows are open
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// if all windows are closed, quit app (windows, linux)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
