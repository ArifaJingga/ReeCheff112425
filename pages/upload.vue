<template>
  <div class="container">
    <h1>{{ isEdit ? 'Edit Resep' : 'Unggah Resep Baru' }}</h1>
    <form @submit.prevent="submitRecipe">
      <label for="judul">Judul:</label>
      <input type="text" id="judul" v-model="recipe.judul" required>

      <label for="deskripsi">Deskripsi:</label>
      <textarea id="deskripsi" v-model="recipe.deskripsi" required></textarea>

      <label for="image">Gambar:</label>
      <input type="file" id="image" @change="onFileChange" required>

      <label for="asal">Asal:</label>
      <input type="text" id="asal" v-model="recipe.asal" required>

      <label for="kategori">Kategori:</label>
      <input type="text" id="kategori" v-model="recipe.kategori" required>

      <button class="btn" type="submit">{{ isEdit ? 'Update Resep' : 'Unggah Resep' }}</button>
      <button class="btn" type="button" @click="resetForm">Batal</button>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Inisialisasi Firebase
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'API_KEY',
    authDomain: 'PROJECT_ID.firebaseapp.com',
    projectId: 'PROJECT_ID',
    storageBucket: 'PROJECT_ID.appspot.com',
    messagingSenderId: 'SENDER_ID',
    appId: 'APP_ID'
  });
}

const firestore = firebase.firestore();
const storage = firebase.storage();

export default {
  data() {
    return {
      isEdit: false,
      recipe: {
        judul: '',
        deskripsi: '',
        urlGambar: '',
        asal: '',
        kategori: ''
      },
      fileGambar: null
    };
  },
  methods: {
    onFileChange(event) {
      this.fileGambar = event.target.files[0];
    },
    async submitRecipe() {
      try {
        if (this.fileGambar) {
          // Upload gambar ke Firebase Storage
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`images/${this.fileGambar.name}`);
          await fileRef.put(this.fileGambar);

          // Dapatkan URL gambar
          this.recipe.urlGambar = await fileRef.getDownloadURL();
        }

        // Simpan resep ke Firestore
        const docRef = await firestore.collection('resep').add({
          Judul: this.recipe.judul,
          Deskripsi: this.recipe.deskripsi,
          "URL Gambar": this.recipe.urlGambar,
          Asal: this.recipe.asal,
          Kategori: this.recipe.kategori,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("Resep berhasil ditambahkan!", docRef.id);

        // Menampilkan pesan sukses
        alert("Resep berhasil diunggah!");

        // Redirect ke halaman utama
        this.$router.push('/');

      } catch (error) {
        console.error("Error adding recipe: ", error);
        // Menampilkan pesan error
        alert("Terjadi kesalahan saat mengunggah resep.");
      }
    },
    resetForm() {
      this.recipe = {
        judul: '',
        deskripsi: '',
        urlGambar: '',
        asal: '',
        kategori: ''
      };
      this.fileGambar = null;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input, textarea {
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #cc5200;
}
</style>
