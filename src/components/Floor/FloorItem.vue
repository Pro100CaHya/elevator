<template>
    <div
        class="floor-item"
        v-bind:style="{ paddingLeft: 100 * lifts + `px` }"
    >
        <div class="floor-item__controller">
            <h2 class="floor-item__number">{{ floor }}</h2>
            <floor-button
                @callLift="callLift"
                :floor="floor"
                :status="status"
                :class="callStack.includes(floor) ? `floor-item__button_active` : ``"
            />
        </div>
    </div>
</template>

<script>
import FloorButton from "@/components/UI/FloorButton.vue";

export default {
    components: {
        FloorButton
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
        floor: {
            type: Number,
            required: true
        },
        lifts: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
.floor-item {
    height: 100px;
    width: 100%;
    border-top: 1.5px solid rgb(228, 228, 228);
    border-bottom: 1.5px solid rgb(228, 228, 228);
    background: transparent;
    padding-left: 210px;
    padding-top: 5px;
}

.floor-item__controller {
    width: fit-content;
    text-align: center;
}

.floor-item__number {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.3rem;
}

.floor-item__button {
    margin-top: 5px;
}

.floor-item__button_active {
    border: 2px solid orange;
}

.floor-item__button_active path {
    fill: orange;
}

.floor-item__button_active circle {
    fill: orange;
}
</style>