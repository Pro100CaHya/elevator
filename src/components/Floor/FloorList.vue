<template>
    <div class="floor-list">
        <FloorListItem
            @callLift="callLift"
            :callStack="callStack"
            :floor="floor"
            :numberOfLifts="numberOfLifts"
            :lifts="lifts"
            :key="floor"
            v-for="floor in floors"
        />
    </div>
</template>

<script>
import FloorListItem from "./FloorListItem.vue";

export default {
    name: "FloorList",

    components: {
        FloorListItem
    },

    methods: {
        callLift(floor, status) {
            this.$emit("callLift", floor, status);
        }
    },
    
    props: {
        callStack: {
            type: Array,
            required: true
        },
        floors: {
            type: Number,
            required: true
        },
        numberOfLifts: {
            type: Number,
            required: true
        },
        lifts: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped>
.floor-list {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column-reverse;
}
</style>