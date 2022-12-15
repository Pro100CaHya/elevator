<template>
    <div class="floor-list">
        <floor-item
            @callLift="callLift"
            :floor="floor"
            :lifts="lifts"
            :status="status"
            v-for="floor in floors"
        />
    </div>
</template>

<script>
import FloorItem from "./FloorItem.vue";

export default {
    components: {
        FloorItem
    },

    methods: {
        callLift(floor, status) {
            this.$emit("callLift", floor, status);
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
        },
        status: {
            type: String,
            reqiured: true
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