# DemoQA_Playwright

Тестируемый ресурс [demoqa.com](https://demoqa.com). 

Тесты написаны на JavaScript с использованием фреймворка Playwright.

Протестированы вкладки:
    - Droppable
    - Draggable

Тесты запускаются  в 3 браузерах:
    - Chromium
    - Firefox
    - WebKit (Safari)

К проекту подключен Allure Reporter для  создания отчетов о прохождении тестов.

Запуск тестов: 

npm install

Установить браузеры Playwright

npx playwright install

Запуск всех тестов

npx playwright test

Запуск тестов с отчетом Allure

npx playwright test --reporter=line,allure-playwright

Генерация и открытие отчета Allure

allure generate allure-results -o allure-report --clean
allure open allure-report