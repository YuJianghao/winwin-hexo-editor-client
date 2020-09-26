<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-black shadow-2">
      <q-toolbar>
        <q-btn
          flat
          icon="arrow_back"
          aria-label="Menu"
          label="回到主页"
          @click="$router.push('/')"
        />

        <q-toolbar-title>
          Hexo Editor API Doc
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div id="swagger"></div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
export default {
  name: 'Swagger',
  mounted () {
    SwaggerUI({
      dom_id: '#swagger',
      url: this.$apis.info.apidocUrl
    })
  }
}
</script>
