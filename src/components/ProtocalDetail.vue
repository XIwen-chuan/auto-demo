<template>
  <div class="_protocol-detail">
    <div class="tag">
      checked:
      <el-check-tag
        :checked="tableData.checked"
        @change="onTagChange"
        disable-transitions
        >{{ props.tableData.checked }}</el-check-tag
      >
    </div>
    <h2 class="paper-title" v-html="props.tableData.title" />
    <div class="paper-authors">
      <p>
        Authors:
        <span
          v-for="(author, index) in props.tableData.attributes.authors"
          v-bind:key="index"
          >{{ author.firstName + " " + author.lastName + ", " }}</span
        >
      </p>
    </div>
    <div class="paper-details">
      <span>
        URL:
        <a :href="props.tableData.attributes.doiUrl">{{
          props.tableData.attributes.doiUrl
        }}</a>
      </span>
      <span>Creation Time: {{ props.tableData.attributes.createdAt }}</span>
      <span>Institution: {{ props.tableData.attributes.institution }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import * as models from "@/models";
import * as api from "@/api";

const props = defineProps<{
  tableData: models.ProtocalM;
}>();

const emits = defineEmits<{
  (e: "toggle-checked"): void;
}>();

const onTagChange = async () => {
  const filename = "protocol_" + props.tableData.identity + ".json";
  await api.reqToggleProtocolChecked(filename);
  emits("toggle-checked");
};
</script>

<style lang="scss">
._protocol-detail {
  position: relative;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;

  .tag {
    position: absolute;
    top: 10px;
    left: 10px;
    .el-check-tag.is-checked {
      background-color: #70b645;
      border-color: #a4f37f;
      color: rgb(244, 247, 243);
    }
  }

  .paper-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .paper-authors {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .paper-details {
    font-size: 14px;

    span {
      margin: 0 50px;
    }

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
