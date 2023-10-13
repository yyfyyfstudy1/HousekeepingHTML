<template>
  <div style="height: 100vh">
    <Header></Header>
    <div class="myTask-page">
      <el-aside width="200px" class="custom-aside">
        <!-- 第一个栏目 -->
        <el-menu
            text-color="#fff"
            active-text-color="#fffc05"
            style="height: 100%;"
            class="custom-menu"
            router>
          <el-menu-item index="/myTask" style="color: white; font-weight: bold; font-size: 20px">My posted tasks</el-menu-item>
          <el-menu-item index="/myTakenTask" style="color: white; font-weight: bold; font-size: 20px">My taken tasks</el-menu-item>
        </el-menu>
      </el-aside>
      <div class="board">
        <div class="filter-button">
          <el-button @click="clearFilter">reset all filters</el-button>
        </div>
        <el-table
            ref="filterTable"
            :cell-style="{background:'#0D1E48',padding: '0',textAlign: 'center', color:'#ffffff', fontSize:'20px'}"
            :header-cell-style="{background:'#0D1E48', color: '#ffffff', fontSize:'25px',textAlign: 'center', fontweight:700}"
            :data="tableData"
            :row-class-name="getRowClassName"
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
              <router-link :to="{ name: 'TaskStatusHandlerEmployer', query: { id: scope.row.taskId } } "
                           class="custom-link">
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
              prop="taskEstimatedDuration"
              label="estimated time"
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
              >{{ scope.row.taskPhaseDescribe }}
              </el-tag>
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
  justify-content: space-between; /* 使用 space-between 将 "board" 和 "aside" 推到一侧 */
  align-items: flex-start; /* 垂直对齐到顶部 */
  display: flex;
  height: 100%;
  margin: 0; /* 删除外边距以消除任何额外的空隙 */
  background-color: #0D1E48;
}

.board {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%; /* 设置高度为100%以覆盖整个页面 */
  background-color: #0D1E48;
  overflow-x: hidden; /* 隐藏横向滚动条 */
}

.el-aside {
  height: 100%; /* 设置高度为100%以覆盖整个页面 */
  background-color: #0D1E48
}

.el-button {
  background-color: rgb(238, 241, 246);
}

.filter-button {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: #0D1E48;
}

.table-color {
  background-color: #0D1E48;
}

.normal-row {
  color: #eeeeee;
}

.custom-link {
  color: gold;
}

/* 当你将鼠标悬停在链接上时，如果你不想改变颜色，可以这样指定 */
.custom-link:hover {
  color: gold;
}

.custom-menu {
  padding: 0; /* 移除内边距 */
  border: none; /* 移除边框 */
  height: 100%;
  /*width: 100%;*/

  margin-top: 30px;
  background-color: transparent;
  font-size: 36px
}

.custom-aside::-webkit-scrollbar {
  width: 3px; /* 设置滚动条宽度为1px */
  height: 3px; /* 对于横向滚动条，设置高度 */
}

.custom-aside::-webkit-scrollbar-track {
  background: transparent; /* 设置滚动条轨道为透明 */
}

.custom-aside::-webkit-scrollbar-thumb {
  background: #888; /* 设置滚动条滑块的颜色 */
}

.custom-aside::-webkit-scrollbar-thumb:hover {
  background: #555; /* 设置鼠标悬停时滑块的颜色 */
}


.board::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.board::-webkit-scrollbar-track {
  background: transparent;
}

.board::-webkit-scrollbar-thumb {
  background: #888;
}

.board::-webkit-scrollbar-thumb:hover {
  background: #555;
}


</style>
