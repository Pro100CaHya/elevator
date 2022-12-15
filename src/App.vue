<template>
    <div class="building">
        <shaft-list
            @stopLift="stopLift"
            :floors="floors"
            :lifts="lifts"
            :position="position"
        />
        <floor-list
            :floors="floors"
            :status="status"
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
            floors: 5,
            lifts: 1,
            position: 1,
            status: "Waiting",
            callStack: []
        }
    },

    methods: {
        callLift(floor, status) {
            this.position = floor;
            this.status = status;
        },

        stopLift(status) {
            this.status = status;
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