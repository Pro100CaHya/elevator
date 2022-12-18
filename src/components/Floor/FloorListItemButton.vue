<template>
    <button
        aria-label="Call lift"
        class="floor-item__button button button_style_blue button_size_xxs"
        :class="callStack.includes(floor) ? `floor-item__button_active`: ``"
        @click="callLift"
    >
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clip-path="url(#clip0_1_2)">
                <path
                    d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z"
                    fill="#59B2CE"
                />
                <circle
                    cx="8.00001"
                    cy="8"
                    r="4.8"
                    fill="#59B2CE"
                />
            </g>
            <defs>
                <clipPath id="clip0_1_2">
                    <rect
                        width="16"
                        height="16"
                        fill="white"
                    />
                </clipPath>
            </defs>
        </svg>
    </button>
</template>

<script>
export default {
    name: "FloorListItemButton",

    props: {
        floor: {
            type: Number,
            required: true
        },
        callStack: {
            type: Array,
            required: true
        }
    },
    
    methods: {
        callLift() {
            this.$emit("callLift", this.floor, "Moving");
        }
    }
}
</script>

<style scoped>
.floor-item__button {
    cursor: pointer;
    margin-top: 5px;
    padding: 5px;
    font-size: 0;
    background-color: white;
    border: 2px solid #59B2CE;
}

.floor-item__button:hover {
    background-color: #f5f5f5;
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