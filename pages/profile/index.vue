<script>
useHead({
    title: "Профили",
  	meta: [
    	{ name: "description", content: "Профили лекторов" },
  	]
})
</script>

<template>
    <div>
        <h1>Профили лекторов курса</h1>
        <ul class="ProfileList">
            <li><NuxtLink to="/profile/mgvts">Влад Целиков</NuxtLink></li>
            <li><NuxtLink to="/profile/kirat_0">Артемий Казаков</NuxtLink></li>
            <li><NuxtLink to="/profile/awakywaky">Александра Шипилова</NuxtLink></li>
            <li><NuxtLink to="/profile/ArtyomShvetsov">Артём Швецов</NuxtLink></li>
        </ul>
    </div>
</template>

<style>
.ProfileList {
    padding: 0;
}
.ProfileList > li {
    list-style: none;
    padding: 0.5rem 0;
}
</style>
