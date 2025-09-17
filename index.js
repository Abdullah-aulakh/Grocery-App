const box = document.querySelector('.box');
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');



let intervalId; // store interval reference

btn1.addEventListener('click', () => {
    // prevent multiple intervals stacking
    if (intervalId) return;

    intervalId = setInterval(() => {

        box.style.backgroundColor = randomColor();
    }, 500);
});

btn2.addEventListener('click', () => {
    clearInterval(intervalId);
    intervalId = null; // reset so it can start again later
});

function randomColor() {

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
    
}