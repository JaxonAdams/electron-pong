// this file handles the main process for this electron app

// import modules
const path = require('path');
const { app, BrowserWindow } = require('electron');

// create app window
const createWindow = () => {
	const window = new BrowserWindow({
		width: 800,
		height: 600
	});

	window.loadFile(path.join(__dirname, './views/index.html'));
};

// when app is ready, open window
app.whenReady().then(() => {
	createWindow();

	// open new window if no windows are open
	app.on('activate' () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// if all windows are closed, quit app (windows, linux)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
