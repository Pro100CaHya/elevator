<template>
    <div
        @transitionend="stopLift"
        class="lift"
        v-bind:style="{ bottom: status === `Moving` ? callStack[0] * 100 - 100 + `px` : position * 100 - 100 + `px`, transitionDuration: Math.abs(position - callStack[0]) + `s`}"
    >
    </div>
</template>

<script>
export default {
    props: {
        callStack: {
            type: Array,
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

    methods: {
        stopLift() {
            console.log("Stopped")
            this.$emit("stopLift", "Waiting");
        }
    },

    style() {
        return {
            bottom: 0
        }
    }
}
</script>

<style>
.lift {
    position: absolute;
    height: 100px;
    width: 76px;
    background-color: rgb(165, 214, 255);
    transition-property: bottom;
    transition-timing-function: linear;
}
</style>