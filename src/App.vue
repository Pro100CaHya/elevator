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
            floors: 7,
            numberOfLifts: 4,
            occupedLifts: 0,
            callStack: [],
            lifts: [],
        }
    },

    methods: {
        callLift(floor, status) {
            const isLiftLocatedOnTheFloor = !!this.lifts.find((lift) => lift.curFloor === floor && lift.status !== "Moving");

            const floorNotNeedToPushInStack = this.callStack.includes(floor)
                || ((isLiftLocatedOnTheFloor && this.numberOfLifts > 1)
                || (isLiftLocatedOnTheFloor && this.callStack.length === 0 && this.numberOfLifts === 1));

            if (floorNotNeedToPushInStack) {
                return;
            }

            this.callStack.push(floor);

            const calledLift = [...this.lifts].sort((a, b) => Math.abs(a.curFloor - floor) - Math.abs(b.curFloor - floor))
                                        .filter((lift) => lift.curFloor !== floor)
                                        .find((lift) => lift.status === "Waiting");

            if (calledLift === undefined) {
                return;
            }

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
            const deleteFloorId = this.callStack.findIndex((floor) => lift.nextFloor === floor);

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

            this.callStack.splice(deleteFloorId, 1);
            this.occupedLifts--;

            setTimeout(() => {
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

            for (let i = 0; i < this.lifts.length; i++) {
                if (this.lifts[i].status === "Stopped") {
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