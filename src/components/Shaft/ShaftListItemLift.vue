<template>
    <div
        class="lift"
        @transitionend="stopLift"
        :style="{ bottom: lift.curFloor * 100 - 100 + `px` }"
        :class="lift.status === `Stopped` ? `lift_stopped` : ``"
    >
        <div
            class="lift__indicator"
            :class="lift.status === `Waiting` ? `lift__indicator_disabled` : ``"
        >
            <div :class="lift.duration === `down` ? `lift__direction-down` : ``">
                <span class="lift__indicator-arrow"></span>
            </div>
            <h2 class="lift__indicator-floor">
                {{lift.status === "Moving" ? lift.nextFloor : lift.curFloor}}
            </h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "ShaftListItemLift",

    props: {
        callStack: {
            type: Array,
            required: true
        },
        lift: {
            type: Object,
            required: true
        }
    },

    mounted() {
        this.setLiftStyle();
    },

    updated() {
        this.setLiftStyle();
    },

    methods: {
        setLiftStyle() {
            const liftElem = document.querySelectorAll(".lift")[this.lift.id];
        
            /*
                Если лифт находится в движении, нужно обновить его координаты
                и задать время перехода (transition'а)
            */
            setTimeout(() => {
                if (this.lift.status === "Moving") {
                    liftElem.style.transitionDuration = Math.abs(this.lift.curFloor - this.lift.nextFloor) + `s`;
                    liftElem.style.bottom = this.lift.nextFloor * 100 - 100 + `px`;
                };
            }, 0);
        },
        stopLift() {
            this.$emit("stopLift", "Stopped", this.lift);
        },
    }
}
</script>

<style scoped>
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