<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="myTask-page" style="background-color: #0D1E48;">
      <div class="board">
        <div class="filter-button">
          <el-button @click="resetDateFilter">reset date filter</el-button>
          <el-button @click="clearFilter">reset all filters</el-button>
        </div>
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            class="table-color">
          <el-table-column
              prop="taskTitle"
              label="title"
              sortable
              width="180"
              column-key="date"
              :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
              :filter-method="filterHandler">
          </el-table-column>
          <el-table-column
              prop="taskSalary"
              label="salary"
              width="180">
          </el-table-column>
          <el-table-column
              prop="taskBeginTime"
              label="begin time"
              :formatter="formatter">
          </el-table-column>
          <el-table-column
              prop="taskLocation"
              label="location"
              width="100"
              :filters="[{ text: 'Home', value: 'Home' }, { text: 'Office', value: 'Office' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                  :type="scope.row.tag === 'Home' ? 'primary' : 'success'"
                  disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="./MyTask.js">
</script>

<style scoped>

.myTask-page {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: calc(100vh - 80px); /* 剩余可用高度，减去页眉高度 */
  width: 100%;
  overflow-y: auto; /* 如果表格内容太多，允许滚动 */
  background-color: #0D1E48;
}

.filter-button {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}
.table-color {
  /* 设置表格的背景颜色为蓝色 */
  background-color: #0D1E48;
}

</style>