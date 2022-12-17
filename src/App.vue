<template>
    <div class="building">
        <shaft-list
            @stopLift="stopLift"
            :callStack="callStack"
            :floors="floors"
            :lifts="lifts"
            :position="position"
            :status="status"
            :duration="duration"
        />
        <floor-list
            :floors="floors"
            :status="status"
            :lifts="lifts"
            :callStack="callStack"
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
            lifts: 1,
            position: 1,
            status: "Waiting",
            duration: null,
            callStack: []
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
            if (floor === this.position && this.callStack.length === 0) {
                return;
            }
            if (this.callStack.includes(floor)) {
                return;
            }

            this.callStack.push(floor);

            if (this.status === "Stopped") {
                return;
            }

            this.setDuration();
            this.status = status;
        },

        stopLift(status) {
            this.status = status;
            this.position = this.callStack.shift() || this.position;

            setTimeout(() => {
                this.setDuration();

                if (this.callStack.length !== 0) {
                    this.status = "Moving";
                }

                else {
                    this.status = "Waiting";
                }
            }, 3000);
        },
    },

    mounted() {
        const localStorageKeys = Object.keys(localStorage);

        for (let key of localStorageKeys) {
            this[key] = JSON.parse(localStorage.getItem(key));
        }

        if (this.status === "Stopped") {
            this.callStack.unshift(this.position);
            this.stopLift("Stopped");
        }
    },

    watch: {
        callStack: {
            handler: function(newCallStack) {
                localStorage.callStack = JSON.stringify(newCallStack);
            },
            deep: true
        },

        duration(newDuration) {
            localStorage.duration = JSON.stringify(newDuration);
        },

        position(newPosition) {
            localStorage.position = JSON.stringify(newPosition);
        },

        status(newStatus) {
            localStorage.status = JSON.stringify(newStatus);
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