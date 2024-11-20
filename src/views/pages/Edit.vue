<template>
  <ion-content>
    <form @submit.prevent="updateRecord">
      <ion-item>
        <ion-label position="stacked">Name</ion-label>
        <ion-input v-model="record.name" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Description</ion-label>
        <ion-input v-model="record.description"></ion-input>
      </ion-item>
      <ion-button expand="full" type="submit">Update Record</ion-button>
    </form>
  </ion-content>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { 
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/vue';

// Define the interface for a record
interface Record {
  name: string;
  description?: string;
}

// Create a reactive reference for the record
const record = ref<Record>({
  name: '',
  description: ''
});

// Get route parameters
const route = useRoute();
const router = useRouter();

// Fetch record details when component is mounted
onMounted(async () => {
  const id = route.params.id; // Assuming the route has an id parameter
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/items/${id}`);
    record.value = response.data;
  } catch (error) {
    console.error('Error fetching record:', error);
    // Optionally handle error (e.g., show a notification)
  }
});

// Function to update a record
const updateRecord = async () => {
  const id = route.params.id; // Get the id from route parameters
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/items/${id}`, record.value);
    console.log('Record updated:', response.data);
    
    // Navigate back or reset form as needed
    await router.push('/dashboard'); // Redirect to home or records list after update
  } catch (error) {
    console.error('Error updating record:', error);
    // Optionally handle error (e.g., show a notification)
  }
};
</script>