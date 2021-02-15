<template>
  <q-item>
    <q-item-section>
      <q-item-label caption>
        更新于
      </q-item-label>
      <q-item-label class="row no-wrap">
        <m-input
          v-model="updated"
          :error="error"
          class="col"
          mask="####-##-## ##:##:##"
          clearable
        ></m-input>
        <q-btn size="x-small" icon="date_range" :ripple="false" round>
          <q-menu>
            <div class="row">
              <q-date
                v-model="updated"
                :mask="format"
                color="primary"
                class="no-shadow"
              />
              <q-time
                v-model="updated"
                :mask="format"
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
import { DATE_FORMAT } from "src/utils/constants";
import MInput from "../UI/MInput";
export default {
  name: "UpdatedEditor",
  props: ["post", "getObj", "localUpdate"],
  components: {
    MInput
  },
  computed: {
    format() {
      return DATE_FORMAT;
    },
    error() {
      return !!this.updated && isNaN(new Date(this.updated).getTime());
    },
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
  }
};
</script>
