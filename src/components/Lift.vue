<template>
    <div
        @transitionend="stopLift"
        class="lift"
        v-bind:style="{ bottom: position * 100 - 100 + `px` }"
    >
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: Number,
            required: true
        }
    },

    methods: {
        stopLift() {
            console.log("Stopped")
            this.$emit("stopLift", "Waiting");
        }
    }
}
</script>

<style>
.lift {
    position: absolute;
    height: 100px;
    width: 76px;
    background-color: rgb(165, 214, 255);
    transition: bottom 2s;
}
</style>