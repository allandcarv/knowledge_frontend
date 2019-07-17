<template>
  <div id="app">
    <Header />
    <Menu />
    <Content />
    <Footer />

  </div>
</template>

<script>
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";

export default {
  name: 'app',
  components: { Header, Menu, Content, Footer }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato&display=swap');

  * {
    font-family: "Lato", sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas:
      "header header"
      "menu content"
      "footer footer"
  }
</style>
