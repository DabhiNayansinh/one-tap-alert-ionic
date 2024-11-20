<template>
    <ion-header>
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-button slot="end" @click="goToAdd">Add</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar v-model="searchQuery" @ionInput="fetchItems" />
      <ion-list>
        <ion-item v-for="item in items" :key="item.id">
          <ion-label>{{ item.name }}</ion-label>
          <ion-label>{{ item.description }}</ion-label>
          <ion-button slot="end" @click="goToEdit(item.id)">Edit</ion-button>
          <ion-button slot="end" color="danger" @click="deleteItem(item.id)">
            Delete
          </ion-button>
        </ion-item>
      </ion-list>
      <ion-button @click="fetchItems(page - 1)" :disabled="page <= 1">Prev</ion-button>
      <ion-button @click="fetchItems(page + 1)">Next</ion-button>
    </ion-content>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/api';
  import { 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
   } from '@ionic/vue';
  
  const router = useRouter();
  const items = ref([]);
  const searchQuery = ref('');
  const page = ref(1);
  
  const fetchItems = async (newPage = 1) => {
    page.value = newPage;
    const { data } = await api.get(`http://127.0.0.1:8000/api/items`, {
      params: { page: page.value, query: searchQuery.value },
    });
    items.value = data.data;
  };
  
  const deleteItem = async (id) => {
    await api.delete(`/items/${id}`);
    fetchItems();
  };
  
  const goToAdd = async () => await router.push('/add');
  const goToEdit = async (id) => await router.push(`/edit/${id}`);
  
  fetchItems();
  </script>
  