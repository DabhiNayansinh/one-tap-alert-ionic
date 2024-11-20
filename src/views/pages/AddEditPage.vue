<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ isEdit ? 'Edit Item' : 'Add Item' }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-input placeholder="Name" v-model="item.name" />
    <ion-textarea placeholder="Description" v-model="item.description" />
    <ion-button @click="saveItem">Save</ion-button>
  </ion-content>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '@/api';

const router = useRouter();
const route = useRoute();

const isEdit = !!route.params.id;
const item = ref({ name: '', description: '' });

const fetchItem = async () => {
  if (isEdit) {
    const { data } = await api.get(`/items/${route.params.id}`);
    item.value = data;
  }
};

const saveItem = async () => {
  if (isEdit) {
    await api.put(`/items/${route.params.id}`, item.value);
  } else {
    await api.post('/items', item.value);
  }
  router.push('/');
};

onMounted(fetchItem);
</script>
