<template>
    <div class="shaft-list">
        <shaft-item
            @stopLift="stopLift"
            v-for="lift in lifts"
            :floors="floors"
            :lifts="lifts"
            :position="position"
        />
    </div>
</template>

<script>
import ShaftItem from "./ShaftItem.vue";

export default {
    components: {
        ShaftItem
    },

    methods: {
        stopLift(status) {
            this.$emit("stopLift", status);
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
        position: {
            type: Number,
            required: true
        }
    },
}
</script>

<style>
.shaft-list {
    position: absolute;
}
</style>