const cardAll = document.querySelectorAll('.card_inner');
const nameCounts = document.querySelector('.nameCounts');
const inputName = document.querySelector('.inputName');
const btnStart = document.querySelector('.btn');
const field = document.querySelector('.field');
const cardInner = document.querySelectorAll('.card_inner');
const count = document.querySelector('.count');
const bgwiner = document.querySelector('.bg-winer');
const btnClosed = document.querySelector('.btnClosed');
const textWiner = document.querySelector('.textWiner');
const numbup = document.querySelectorAll('.numbup');
const numbdown = document.querySelectorAll('.numbdown');


function generateRandomNumbers() {
    // Создаем массив из 5 случайных чисел, каждое число дублируется
    const numbers = [];
    for (let i = 0; i < 5; i++) {
        const num = Math.floor(Math.random() * 10); // от 0 до 9
        numbers.push(num, num);
    }

    // Перемешиваем массив Фишером-Йетсом
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Назначаем числа карточкам
    const backs = document.querySelectorAll('.back');
    backs.forEach((back, index) => {
        back.textContent = numbers[index];
    });
}

function startGame() {
    generateRandomNumbers();

    let firstClick = null;
    let secondClick = null;
    let lockBoard = false;

    cardInner.forEach(card => {
        card.addEventListener('click', () => {
            if (lockBoard) return;
            if (card.classList.contains('rotates')) return;

            const cardBack = card.querySelector('.back').textContent;

            card.classList.add('rotates');

            if (!firstClick) {
                firstClick = { element: card, value: cardBack };
            } else if (!secondClick && card !== firstClick.element) {
                secondClick = { element: card, value: cardBack };

                const number1 = Number(firstClick.value);
                const number2 = Number(secondClick.value);

                if (number1 === number2) {
                    count.textContent++;
                    firstClick = null;
                    secondClick = null;
                } else {
                    lockBoard = true;

                    setTimeout(() => {
                        if (firstClick && secondClick) {
                            firstClick.element.classList.remove('rotates');
                            secondClick.element.classList.remove('rotates');
                        }
                        firstClick = null;
                        secondClick = null;
                        lockBoard = false;
                    }, 1000);
                }
                
                const countNumber = Number(count.textContent);
                if(countNumber === 5) {
                    //setTimeout(() => {
                        bgwiner.classList.add('active');
                        textWiner.textContent = `${nameCounts.textContent} победил-а!`;
                    //}, 1000);
                    
                };

            }
        });
    });
}

startGame();

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnClosed')) {
        bgwiner.classList.remove('active');
        location.reload();
    };
});

btnStart.addEventListener('click', () => {
    const inputValue = inputName.value;
    if(inputName.value === 'Введите имя игрока!') {
        inputName.value = '';
        return;
    }
    if(inputValue === '') {
        inputName.value = 'Введите имя игрока!';
        return;
    }

    nameCounts.textContent = `${inputValue}:`;
    field.classList.add('active');
});
