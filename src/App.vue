<template>
    <div class="building">
        <div class="shaft" v-bind:style="{ height: 100 * floors + 'px' }">
            <div class="elevator"></div>
        </div>
        <div class="floors">
            <div class="floor" v-for="floor in floors">
                <div class="floor__controller">
                    <h2 class="floor__number">{{floors - floor + 1}}</h2>
                    <button class="floor__button button button_style_blue button_size_xxs">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_1_2)">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM1.6 8C1.6 11.5346 4.46538 14.4 8 14.4C11.5346 14.4 14.4 11.5346 14.4 8C14.4 4.46538 11.5346 1.6 8 1.6C4.46538 1.6 1.6 4.46538 1.6 8Z" fill="#59B2CE"/>
                                <circle cx="8.00001" cy="8" r="4.8" fill="#59B2CE"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_1_2">
                                    <rect width="16" height="16" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            floors: 5
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
}

html {
    height: 100%;
    font-size: 12px;
}

#app {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.building {
    border: 2px solid black;
    padding: 10px;
    display: flex;
    max-width: 1024px;
    max-height: 768px;
    min-height: 100%;
    width: 100%;
    background-color: rgb(253, 253, 253);
    position: relative;
}

.floors {
    flex: 1 1 auto;
}

.floor {
    height: 100px;
    width: 100%;
    border-top: 1.5px solid rgb(228, 228, 228);
    background: transparent;
    padding-left: 110px;
    padding-top: 5px;
}

.floor_last {
    border-bottom: 1.5px solid rgb(228, 228, 228);
}

.floor__number {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.3rem;
}

.floor__controller {
    width: fit-content;
    text-align: center;
}

.floor__button {
    margin-top: 5px;
}

.shaft {
    width: 80px;
    background: transparent;
    border-left: 2px solid rgb(211, 211, 211);
    border-right: 2px solid rgb(211, 211, 211);
    position: absolute;
    left: 20px;
}

.elevator {
    position: absolute;
    bottom: 0;
    height: 100px;
    width: 76px;
    background-color: rgb(165, 214, 255);
}

.button {
    cursor: pointer;
}

.button_style_blue {
    background: white;
    border: 1px solid #59B2CE;
}

.button_size_xxs {
    font-size: 0;
    padding: 5px;
}
</style>