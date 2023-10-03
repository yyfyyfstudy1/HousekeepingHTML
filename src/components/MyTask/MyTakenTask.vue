<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="myTask-page">
      <el-aside width="200px">
        <!-- 第一个栏目 -->
        <el-menu style="height: 100%;"
                 router>
          <el-menu-item index="/myTask">My posted tasks</el-menu-item>
          <el-menu-item index="/myTakenTask">My taken tasks</el-menu-item>
        </el-menu>
      </el-aside>
      <div class="board">
        <div class="filter-button">
          <el-button @click="clearFilter">reset all filters</el-button>
        </div>
        <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            class="table-color">
          <el-table-column
              type="index"
              width="100">
          </el-table-column>
          <el-table-column
              prop="taskTitle"
              label="title"
              sortable
              width="250">
          <template slot-scope="scope">
            <router-link :to="{ name: 'TaskStatusHandlerLabor', query: { id: scope.row.taskId } }">
              {{ scope.row.taskTitle }}
            </router-link>
          </template>
          </el-table-column>
          <el-table-column
              prop="taskSalary"
              label="salary"
              sortable
              width="250"
              :filters="[{ text: '0~100$', value: '0~100$' }, { text: '100~500$', value: '100~500$' },
                         { text: '500~1000$', value: '500~1000$' }, { text: 'over 1000$', value: 'over 1000$' }]"
              :filter-method="salaryFilterHandler">
          </el-table-column>
          <el-table-column
              prop="taskBeginTime"
              label="begin time"
              sortable
              width="250">
          </el-table-column>
          <el-table-column
              prop="name"
              label="labor name"
              sortable
              width="250">
          </el-table-column>
          <el-table-column
              prop="taskLocation"
              label="location"
              sortable
              width="250"
              :formatter="formatter">
          </el-table-column>
          <el-table-column
              prop="taskPhaseDescribe"
              label="status"
              width="300"
              :filters="[{ text: 'matching labor', value: 'matching labor' }, { text: 'labor take order', value: 'labor take order' },
                         { text: 'employer confirm', value: 'employer confirm' }, { text: 'labor is arrived', value: 'labor is arrived' },
                         { text: 'labor is finished work', value: 'labor is finished work' }, { text: 'employer confirm finished', value: 'employer confirm finished' }]"
              :filter-method="statusFilterHandler">
            <template slot-scope="scope">
              <el-tag
                  :type="getStatusTagType(scope.row.taskPhaseDescribe)"
                  disable-transitions
              >{{ scope.row.taskPhaseDescribe }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="../MyTask/MyTakenTask.js">
</script>

<style scoped>
.myTask-page {
  justify-content: space-between; /* 使用 space-between 将 "board" 和 "aside" 推到一侧 */
  align-items: flex-start; /* 垂直对齐到顶部 */
  display: flex;
  height: 100%;
  margin: 0; /* 删除外边距以消除任何额外的空隙 */
  background-color: #FFFFFF;
}

.board {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%; /* 设置高度为100%以覆盖整个页面 */
  background-color: #FFFFFF;
}

.el-aside {
  height: 100%; /* 设置高度为100%以覆盖整个页面 */
  background-color: #FFFFFF
}

.el-button{
  background-color: rgb(238, 241, 246);
}

.filter-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: #aaaaaa;
}

.table-color {
  background-color: #FFFFFF;
}
</style>
