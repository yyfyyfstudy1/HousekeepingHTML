<template>
  <div>
    <Header  ref="headerRef"></Header>
    <div class="table-container">
      <el-table :data="messages" style="width: 100%"
                :cell-style="{background:'#0D1E48',padding: '0',textAlign: 'center', color:'#ffffff', fontSize:'18px', height:'100px'}"
                :header-cell-style="{background:'#0D1E48', color: '#ffffff', fontSize:'18px',textAlign: 'center', fontweight:500}"
                class="dark-table">
        <el-table-column prop="sendTime" label="Send Time" width="180">

          <template slot-scope="scope">
            {{ scope.row.sendTime | timestampToHumanReadable }}
          </template>

        </el-table-column>
        <el-table-column prop="sendTime" label="System message" width="180">
          <img src="../../assets/robot.png" class="avatar">
        </el-table-column>
        <el-table-column label="Content" width="380">
          <template slot-scope="scope">
            {{ scope.row.content }}
            <span v-if="!scope.row.isRead" class="unread-dot"></span>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button  v-if="!scope.row.isRead" type="primary" @click="markAsRead(scope.row.id, 1)">Read</el-button>
            <el-button v-else type="info" @click="markAsRead(scope.row.id, 0)">unread</el-button>

            <el-button type="danger" @click="deleteMessage(scope.row.id)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script src="./Notification.js">
</script>

<style scoped>


.table-container {
  width: 70%;
  margin: 20px auto;
  background-color: black;
  color: white;
  padding: 20px;  /* Optional: Add padding around the table for some spacing */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.unread-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-left: 10px;
}

.dark-table {
  background-color: black;
}

.dark-table .el-table__row {
  color: white;
}
</style>
