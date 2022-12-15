<template>
    <div
        @transitionend="stopLift"
        class="lift"
        v-bind:style="{ bottom: status === `Moving` ? callStack[0] * 100 - 100 + `px` : position * 100 - 100 + `px`, transitionDuration: Math.abs(position - callStack[0]) + `s`}"
        :class="status === `Stopped` ? `lift_stopped` : ``"
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
            this.$emit("stopLift", "Stopped");
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
    background-color: rgb(123, 196, 255);
    transition-property: bottom;
    transition-timing-function: linear;
}

.lift_stopped {
    animation: .5s infinite alternate flick;
}

@keyframes flick {
    25% {
        background-color: rgb(138, 202, 255);
    }
    50% {
        background-color: rgb(157, 211, 255);
    }
    75% {
        background-color: rgb(175, 219, 255);
    }
    100% {
        background-color: rgb(200, 230, 255);
    }
}
</style>