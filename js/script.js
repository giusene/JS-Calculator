function advancedCalc(numbers) {
    const filterNumber = numbers.filter(number => typeof (number) === 'number');
    const filterSign = numbers.filter(sign => typeof (sign) === 'string');
    let totalAdvance;
    for (i = 0; i < filterSign.length; i++) {
        if (i === 0) {
            if (filterSign[i] === '+') totalAdvance = filterNumber[i] + filterNumber[i + 1]
            if (filterSign[i] === '-') totalAdvance = filterNumber[i] - filterNumber[i + 1]
            if (filterSign[i] === '*') totalAdvance = filterNumber[i] * filterNumber[i + 1]
            if (filterSign[i] === '/') totalAdvance = filterNumber[i] / filterNumber[i + 1]
            if (filterSign[i] === 'nx') totalAdvance = Math.pow(filterNumber[i], filterNumber[i + 1]);
        } else {
            if (filterSign[i] === '+') totalAdvance = totalAdvance + filterNumber[i + 1]
            if (filterSign[i] === '-') totalAdvance = totalAdvance - filterNumber[i + 1]
            if (filterSign[i] === '*') totalAdvance = totalAdvance * filterNumber[i + 1]
            if (filterSign[i] === '/') totalAdvance = totalAdvance / filterNumber[i + 1]
            if (filterSign[i] === 'nx') totalAdvance = Math.pow(totalAdvance, filterNumber[i + 1]);
        }
    }
    return totalAdvance;
}

function miniDisplayFunc(toMiniDisplay) {
    display.textContent = '0'
    miniDisplay.textContent = miniDisplay.textContent + toMiniDisplay;
}

const calculatorDiv = document.querySelector('.calculator');
const historyDiv = document.querySelector('#history-list');
const clearHistory = document.querySelector('.clear-history')
const historyBtn = document.querySelector('#history-btn');
const soundBtn = document.querySelector('#sound');
const calculatorBtn = document.querySelectorAll('a');
const display = document.querySelector('.display');
const miniDisplay = document.querySelector('.display_mini');
const soundFile = new Audio('js/bip.mp3');
let sound = true;
let calcArray = [];
let verify = false;
let timeStampStored = [];
let displayStored = [];
let miniDisplayStored = [];


function localStorageSave() {
    window.localStorage.setItem('timestamp', timeStampStored);
    window.localStorage.setItem('display', displayStored);
    window.localStorage.setItem('minidisplay', miniDisplayStored);
}

function localStorageLoad() {
    timeStampStored = window.localStorage.getItem('timestamp').split(',');
    displayStored = window.localStorage.getItem('display').split(',');
    miniDisplayStored = window.localStorage.getItem('minidisplay').split(',');
}

function historyGenerator() {
    historyDiv.innerHTML = '';
    for (index in timeStampStored) {
        let historyElement = document.createElement('div');
        historyElement.setAttribute('id', `history-${index}`);
        historyElement.classList.add('history-element');

        let historyTime = document.createElement('div');
        historyTime.classList.add('time');
        
        let time = new Date(parseInt(timeStampStored[index]));
        historyTime.textContent = time.toLocaleString("it-IT");

        let historyMini = document.createElement('div');
        historyMini.classList.add('display_mini');
        historyMini.textContent = miniDisplayStored[index];

        let historyTot = document.createElement('div');
        historyTot.classList.add('display');
        historyTot.textContent = displayStored[index];

        historyElement.appendChild(historyTime);
        historyElement.appendChild(historyMini);
        historyElement.appendChild(historyTot);

        historyDiv.appendChild(historyElement);

        historyTot.addEventListener('click', (event) => {
            display.textContent = event.target.textContent;
            calculatorDiv.classList.toggle('slide-down');
        })
    }
}

clearHistory.addEventListener('click', () => {
    timeStampStored = [];
    displayStored = [];
    miniDisplayStored = [];
    historyDiv.innerHTML = '';
    window.localStorage.clear();
})

historyBtn.addEventListener('click', () => {
    calculatorDiv.classList.toggle('slide-down');
    historyGenerator()
})

function playSuond() {
    if (sound) soundFile.play();
}

soundBtn.addEventListener('click', () => {
    sound ? sound = false : sound = true
    soundBtn.classList.toggle('no-sound');
})


if (window.localStorage.getItem('timestamp')) {
    localStorageLoad();
}

for (singleBtn of calculatorBtn) {
    singleBtn.addEventListener('click', (event) => {
        playSuond();
        if (event.target.id === 'rad') {
            if (display.textContent !== '0' && !verify) {
                let rad = Math.sqrt(parseFloat(display.textContent));
                miniDisplayFunc(display.textContent + ' √');
                display.textContent = rad;
                try {
                    if ((display.textContent).length > 10) {
                        throw `Il numero completo è: ${display.textContent}`;
                    }
                } catch (err) {
                    display.textContent = (display.textContent.substr(0, 10, 'E'));
                    console.warn('Attenzione: Risultato troppo lungo!\n', err)
                }
                timeStampStored.push(Date.now());
                displayStored.push(display.textContent);
                miniDisplayStored.push(miniDisplay.textContent);
                localStorageSave();
                verify = true;
            }
        }
        else if (event.target.id === 'nx') {
            if (display.textContent !== '0' && !verify) {
                calcArray.push(parseFloat(display.textContent));
                calcArray.push('nx');
                miniDisplayFunc(display.textContent + ' n ');
            }
        }
        else if (event.target.id === 'n2') {
            if (display.textContent !== '0' && !verify) {
                let pot = parseFloat(display.textContent) * parseFloat(display.textContent)
                miniDisplayFunc(display.textContent + ' n2');
                display.textContent = pot;
                try {
                    if ((display.textContent).length > 10) {
                        throw `Il numero completo è: ${display.textContent}`;
                    }
                } catch (err) {
                    display.textContent = (display.textContent.substr(0, 10, 'E'));
                    console.warn('Attenzione: Risultato troppo lungo!\n', err)
                }
                timeStampStored.push(Date.now());
                displayStored.push(display.textContent);
                miniDisplayStored.push(miniDisplay.textContent);
                localStorageSave();
                verify = true;
            }
        }
        else if (event.target.id === 'clear') {
            display.textContent = '0';
            miniDisplay.textContent = '';
            calcArray = [];
            verify = false;
        }
        else if (event.target.id === 'div') {
            if (display.textContent !== '0' && !verify) {
                calcArray.push(parseFloat(display.textContent));
                calcArray.push('/');
                miniDisplayFunc(display.textContent + ' / ');
            }
        }
        else if (event.target.id === 'mult') {
            if (display.textContent !== '0' && !verify) {
                calcArray.push(parseFloat(display.textContent));
                calcArray.push('*');
                miniDisplayFunc(display.textContent + ' x ');
            }
        }
        else if (event.target.id === 'sub') {
            if (display.textContent !== '0' && !verify) {
                calcArray.push(parseFloat(display.textContent));
                calcArray.push('-');
                miniDisplayFunc(display.textContent + ' - ');
            }
        }
        else if (event.target.id === 'sum') {
            if (display.textContent !== '0' && !verify) {
                calcArray.push(parseFloat(display.textContent));
                calcArray.push('+');
                miniDisplayFunc(display.textContent + ' + ');
            }
        }
        else if (event.target.id === 'tot' && !verify) {
            if (calcArray.length >= 2) {
                calcArray.push(parseFloat(display.textContent));
                miniDisplayFunc(display.textContent);
                display.textContent = advancedCalc(calcArray);
                try {
                    if ((display.textContent).length > 10) {
                        throw `Il numero completo è: ${display.textContent}`;
                    }
                } catch (err) {
                    display.textContent = (display.textContent.substr(0, 10, 'E'));
                    console.warn('Attenzione: Risultato troppo lungo!\n', err)
                }
                timeStampStored.push(Date.now());
                displayStored.push(display.textContent);
                miniDisplayStored.push(miniDisplay.textContent);
                localStorageSave();
                verify = true;

            }

        }
        else if (event.target.id === 'dot') display.textContent = display.textContent + '.'
        else if (!verify) {
            if (display.textContent === '0') {
                display.textContent = '';
                display.textContent = display.textContent + event.target.id
            } else {
                display.textContent = display.textContent + event.target.id
            }

        }

    })
}


