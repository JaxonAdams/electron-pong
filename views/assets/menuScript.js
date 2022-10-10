// get button
const startBtn = document.querySelector('#start-btn');

// open main game window
const openGameWindow = () => {
    window.open('./index.html', '_blank', 'width=800,height=600');
};

// start button event listener
startBtn.addEventListener('click', () => openGameWindow());