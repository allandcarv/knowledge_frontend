<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="Cod3r - Base de Conhecimento" 
      :hideToggle="!user" 
      :hideUserDropdown="!user"
    />
    <Menu v-id="user" />
    <Content />
    <Footer />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

import { baseApiUrl, userKey } from '@/global'
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";
import Footer from "./components/template/Footer";

export default {
  name: 'app',
  components: { Header, Menu, Content, Footer },
  computed: mapState(['isMenuVisible', 'user']),
  data: function() {
    return {
      validatingToken: true
    }
  },
  methods: {
    async validateToken() {
      this.validateToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if (!userDate) {
        this.validateToken = false
        return this.$router.push({ name: 'auth' })
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if (res.data) {
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    }
  },
  created() {
    this.validateToken()
  }
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

  #app.hide-menu {
    grid-template-areas: 
      "header header"
      "content content"
      "footer footer"
  }
</style>
