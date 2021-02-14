<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>
        发布于
      </q-item-label>
      <q-item-label class="row no-wrap">
        <m-input v-model="date" :error="error" class="col"></m-input>
        <q-btn size="x-small" icon="date_range" :ripple="false" round>
          <q-menu>
            <div class="row">
              <q-date
                v-model="date"
                mask="YYYY-M-D H:mm:ss"
                color="primary"
                class="no-shadow"
              />
              <q-time
                v-model="date"
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
  name: "DateEditor",
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
    date: {
      get() {
        return this.post.date;
      },
      set(v) {
        let obj = this.getObj();
        obj.date = v;
        this.localUpdate(obj);
      }
    }
  },
  watch: {
    date(v) {
      this.error = this.date && isNaN(new Date(v).getTime());
    }
  }
};
</script>
