<template>
  <h1>我是路由页面1111</h1>
  <button @click="handleClick">Home</button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const handleClick = () => router.push({ path: '/' })
</script>