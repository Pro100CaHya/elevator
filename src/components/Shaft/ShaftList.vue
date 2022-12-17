<template>
    <div class="shaft-list">
        <shaft-item
            @stopLift="stopLift"
            :floors="floors"
            :callStack="callStack"
            v-for="lift in lifts"
            :lift="lift"
            :key="lift.id"
        />
    </div>
</template>

<script>
import ShaftItem from "./ShaftItem.vue";

export default {
    components: {
        ShaftItem
    },

    methods: {
        stopLift(status, lift) {
            this.$emit("stopLift", status, lift);
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
        },
    },
}
</script>

<style>
.shaft-list {
    position: absolute;
}
</style>