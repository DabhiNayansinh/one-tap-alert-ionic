<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Items</ion-title>
        <ion-button slot="end" @click="goToAdd">Add</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content color="light">
      <ion-searchbar v-model="searchQuery" @ionInput="fetchItems" />
      <ion-list :inset="true">
        <ion-item v-for="item in items" :key="item.id">
          <ion-label>{{ item.name }}</ion-label>
          <ion-label>{{ item.description }}</ion-label>
          <ion-button shape="round" size="default" color="tertiary" @click="goToView(item.id)"><ion-icon  slot="icon-only" :icon="eyeOutline"></ion-icon></ion-button>
          <ion-button shape="round" size="default" slot="end" @click="goToEdit(item.id)"><ion-icon  slot="icon-only" :icon="settingsOutline"></ion-icon></ion-button>
          <ion-button shape="round" size="default" slot="end" color="danger" @click="deleteItem(item.id)"><ion-icon  slot="icon-only" :icon="trashOutline"></ion-icon></ion-button>
        </ion-item>
      </ion-list>
      <ion-button @click="fetchItems(page - 1)" :disabled="page <= 1">Prev</ion-button>
      <ion-button @click="fetchItems(page + 1)">Next</ion-button>
    </ion-content>
  </ion-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/api';
  import { eyeOutline, settingsOutline,trashOutline } from 'ionicons/icons';

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
    IonPage,
    IonIcon,
    IonListHeader
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
  const goToView = async (id) => await router.push(`/view/${id}`);
  
  fetchItems();
  </script>
  