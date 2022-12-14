<template>
    <div class="shaft-item" v-bind:style="{ height: 100 * floors + `px` }">
        <lift :position="position"/>
    </div>
</template>

<script>
import Lift from "@/components/Lift.vue";

export default {
    components: {
        Lift
    },

    props: {
        floors: {
            type: Number,
            required: true
        },
        position: {
            type: Number,
            required: true
        }
    }
}
</script>

<style>
.shaft-item {
    background: transparent;
    border-left: 2px solid rgb(211, 211, 211);
    border-right: 2px solid rgb(211, 211, 211);
    display: inline-block;
    position: relative;
    margin-right: 20px;
    width: 80px;
}
</style>