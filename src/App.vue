<template>
  <div >
    <header>
      <nav>
        <router-link to="/">Dashboard</router-link>
        <router-link to="/manager-category" active-class="active">Manager Category</router-link>
        <router-link to="/manager-product" active-class="active">Manager Product</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style scoped>

nav {
  display: flex;
  gap: 20px;
  background-color: #333;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
}

nav a.active {
  background-color: #555;
  border-radius: 5px;
}

</style>
