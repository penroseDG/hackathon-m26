<template>
    <div>
      <h1>Manager Category Page</h1>
      <h3> thầy long đẹp trai cho em 90đ</h3>
      <p v-if="showMessage">{{ message }}</p>
      <button @click="btn">Click me</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showMessage = ref(false); // Biến để kiểm tra trạng thái hiển thị thông điệp
  const message = "ok Thầy sẽ cho em hơn 90 điểm"; // Thông điệp sẽ được hiển thị
  
  const btn = () => {
    showMessage.value = true; // Khi nhấn nút, hiển thị thông điệp
    console.log("Đức Đấng Đại Đế ĐẸP Trai");
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    color: #555;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  