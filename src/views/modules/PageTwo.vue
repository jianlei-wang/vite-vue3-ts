<template>
  <h1>我是路由页面2222</h1>
  <button @click="handleClick">Home</button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const handleClick = () => router.push({ path: '/' })
</script>