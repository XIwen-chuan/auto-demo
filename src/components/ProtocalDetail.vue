<template>
  <div class="_protocol-detail">
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
import { defineProps } from "vue";
import * as models from "@/models";

const props = defineProps<{
  tableData: models.ProtocalM;
}>();
</script>

<style lang="scss" scoped>
._protocol-detail {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;

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
