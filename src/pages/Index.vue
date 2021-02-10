<template>
  <q-page class="row overflow-hidden" :style-fn="styleFn">
    <q-splitter
      v-model="nav"
      unit="px"
      separator-style="background:#282828"
      class="split fit"
      :limits="[180, Infinity]"
    >
      <template v-slot:before>
        <nav-part></nav-part>
      </template>
      <template v-slot:after>
        <q-splitter
          v-model="list"
          unit="px"
          separator-style="background:#323232"
          class="fit"
          :limits="[250, Infinity]"
        >
          <template v-slot:before
            ><div class="list-part fit column">
              <q-toolbar class="text-white">
                <div style="border-radius:32px" class="bg-grey-9 col">
                  <q-input
                    dense
                    rounded
                    borderless
                    dark
                    class="q-mx-sm"
                    style="height:30px"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" size="medium" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        name="close"
                        size="medium"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input>
                </div>
                <q-btn
                  color="primary"
                  icon="add"
                  round
                  size="x-small"
                  class="q-ml-sm"
                />
              </q-toolbar>
              <div
                class="text-grey-5 row"
                style="padding:8px 20px;font-size:smaller"
              >
                <div style="display:inline-block;" class="drop-handler">
                  最新文章
                  <q-icon name="keyboard_arrow_down" />
                  <q-menu
                    anchor="top middle"
                    self="top middle"
                    transition-hide="fade"
                    transition-show="fade"
                    content-class="shadow-2"
                    content-style="border:1px solid #555;border-radius:2px"
                  >
                    <q-list
                      dense
                      class="bg-grey-9 text-grey-3"
                      style="font-size:smaller"
                    >
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label class="text-grey-3">
                            最新文章
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label class="text-grey-3">
                            最旧文章
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label class="text-grey-3">
                            按名称 A-Z
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label class="text-grey-3">
                            按名称 Z-A
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>
              </div>
              <q-scroll-area class="full-width col">
                <q-list class="article-list">
                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-grey-3 text-bold"
                        >PowerShell美化指南
                        <q-icon name="drafts" color="yellow-9" />
                      </q-item-label>
                      <q-item-label caption lines="3" class="text-grey-5"
                        >安装Windows
                        Terminal然后美化PowerShell。记得先看完本文流程再打开推荐的文章！不然容易搞错哦！Windows
                        Terminal 设置
                        首先从应用商店安装然后需要配置右键打开。参照这篇文章。
                      </q-item-label>
                      <q-item-label>
                        <q-badge
                          color="grey-9"
                          text-color="grey-6"
                          class="q-mr-xs"
                          label="Powershell"
                        />
                        <q-badge
                          color="grey-9"
                          text-color="grey-6"
                          class="q-mr-xs"
                          label="Windows"
                        />
                      </q-item-label>
                      <q-item-label
                        class="text-blue q-pt-sm"
                        style="font-size:xx-small"
                      >
                        9天前</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <template v-for="n in 100">
                    <q-separator
                      :key="n"
                      dark
                      class="bg-grey-9"
                      style="margin-left:20px"
                    />
                    <q-item clickable :key="n">
                      <q-item-section>
                        <q-item-label class="text-grey-3 text-bold"
                          >PowerShell美化指南
                        </q-item-label>
                        <q-item-label caption lines="3" class="text-grey-5"
                          >安装Windows
                          Terminal然后美化PowerShell。记得先看完本文流程再打开推荐的文章！不然容易搞错哦！Windows
                          Terminal 设置
                          首先从应用商店安装然后需要配置右键打开。参照这篇文章。
                        </q-item-label>
                        <q-item-label>
                          <q-badge
                            color="grey-9"
                            text-color="grey-6"
                            class="q-mr-xs"
                            label="Powershell"
                          />
                          <q-badge
                            color="grey-9"
                            text-color="grey-6"
                            class="q-mr-xs"
                            label="Windows"
                          />
                        </q-item-label>
                        <q-item-label
                          class="text-blue q-pt-sm"
                          style="font-size:xx-small"
                        >
                          9天前</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-scroll-area>
            </div>
          </template>
          <template v-slot:after><div class="view-part fit"></div></template>
        </q-splitter>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import NavPart from "../components/NavPart";
export default {
  name: "PageIndex",
  components: {
    NavPart
  },
  data() {
    return {
      nav: 200,
      list: 320
    };
  },
  methods: {
    styleFn(offset, height) {
      return {
        height: height + "px"
      };
    }
  }
};
</script>
<style lang="scss"></style>
