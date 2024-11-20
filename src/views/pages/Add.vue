
<template>
    <ion-page>
        <!-- Header Section -->
        <ion-header>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button>go dady</ion-back-button>
                    </ion-buttons>
                <ion-title>Add Record</ion-title>
              </ion-toolbar>
            </ion-header>

        <!-- Main Content -->
    <ion-content>
      <form @submit.prevent="submitForm">
        <ion-item>
          <ion-label position="floating">Name</ion-label>
          <ion-input v-model="name" required></ion-input>
          <!-- <input v-model="name" placeholder="Enter Name" required /> -->

        </ion-item>
        <ion-item>
          <ion-label position="floating">Description</ion-label>
          <ion-textarea v-model="description" name="name" required></ion-textarea>
        </ion-item>
        <ion-button expand="full" type="submit">Submit</ion-button>
      </form>
    </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import {
    IonButton,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonTextarea,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonPage,
    IonButtons,
    IonBackButton,
  } from "@ionic/vue";

  const name = ref();
  const description = ref();

  const route = useRoute();
const router = useRouter();

  const submitForm = async () => {
    console.log(name.value);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/items', {
        name: name.value,
        description: description.value,
      });

      console.log('success',response.data);
      await router.push('dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  </script>