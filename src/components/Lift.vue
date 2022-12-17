<template>
    <div
        @transitionend="stopLift"
        class="lift"
        v-bind:style="{ bottom: position * 100 - 100 + `px` }"
        :class="status === `Stopped` ? `lift_stopped` : ``"
    >
        <div
            class="lift__indicator"
            :class="status === `Waiting` ? `lift__indicator_disabled` : ``"
        >
            <div :class="duration === `down` ? `lift__direction-down` : ``">
                <span class="lift__indicator-arrow"></span>
            </div>
            <h2 class="lift__indicator-floor">{{status === "Moving" ? callStack[0] : position}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        callStack: {
            type: Array,
            required: true
        },
        duration: {
            type: String
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

    updated() {
        const lift = document.querySelector(".lift");
        
        setTimeout(() => {
            if (this.status === "Moving") {
                lift.style.transitionDuration = Math.abs(this.position - this.callStack[0]) + `s`;
                lift.style.bottom = this.callStack[0] * 100 - 100 + `px`;
            }
        }, 0);
    },

    methods: {
        stopLift() {
            this.$emit("stopLift", "Stopped");
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

.lift__direction-down {
    transform: rotate(180deg);
}

.lift__indicator {
    width: 40px;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.712);
    border-radius: 5px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lift__indicator_disabled {
    display: none;
}

.lift__indicator-arrow {
    display: inline-block;
    width: 2px;
    height: 10px;
    background-color: white;
    position: relative;
}

.lift__indicator-arrow::before {
    content: "";
    display: inline-block;
    position: absolute;
    transform: rotate(40deg);
    width: 2px;
    height: 6px;
    background-color: white;
    left: -2px;
    top: 0px;
}

.lift__indicator-arrow::after {
    content: "";
    display: inline-block;
    position: absolute;
    transform: rotate(-40deg);
    width: 2px;
    height: 6px;
    background-color: white;
    left: 2px;
    top: 0px;
}

.lift__indicator-floor {
    margin-left: 10px;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.15rem;
    color: white;
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