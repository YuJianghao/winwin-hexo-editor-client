<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>
        更新于
      </q-item-label>
      <q-item-label class="row no-wrap">
        <m-input v-model="updated" :error="error" class="col"></m-input>
        <q-btn size="x-small" icon="date_range" :ripple="false" round>
          <q-menu>
            <div class="row">
              <q-date
                v-model="updated"
                mask="YYYY-M-D H:mm:ss"
                color="primary"
                class="no-shadow"
              />
              <q-time
                v-model="updated"
                mask="YYYY-M-D H:mm:ss"
                color="primary"
                class="no-shadow"
                format24h
              />
            </div>
          </q-menu>
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import MInput from "../MInput";
export default {
  name: "UpdatedEditor",
  props: ["post", "getObj", "localUpdate"],
  components: {
    MInput
  },
  data() {
    return {
      error: false
    };
  },
  computed: {
    updated: {
      get() {
        return this.post.updated;
      },
      set(v) {
        let obj = this.getObj();
        obj.updated = v;
        this.localUpdate(obj);
      }
    }
  },
  watch: {
    updated(v) {
      this.error = this.updated && isNaN(new Date(v).getTime());
    }
  }
};
</script>
