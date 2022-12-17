<template>
    <div
        class="shaft-item"
        v-bind:style="{ height: 100 * floors + `px` }"
    >
        <lift
            @stopLift="stopLift"
            :callStack="callStack"
            :lift="lift"
        />
    </div>
</template>

<script>
import Lift from "@/components/Lift.vue";

export default {
    components: {
        Lift
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
        lift: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>
.shaft-item {
    background: transparent;
    border-left: 2px solid rgb(211, 211, 211);
    border-right: 2px solid rgb(211, 211, 211);
    display: inline-block;
    position: relative;
    margin-right: 20px;
    width: 80px;
}
</style>