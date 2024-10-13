document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Переменные для игры
let gameActive = false;
let isJumping = false; // Чтобы предотвратить повторные прыжки
let score = 0; // Переменная для хранения очков
let startTime; // Время начала игры
let scoreInterval; // Для хранения интервала очков

// Функция для начала игры
function startGame() {
  gameActive = true;
  score = 0; // Сбрасываем очки
  startTime = Date.now(); // Запоминаем время начала игры
  document.getElementById('score').innerText = `Очки: ${score}`; // Обновляем отображение очков
  document.getElementById('cactus').style.animation = 'moveCactus 2s infinite linear'; // Запускаем анимацию кактуса
  checkCollision(); // Начинаем проверку на столкновение
  startScore(); // Начинаем увеличивать очки
  document.getElementById('startBtn').style.display = 'none'; // Скрываем кнопку "Начать игру" во время игры
}

// Функция для увеличения очков
function startScore() {
  scoreInterval = setInterval(() => {
      if (gameActive) {
          // Вычисляем время, прошедшее с начала игры
          const elapsedTime = Math.floor((Date.now() - startTime) / 100); // Время в секундах
          score = elapsedTime; // Устанавливаем счёт в зависимости от времени
          document.getElementById('score').innerText = `Очки: ${score}`; // Обновляем отображение очков
      } else {
          clearInterval(scoreInterval); // Останавливаем интервал, если игра завершена
      }
  }, 100); // Проверяем каждые 100 мс
}

// Функция для перезапуска игры
function restartGame() {
    gameActive = false;
    clearInterval(scoreInterval);
    document.getElementById('cactus').style.animation = 'none'; // Останавливаем анимацию
    document.getElementById('cactus').style.left = '580px'; // Сбрасываем позицию кактуса
    resetDino(); // Сбрасываем динозавра
    document.getElementById('startBtn').style.display = 'inline'; // Показываем кнопку "Начать игру" после проигрыша
}

// Функция для сброса состояния динозавра
function resetDino() {
    const dino = document.getElementById('dino');
    dino.classList.remove('jump'); // Удаляем класс прыжка
}

// Функция для проверки столкновения
function checkCollision() {
    const cactus = document.getElementById('cactus');
    const dino = document.getElementById('dino');

    const cactusRect = cactus.getBoundingClientRect();
    const dinoRect = dino.getBoundingClientRect();

    // Проверяем, есть ли пересечение между динозавриком и кактусом
    if (
        cactusRect.left < dinoRect.right &&
        cactusRect.right > dinoRect.left &&
        cactusRect.top < dinoRect.bottom &&
        cactusRect.bottom > dinoRect.top
    ) {
        gameActive = false; // Останавливаем игру
        cactus.style.animation = 'none'; // Останавливаем анимацию кактуса
        //alert("Игра окончена! Нажмите 'Начать игру' для новой игры.");
        restartGame(); // Показываем кнопку "Начать игру" после проигрыша
    } else if (gameActive) {
        // Проверка на столкновение будет выполняться каждый 100 мс, если игра активна
        setTimeout(checkCollision, 100);
    }
}

// Обработчики событий
document.getElementById('startBtn').addEventListener('click', startGame);

// Функция для прыжка динозаврика
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && gameActive && !isJumping) {
        jump();
    }
});

// Функция прыжка
function jump() {
    const dino = document.getElementById('dino');
    isJumping = true; // Устанавливаем флаг, что динозаврик прыгнул
    dino.classList.add('jump');

    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false; // Сбрасываем флаг после прыжка
    }, 500); // Длительность прыжка
}

// Скрываем кнопку "Начать игру" при старте
window.onload = function() {
    document.getElementById('startBtn').style.display = 'inline'; // Кнопка "Начать игру" видна при старте
    document.getElementById('cactus').style.animation = 'none'; // Останавливаем анимацию кактуса при старте
}
 