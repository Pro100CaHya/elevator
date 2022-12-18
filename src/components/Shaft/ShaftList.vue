<template>
    <div class="shaft-list">
        <ShaftListItem
            @stopLift="stopLift"
            :floors="floors"
            :callStack="callStack"
            :lift="lift"
            :key="lift.id"
            v-for="lift in lifts"
        />
    </div>
</template>

<script>
import ShaftListItem from "./ShaftListItem.vue";

export default {
    name: "ShaftList",

    components: {
        ShaftListItem
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

<style scoped>
.shaft-list {
    position: absolute;
}
</style>