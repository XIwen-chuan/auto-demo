<template>
  <div class="_regent-list">
    <div class="list">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th v-for="(header, index) in state.headers" :key="index">
                {{ header.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td class="first-line">
                <div
                  class="dot"
                  :style="`background: ${state.list[rowIndex].color}`"
                />
                <div>{{ state.list[rowIndex].reagent }}</div>
              </td>
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                <textarea
                  rows="3"
                  type="text"
                  v-model="rows[rowIndex][cellIndex]"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="others">
      <div class="title">Description</div>
      <div class="tube">
        <img src="@/assets/tube.svg" alt="" />
      </div>
      <div class="reagent0" v-if="rows[0] && rows[0][0]">
        <div class="image"></div>
        <div class="line">
          <img src="@/assets/tubeLine.svg" alt="" />
          <div class="text">{{ rows[0][0] }}</div>
        </div>
      </div>
      <div class="reagent1" v-if="rows[1] && rows[1][0]">
        <div class="image"></div>
        <div class="line">
          <img src="@/assets/tubeLine.svg" alt="" />
          <div class="text">{{ rows[1][0] }}</div>
        </div>
      </div>
      <div class="reagent2" v-if="rows[2] && rows[2][0]">
        <div class="image"></div>
        <div class="line">
          <img src="@/assets/tubeLine.svg" alt="" />
          <div class="text">{{ rows[2][0] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const rows = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const state = reactive({
  headers: [{ name: "" }, { name: "Name" }, { name: "Description" }],
  list: [
    { reagent: "reagent 0", color: "#F8964F" },
    { reagent: "reagent 1", color: "#F364CE" },
    { reagent: "reagent 2", color: "#8763CE" },
  ],
  others: [],
});
</script>

<style lang="scss" scoped>
._regent-list {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .list {
    width: 69%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 3px solid #deebf6;

    background: #e3edf7;

    box-shadow: 0px 2px 4px 0px #d1dbe7 inset, 4px 2px 6px 0px #c1d4e4 inset,
      3px 6px 6px 0px #cddeec inset,
      -6px -3px 5px 0px rgba(255, 255, 255, 0.85) inset;

    .table-container {
      // 你的容器样式
      table {
        // 表格的基础样式
        width: 100%; // 使表格宽度为容器宽度
        table-layout: fixed; // 固定表格布局
        border-collapse: separate; // 防止边框合并
        border-spacing: 0; // 去除单元格之间的间距
        thead {
          // 表头样式
          color: #6e81a0;

          text-align: center;
          font-family: Rubik;
          font-size: 25px;
          font-style: normal;
          font-weight: 600;
          line-height: 26px; /* 104% */
          th {
            vertical-align: middle; // 垂直居中内容单元格的内容
          }
        }
        tbody {
          // 表格主体样式
          tr {
            height: 55px;
            // 行样式
            td {
              vertical-align: middle; // 垂直居中内容单元格的内容
              padding: 10px 0;
              // 单元格样式
              &.first-line {
                width: 160px;
                height: 60px;
                display: flex;
                align-items: center;

                color: #6e81a0;

                text-align: center;
                font-family: Rubik;
                font-size: 28px;
                font-style: normal;
                font-weight: 400;
                line-height: 26px; /* 74.286% */
                .dot {
                  display: inline-block;
                  width: 23px;
                  height: 23px;
                  border-radius: 50%;
                  margin-right: 10px;
                }
              }
              textarea {
                width: 100%;
                padding: 11px 20px;
                box-sizing: border-box;
                border-radius: 27.5px;
                border: 2px solid #deebf6;

                resize: none;

                background: #e3edf7;

                box-shadow: 0px 2px 4px 0px #d1dbe7 inset,
                  4px 2px 6px 0px #c1d4e4 inset, 3px 6px 6px 0px #cddeec inset,
                  -6px -3px 5px 0px rgba(255, 255, 255, 0.85) inset;

                color: #2d3747;

                text-shadow: 0px 1px 1px rgba(39, 44, 54, 0.2);
                font-family: Rubik;
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: 32px; /* 91.429% */
                letter-spacing: -0.343px;
              }
            }
          }
        }
      }
    }
  }
  .others {
    position: relative;
    width: 29%;
    height: 100%;
    min-height: 320px;
    border-radius: 4px;
    border: 3px solid #deebf6;

    background: #e3edf7;

    box-shadow: 0px 2px 4px 0px #d1dbe7 inset, 4px 2px 6px 0px #c1d4e4 inset,
      3px 6px 6px 0px #cddeec inset,
      -6px -3px 5px 0px rgba(255, 255, 255, 0.85) inset;
    .title {
      top: 29px;
      right: 26px;
      position: absolute;

      color: #6e81a0;

      text-align: center;
      font-family: Rubik;
      font-size: 25px;
      font-style: normal;
      font-weight: 600;
      line-height: 26px; /* 104% */
    }
    .tube {
      position: absolute;
      left: 52px;
      top: 33px;
      width: 85.64px;
      height: 280.067px;
      flex-shrink: 0;
    }
    .text {
      font-size: 14px;
    }
    .reagent0 {
      width: 420px;
      position: absolute;
      left: 64.73px;
      top: 216.01px;
      .line {
        display: flex;
        align-items: start;
        position: absolute;
        left: 44.56px;
        top: 45px;
        img {
          width: 70px;
          margin-right: 5px;
          margin-top: 10px;
        }
      }
      .image {
        width: 57.865px;
        height: 87.955px;
        flex-shrink: 0;
        border-radius: 0px 0px 50px 50px;
        opacity: 0.7;
        background: #f8964f;
        box-shadow: 12px 22px 38px 0px rgba(126, 239, 183, 0.16);
      }
    }
    .reagent1 {
      width: 420px;
      display: flex;
      align-items: center;
      position: absolute;
      left: 64.73px;
      top: 188.076px;
      .line {
        display: flex;
        align-items: start;
        position: absolute;
        left: 44.56px;
        top: 4px;
        img {
          width: 70px;
          margin-right: 5px;
          margin-top: 10px;
        }
      }
      .image {
        width: 57.865px;
        height: 28.933px;
        flex-shrink: 0;
        opacity: 0.7;
        background: rgba(255, 109, 172, 0.89);
        box-shadow: 12px 22px 38px 0px rgba(126, 239, 183, 0.16);
      }
    }
    .reagent2 {
      width: 420px;
      align-items: center;
      position: absolute;
      left: 64.73px;
      top: 132.526px;
      .line {
        display: flex;
        align-items: start;
        position: absolute;
        left: 44.56px;
        top: 24px;
        img {
          width: 70px;
          margin-right: 5px;
          margin-top: 10px;
        }
      }
      .image {
        width: 57.865px;
        height: 55.551px;
        flex-shrink: 0;
        opacity: 0.7;
        background: #8763ce;
        box-shadow: 2px 2px 2px 0px rgba(255, 105, 169, 0.18);
      }
    }
  }
}
</style>
