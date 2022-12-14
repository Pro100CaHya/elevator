<template>
    <div class="floor-item" v-bind:style="{ paddingLeft: 100 * lifts + `px` }">
        <div class="floor-item__controller">
            <h2 class="floor-item__number">{{ floor }}</h2>
            <floor-button @call="call" :floor="floor"/>
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
        call(floor) {
            this.$emit("call", floor);
        }
    },

    props: {
        floor: {
            type: Number,
            required: true
        },
        lifts: {
            type: Number,
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

.floor-item__number {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.3rem;
}

.floor-item__controller {
    width: fit-content;
    text-align: center;
}

.floor-item__button {
    margin-top: 5px;
}
</style>