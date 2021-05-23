<template>
    <div class="cursor-pointer bg-gray-800 h-screen w-screen flex flex-col items-center justify-center" title="Click to start">
       <div class="m-auto text-center font-thin" @click="$router.push('desktop')">
        <img src="../assets/logo.svg" class="w-64 grayscale m-auto"/>
        <div class="text-gray-700 text-sm -mt-4w-64 text-right font-hairline">S T U D I O</div>
      </div> 
    </div>
</template>