Битва героїв

Опис проекту

"Битва героїв" - це проста карткова гра, де герої з різними характеристиками змагаються один з одним. Гра реалізована мовою TypeScript та включає в себе функціонал створення героїв, розрахунку пошкоджень, пошуку героїв за властивостями, а також проведення боїв між героями.

Функціонал

Створення героїв:

Герої можуть бути трьох типів: Warrior, Mage, Archer.

Кожен тип має свої базові характеристики (здоров'я, атака, захист, швидкість).

Розрахунок пошкоджень:

Враховує тип атаки та захист супротивника.

Існує 20% шанс критичного удару (подвоєний урон).

Пошук героїв:

Генерична функція для пошуку героя за будь-якою властивістю.

Проведення бою:

Герої атакують один одного у раундах, поки один з них не загине.

Як запустити

Клонування репозиторію:

git clone https://github.com/your-username/battle-heroes-game.git
cd battle-heroes-game

Встановлення залежностей (якщо є):

npm install

Запуск файлу:

npx ts-node battle_heroes_game.ts

Результат:

Консоль покаже список героїв, результати пошуку та боїв між героями.

Структура проекту

battle_heroes_game.ts - основний файл із реалізацією гри.

Приклад коду

Створення героїв

const warrior = createHero("Дмитро", HeroType.Warrior);
const mage = createHero("Мерлін", HeroType.Mage);

Пошук героя за властивістю

const foundHero = findHeroByProperty(heroes, "type", HeroType.Mage);
console.log("Знайдений герой:", foundHero);

Проведення бою

const battleResult = battleRound(warrior, mage);
console.log("Результат бою:\n", battleResult);

Вимоги до середовища

Node.js

TypeScript

ts-node (для запуску TypeScript файлів напряму)

Розробник

Почапський Денис Пд-43