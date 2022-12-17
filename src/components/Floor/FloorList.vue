<template>
    <div class="floor-list">
        <floor-item
            @callLift="callLift"
            :callStack="callStack"
            :floor="floor"
            :numberOfLifts="numberOfLifts"
            :lifts="lifts"
            v-for="floor in floors"
            :key="floor"
        />
    </div>
</template>

<script>
import FloorItem from "./FloorItem.vue";

export default {
    components: {
        FloorItem
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
    }
}
</script>

<style>
.floor-list {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column-reverse;
}
</style>