<template>
    <div class="floor-list">
        <floor-item @call="call" v-for="floor in floors" :floor="floor" :lifts="lifts"/>
    </div>
</template>

<script>
import FloorItem from "./FloorItem.vue";

export default {
    components: {
        FloorItem
    },

    methods: {
        call(floor) {
            this.$emit("call", floor);
        }
    },

    props: {
        floors: {
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
.floor-list {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column-reverse;
}
</style>