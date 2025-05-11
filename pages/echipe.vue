<script setup>
// Nuxt specific imports
import { ref } from 'vue';

// State management
const echipe = ref([]);
const ok = ref("")
const puncteNull = ref(false);
const user = useSupabaseUser()

// Fetch data with Nuxt's built-in useFetch
const { data: teamsData } = await useFetch(() => `/api/proxy/mongo/teams/all` , {
  server: true,
  lazy: false,
  key: 'teams-fetch'
});
let favourite_team
if(user.value){
  const {data: ProfileData} = await useFetch(() => `/api/proxy/profile/${user.value.id}`, {server: true, lazy: false} )
  favourite_team = ProfileData.value[0].favTeam
}
// Process the fetched data
if (teamsData.value) {
  echipe.value = teamsData.value;

  // Check if any team has null points
  for (let i = 0; i < echipe.value.length; i++) {
    if (echipe.value[i].nrpuncte === null) {
      puncteNull.value = true;
      break;
    }
  }
  if (favourite_team != null) {
    let fav = favourite_team
    for (let i = 0; i < teamsData.value.length; i++) {
      if (teamsData.value[i].name === fav) {
        ok.value = i
      }
    }
  }

  // Set page metadata based on the data
  const year = new Date(echipe.value[0]?.createdAt).getFullYear();

  // Set head metadata
  useHead({
    title: `Echipe Formula 1 ${year}`,
    meta: [
      {
        name: "description",
        content: `Vezi echipele participante în Formula 1 sezonul ${year}, cu piloți și punctaje actualizate.`
      },
      {
        property: "og:title",
        content: `Echipe Formula 1 ${year}`
      },
      {
        property: "og:description",
        content: `Clasamentul echipelor actuale din sezonul ${year} de Formula 1.`
      }
    ]
  })
}

const preferinteUser = usePreferintePilot()

console.log(preferinteUser.preferinte)
</script>

<template>
  <div class="content-echipe" id="echipeCont">
    <div
        class="box"
        :class="[
        echipa.name.replace(/\s+/g, ''),
        { echipaFavorita: ok === index },
      ] "
        v-for="(echipa, index) in echipe"
        :key="index"
    >
      <div class="linie1">
        <div class="linie flex flex-row items-center gap-2" id="numar">
          <div class="">
            {{ echipa.pozitie }}
          </div>
          <div class="flex Favcontainer">
            <img src="/Favico.svg" class="w-6 h-6 pozaFav" alt="Icon echipă favorită" />
          </div>
        </div>
        <div class="numee">
          {{ echipa.name }}
        </div>
        <div class="points">
          <div class="points-number">
            {{ echipa.nrpuncte }}
          </div>
          <div class="inverted-pts" v-if="!puncteNull">PTS</div>
        </div>
      </div>
      <div class="linie2">
        <div class="numepilot">
          {{
            echipa.pilot_1
          }}
        </div>
        <div class="numepilot">
          {{
            echipa.pilot_2
          }}
        </div>
        <div class="pozae">
          <img :src="echipa.logo" class="poza1" :alt="`Logo ${echipa.name}`" />
        </div>
      </div>
      <div class="linie3">
        <img :src="echipa.masinaPoza" class="poza" :alt="`Mașina ${echipa.name}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/content-echipe.css";
</style>