# Elevator Simulator

Одностраничное приложение (SPA), эмулирующее работу лифтовой системы.

## Описание

Приложения состоит из 2-ух версий: базовой (с 5 этажами и 1 лифтом) и расширенной (с 7 этажами и 4 лифтами)

`main` - ветка базовой версии приложения (с 5 этажами и 1 лифтом)

`main_/extended_version` - расширенная версия приложения (с 7 этажами и 4 лифтами)

Количество этажей и лифтов можно задавать в корневом компоненте. Необходимо поменять числа [вот здесь](https://github.com/Pro100CaHya/elevator/blob/main_/extended_version/src/App.vue#L33-L34) на нужные.

P.S.: Перед сменой количества лифтов и этажей, в случае повторного запуска приложения, необходимо очищать localStorage

## Деплой

[Деплой базовой версии приложения](https://ele-vator.netlify.app/)

[Деплой расширенной версии приложения](https://main-extended-version--ele-vator.netlify.app/)

## Установка приложения

```
npm install
```

## Запуск приложения

```
npm run start
```
