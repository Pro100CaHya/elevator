<template>
    <div class="building">
        <ShaftList
            @stopLift="stopLift"
            :callStack="callStack"
            :floors="floors"
            :numberOfLifts="numberOfLifts"
            :lifts="lifts"
        />
        <FloorList
            @callLift="callLift"
            :floors="floors"
            :numberOfLifts="numberOfLifts"
            :callStack="callStack"
            :lifts="lifts"
        />
    </div>
</template>

<script>
import FloorList from "@/components/Floor/FloorList.vue";
import ShaftList from "@/components/Shaft/ShaftList.vue";
import { updateLifts } from "./helpers/updateLifts";

export default {
    components: {
        FloorList,
        ShaftList
    },

    data() {
        return {
            floors: 5,
            numberOfLifts: 1,
            occupedLifts: 0,
            callStack: [],
            lifts: [],
        }
    },

    methods: {
        callLift(floor, status) {
            /* 
                Ищем лифты, которые находятся (либо в состоянии покоя/ожидания вызова, либо в состоянии остановки)
            */
            const isLiftLocatedOnTheFloor = !!this.lifts.find((lift) => lift.curFloor === floor && lift.status !== "Moving");

            /*
                Смотрим, а нужно ли записывать этаж в стек вызовов. Это не нужно если:
                    1. Этаж уже есть в стеке
                    2.1. В случае, если в приложении лифтов больше 1-ого:
                        2.1.1. Есть лифт, который уже находится на этаже
                    2.2. В случае, если лифт 1-н:
                        2.2.1. Лифт находится на этаже и стек на данный момент пустой
            */
            const floorNotNeedToPushInStack = this.callStack.includes(floor)
                || ((isLiftLocatedOnTheFloor && this.numberOfLifts > 1)
                || (isLiftLocatedOnTheFloor && this.callStack.length === 0 && this.numberOfLifts === 1));

            
            if (floorNotNeedToPushInStack) {
                return;
            }

            this.callStack.push(floor);

            /*
                Ищем подходящий лифт:
                    1. Сначада сортируем лифты по расстоянию
                    от вызываемого этажа в поряжке возрастания
                    2. Затем находим лифты, которые не находятся
                    на вызываемом этаже
                    3. Ищем первый лифт в состоянии покоя
            */
            const calledLift = [...this.lifts].sort((a, b) => Math.abs(a.curFloor - floor) - Math.abs(b.curFloor - floor))
                                        .filter((lift) => lift.curFloor !== floor)
                                        .find((lift) => lift.status === "Waiting");

            /*
                Если такой лифт не найден, то завершаем работу
            */
            if (calledLift === undefined) {
                return;
            }


            /*
                Если такой лифт нашёлся, то обновляем массив лифтов,
                перезаписывая статус и след. этаж найденного лифта
            */
            this.lifts = updateLifts(
                this.lifts,
                calledLift.id,
                this.callStack.length,
                {
                    nextFloor: this.callStack[this.occupedLifts++],
                    status
                }
            );
        },

        stopLift(status, lift) {
            /*
                Находим этаж, который нужно удалить из стека вызовов
            */
            const deleteFloorId = this.callStack.findIndex((floor) => lift.nextFloor === floor);

            /*
                Обновляем массив лифтов, перезаписывая статус, текущий этаж
                и следующий этаж лифта, который остановился
            */
            this.lifts = updateLifts(
                this.lifts,
                lift.id,
                this.callStack.length,
                {
                    status,
                    curFloor: lift.nextFloor,
                    nextFloor: null
                }
            );

            /*
                Удаляем из стека вызовов этаж, на котором остановился лифт
                И уменьшаем количество занятых лифтов на 1
            */
            this.callStack.splice(deleteFloorId, 1);
            this.occupedLifts--;

            setTimeout(() => {
                /*
                    Если длина стека вызовов больше количества занятых лифтов,
                    то берём 1-ый освободившийся лифт и направляем его на первый
                    доступный этаж в стеке. Иначе переводим лифт в состояние покоя
                */
                if (this.callStack.length > this.occupedLifts) {
                    this.lifts = updateLifts(
                        this.lifts,
                        lift.id,
                        this.callStack.length,
                        {
                            status: "Moving",
                            nextFloor: this.callStack[this.occupedLifts++]
                        },
                    );
                } else {
                    this.lifts = updateLifts(
                        this.lifts,
                        lift.id,
                        this.callStack.length,
                        {
                            status: "Waiting",
                        },
                    );
                }
            }, 3000);
        },
    },

    mounted() {
        /*
            Если localStorage пустое, то инициализируем лифты
        */
        if (localStorage.length === 0) {
            for (let i = 0; i < this.numberOfLifts; i++) {
                this.lifts.push({
                    id: i,
                    curFloor: 1,
                    nextFloor: null,
                    status: "Waiting",
                    duration: null,
                });
            }
        } else {
            const localStorageKeys = Object.keys(localStorage);

            for (let key of localStorageKeys) {
                this[key] = JSON.parse(localStorage.getItem(key));
            }

            /*
                Пробегаемся по массиву лифтов, полученных
                из localStorage и ищем лифты со статусом остановки
            */
            for (let i = 0; i < this.lifts.length; i++) {
                if (this.lifts[i].status === "Stopped") {
                    /*
                        Обновляем массив лифтов, перезаписывая следующий этаж
                        лифта и добавляем значения следующего этажа в стек.
                        После вызываем метод "stopLift"
                    */
                    const nextFloor = this.lifts[i].curFloor;

                    this.lifts = updateLifts(
                        this.lifts,
                        this.lifts[i].id,
                        this.callStack.length,
                        {
                            nextFloor
                        }
                    );

                    this.callStack.splice(this.lifts.length - 1 - this.occupedLifts++, 0, nextFloor);
                    this.stopLift("Stopped", this.lifts[i]);
                }
            }
        }
    },

    watch: {
        lifts: {
            handler: function(newLifts) {
                localStorage.lifts = JSON.stringify(newLifts);
            },
            deep: true
        },
        occupedLifts(newOccupedLifts) {
            localStorage.occupedLifts = JSON.stringify(newOccupedLifts);
        },
        callStack: {
            handler: function(newCallStack) {
                localStorage.callStack = JSON.stringify(newCallStack);
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.building {
    border: 2px solid black;
    padding: 10px;
    display: flex;
    max-width: 1024px;
    max-height: 768px;
    width: 100%;
    background-color: rgb(253, 253, 253);
    position: relative;
}
</style>