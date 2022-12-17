<template>
    <div class="building">
        <shaft-list
            @stopLift="stopLift"
            :callStack="callStack"
            :floors="floors"
            :numberOfLifts="numberOfLifts"
            :lifts="lifts"
        />
        <floor-list
            :floors="floors"
            :numberOfLifts="numberOfLifts"
            :callStack="callStack"
            :lifts="lifts"
            @callLift="callLift"
        />
    </div>
</template>

<script>
import FloorList from "@/components/Floor/FloorList.vue";
import ShaftList from "@/components/Shaft/ShaftList.vue";

export default {
    components: {
        FloorList,
        ShaftList
    },

    data() {
        return {
            floors: 7,
            numberOfLifts: 4,
            occupedLifts: 0,
            callStack: [],
            lifts: [],
        }
    },

    methods: {
        setDuration() {
            this.duration = this.callStack.length === 0
                ? null
                : this.callStack[0] > this.position
                    ? "up"
                    : "down";
        },

        callLift(floor, status) {
            const isLiftLocatedOnTheFloor = !!this.lifts.find((lift) => lift.curFloor === floor && lift.status !== "Moving");
            const isLiftMovingOnTheFloor = !!this.lifts.find((lift) => lift.nextFloor === floor);

            const isCallNeed = this.callStack.includes(floor) || isLiftLocatedOnTheFloor || isLiftMovingOnTheFloor;

            if (isCallNeed) {
                return;
            }

            this.callStack.push(floor);

            const calledLift = [...this.lifts].sort((a, b) => Math.abs(a.curFloor - floor) - Math.abs(b.curFloor - floor))
                                        .find((lift) => lift.status === "Waiting");

            if (calledLift === undefined) {
                return;
            }

            const calledLiftIndex = this.lifts.findIndex((lift) => lift.id === calledLift.id);
            this.lifts.splice(calledLiftIndex, 1, { ...calledLift, status, nextFloor: this.callStack[this.occupedLifts++] });
        },

        stopLift(status, id) {
            const stoppedLift = this.lifts.find((lift) => lift.id === id);
            const stoppedLiftIndex = this.lifts.findIndex((lift) => lift.id === id);
            const stoppedLiftNextFloor = stoppedLift.nextFloor;

            this.lifts.splice(stoppedLiftIndex, 1, { ...stoppedLift, status, curFloor: stoppedLiftNextFloor, nextFloor: null });
            this.occupedLifts--;
            this.callStack.splice(this.occupedLifts, 1);

            setTimeout(() => {
                if (this.callStack.length > this.occupedLifts) {
                    this.lifts.splice(stoppedLiftIndex, 1, { ...stoppedLift, curFloor: stoppedLiftNextFloor, nextFloor: this.callStack[this.occupedLifts++], status: "Moving" });
                }

                else {
                    this.lifts.splice(stoppedLiftIndex, 1, { ...stoppedLift,  curFloor: stoppedLiftNextFloor, nextFloor: null, status: "Waiting" });
                }
            }, 3000);
        },
    },

    mounted() {
        if (localStorage.length === 0) {
            for (let i = 0; i < this.numberOfLifts; i++) {
                this.lifts.push({
                    id: i,
                    curFloor: 1,
                    nextFloor: null,
                    status: "Waiting",
                    duration: null
                });
            }
        } else {
            const localStorageKeys = Object.keys(localStorage);

            for (let key of localStorageKeys) {
                this[key] = JSON.parse(localStorage.getItem(key));
            }

            const stoppedLifts = this.lifts.filter((lift) => lift.status === "Stopped");

            for (let i = 0; i < this.lifts.length; i++) {
                if (this.lifts[i].status === "Stopped") {
                    const nextFloor = this.lifts[i].curFloor;

                    const stoppedLift = {
                        ...this.lifts[i],
                        nextFloor
                    };

                    this.lifts.splice(i, 1, stoppedLift);
                    this.callStack.splice(this.occupedLifts++, 0, nextFloor);
                    this.stopLift("Stopped", this.lifts[i].id);
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

<style>
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
    font-size: 12px;
}

#app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

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

.shafts {
    position: absolute;
}

.shaft {
    width: 80px;
    background: transparent;
    border-left: 2px solid rgb(211, 211, 211);
    border-right: 2px solid rgb(211, 211, 211);
    position: relative;
    display: inline-block;
    margin-right: 20px;
}

.elevator {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 76px;
    background-color: rgb(165, 214, 255);
}
</style>