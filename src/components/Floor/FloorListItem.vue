<template>
    <div
        class="floor-item"
        v-bind:style="{ paddingLeft: 100 * numberOfLifts + `px` }"
    >
        <div class="floor-item__controller">
            <h2 class="floor-item__number">{{ floor }}</h2>
            <FloorListItemButton
                @callLift="callLift"
                :floor="floor"
                :callStack="callStack"
            />
        </div>
    </div>
</template>

<script>
import FloorListItemButton from "@/components/Floor/FloorListItemButton.vue";

export default {
    name: "FloorListItem",

    components: {
        FloorListItemButton
    },

    data() {
        return {
            isCalled: this.callStack.includes(this.floor)
        }
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
        numberOfLifts: {
            type: Number,
            required: true
        },
        lifts: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped>
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
</style>