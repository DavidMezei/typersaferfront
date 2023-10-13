import 'animate.css';

<script setup>
const { data, refresh } = await useFetch("https://api.chucknorris.io/jokes/random?category=dev");

const bool = ref(true);

const config = ref("top center");
const animationStarted = ref(false);
const buttonClass = ref("animate__animated animate__bounce");

setInterval(change, 15000);

function change() {
    refresh();
    bool.value = !bool.value;
    buttonClass.value = bool.value
        ? "animate__animated animate__fadeInUp"
        : "animate__animated animate__bounce";
}
</script>

<template>
    <div class="flex flex-col items-center">
        <div class="bg-blue-300 rounded-lg p-2 shadow-xl text-center m-5 opacity-100 ease-linear duration-700"
            :class="buttonClass">
            <p class="text-gray-800 w-auto h-auto md:w-auto md:h-auto max-w-md font-medium font-serif">
                {{ data.value }}
            </p>
        </div>
        <div id="some" class="mx-auto ml-1 mr-1 ">
           <img src="/img/chuck.png" />
    
        </div>
    </div>
</template>

<style scoped>
#some {
    width: 58%;
    height: 58%;
}

</style>
