<template>
    <div class="shaft-list">
        <shaft-item
            @stopLift="stopLift"
            :floors="floors"
            :position="position"
            :callStack="callStack"
            :status="status"
            v-for="lift in lifts"
            :key="lift"
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
        stopLift(status) {
            this.$emit("stopLift", status);
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
        lifts: {
            type: Number,
            required: true
        },
        position: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
}
</script>

<style>
.shaft-list {
    position: absolute;
}
</style>