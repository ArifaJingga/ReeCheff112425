<template>
  <div class="recipe-container">
    <header>
      <h1>{{ recipe.title }}</h1>
    </header>

    <main>
      <div class="recipe-content">
        <img :src="recipe.image" :alt="recipe.title" class="recipe-image">
        <section>
          <h2>Bahan-bahan</h2>
          <ul>
            <li v-for="(ingredient, index) in parsedIngredients" :key="index">{{ ingredient }}</li>
          </ul>
        </section>

        <section>
          <h2>Cara Membuat</h2>
          <ol>
            <li v-for="(step, index) in parsedSteps" :key="index">{{ step }}</li>
          </ol>
        </section>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  data() {
    return {
      recipe: {
        title: "",
        image: "",
        ingredients: "",
        steps: ""
      }
    };
  },
  computed: {
    parsedIngredients() {
      return this.recipe.ingredients.split(", ");
    },
    parsedSteps() {
      return this.recipe.steps.split(". ");
    }
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        // Assuming you have only one recipe document
        this.recipe = doc.data();
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }
};
</script>

<style>
.recipe-container {
  font-family: 'Helvetica Neue', sans-serif;
  background-color: #fff5e6; /* Light cream background color */
  padding: 20px;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow for depth effect */
  border-radius: 10px;
}

header {
  background-color: #ff6600;
  padding: 20px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 10px 10px 0 0;
}

header h1 {
  margin: 0;
  font-size: 2.5em;
}

.recipe-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe-image {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: 20px;
}

h2 {
  color: #cc5200;
  margin-bottom: 10px;
}

ul, ol {
  margin: 0 0 20px 20px;
  padding: 0;
}

ul li, ol li {
  margin-bottom: 10px;
  line-height: 1.5;
}

footer {
  background-color: #ff6600;
  padding: 10px;
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
  border-radius: 0 0 10px 10px;
}
</style>


