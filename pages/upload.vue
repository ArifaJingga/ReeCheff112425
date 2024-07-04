<template>
  <div class="container">
    <h1>{{ isEdit ? 'Edit Resep' : 'Unggah Resep Baru' }}</h1>
    <form @submit.prevent="submitRecipe">
      <label for="judul">Judul:</label>
      <input type="text" id="judul" v-model="recipe.judul" required>

      <label for="deskripsi">Deskripsi:</label>
      <textarea id="deskripsi" v-model="recipe.deskripsi" required></textarea>

      <label for="urlGambar">URL Gambar:</label>
      <input type="text" id="urlGambar" v-model="recipe.urlGambar" required>

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
import { firestore } from '~/plugins/firebase.js';

export default {
  props: {
    initialRecipe: {
      type: Object,
      default: () => ({
        judul: '',
        deskripsi: '',
        urlGambar: '',
        asal: '',
        kategori: ''
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      recipe: { ...this.initialRecipe },
    };
  },
  methods: {
    async submitRecipe() {
      try {
        if (this.isEdit) {
          // Update resep di Firestore
          await firestore.collection('resep').doc(this.recipe.id).update({
            Judul: this.recipe.judul,
            Deskripsi: this.recipe.deskripsi,
            "URL Gambar": this.recipe.urlGambar,
            Asal: this.recipe.asal,
            Kategori: this.recipe.kategori,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log("Resep berhasil diperbarui!", this.recipe.id);
          alert("Resep berhasil diperbarui!");
        } else {
          // Tambahkan resep baru ke Firestore
          const docRef = await firestore.collection('resep').add({
            Judul: this.recipe.judul,
            Deskripsi: this.recipe.deskripsi,
            "URL Gambar": this.recipe.urlGambar,
            Asal: this.recipe.asal,
            Kategori: this.recipe.kategori,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log("Resep berhasil ditambahkan!", docRef.id);
          alert("Resep berhasil diunggah!");
        }
        this.$router.push('/');
      } catch (error) {
        console.error("Error adding/updating recipe: ", error);
        alert("Terjadi kesalahan saat mengunggah resep.");
      }
    },
    resetForm() {
      this.recipe = { judul: '', deskripsi: '', urlGambar: '', asal: '', kategori: '' };
      this.$emit("cancel");
    },
  },
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
