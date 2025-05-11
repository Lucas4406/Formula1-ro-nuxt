<template>
  <div class="card">
    <img :src="profileInfo.profilePhoto" alt="Person" class="card__image" />
    <p class="card__name">{{ profileInfo.displayName }}</p>
    <p class="card__name">{{ profileInfo.email }}</p>
    <p class="card__name">roles: {{ profileInfo.role }}</p>
    <button class="btn draw-border" @click="deleteUser">Delete user</button>
    <button class="btn draw-border" @click="changeRole('user')">Make user</button>
    <button class="btn draw-border" @click="changeRole('admin')">Make admin</button>
  </div>
</template>

<script setup>
const props = defineProps({
  profileInfo: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()

const deleteUser = async () => {
  try {
    const confirmDelete = confirm('Ești sigur că vrei să ștergi acest utilizator?')
    if (!confirmDelete) return
    await $fetch(`${config.public.apiBaseUrl}/profile/delete/${props.profileInfo._id}`, {
      method: 'DELETE'
    })
    await $fetch(`/api/delete-user/${props.profileInfo.profileId}`)
    window.location.reload()
  } catch (err) {
    console.error('Delete error:', err)
  }
}

const changeRole = async (role) => {
  try {
    await $fetch(`${config.public.apiBaseUrl}/profile/${props.profileInfo._id}/role`, {
      method: 'PUT',
      body: { role }
    })
    window.location.href = "/admin"
  } catch (err) {
    console.error('Change role error:', err)
  }
}
</script>

<style scoped lang="scss">
.card {
  background-color: #222831;
  height: 37rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.7);
  color: white;
}

.card__name {
  margin-top: 15px;
  font-size: 1.5em;
}

.card__image {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  border: 5px solid #272133;
  margin-top: 20px;
  box-shadow: 0 10px 50px rgba(235, 25, 110, 1);
}

.draw-border {
  box-shadow: inset 0 0 0 4px #58cdd1;
  color: #58afd1;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}

.draw-border::before,
.draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0;
  height: 0;
  bottom: 0;
  right: 0;
}

.draw-border::before {
  border-bottom-width: 4px;
  border-left-width: 4px;
}

.draw-border::after {
  border-top-width: 4px;
  border-right-width: 4px;
}

.draw-border:hover {
  color: #ffe593;
}

.draw-border:hover::before,
.draw-border:hover::after {
  border-color: #eb196e;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}

.draw-border:hover::before {
  transition-delay: 0s, 0s, 0.25s;
}

.draw-border:hover::after {
  transition-delay: 0s, 0.25s, 0s;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 0.75em 2em;
  letter-spacing: 0.05rem;
  margin: 1em;
  width: 13rem;
}

.btn:focus {
  outline: 2px dotted #55d7dc;
}
</style>
