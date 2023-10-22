import Header from "../Header.vue"
import store from "@/store";
export default {
    components: {
        Header
    },
    mounted() {
        this.token = store.getters.getToken;
        this.userId = store.getters.getUserInfo.id
        this.getNotificationList();
    },
    data() {
        return {
            messages: [
                { content: '这是一个未读消息', sendTime: '2023-10-22 10:00', isRead: false },
                { content: '这是一个已读消息', sendTime: '2023-10-21 14:30', isRead: true },
                //... more messages
            ],
            token:"",
            userId : null
        };
    },
    methods:{
            markAsRead(id, status) {

            this.$axios.get(this.$httpurl + '/member/notification/readNotification', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                params: {
                    notificationId: id,
                    isRead: status
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.getNotificationList()
                        // 调用Header组件的updateHeader方法
                        this.$refs.headerRef.getNotificationCount();
                    } else {
                        alert("failed to get the data");
                    }
                });


        },
        deleteMessage(id) {
            // 这里添加删除消息的逻辑
            this.$axios.get(this.$httpurl + '/member/notification/deleteNotification', {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                params: {
                    notificationId: id,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.getNotificationList()
                        // 调用Header组件的updateHeader方法
                        this.$refs.headerRef.getNotificationCount();
                    } else {
                        alert("failed to get the data");
                    }
                });

        },
        getNotificationList(){

            this.$axios.get(this.$httpurl + '/member/notification/getAllNotification', {
                headers: {
                    'Authorization': `Bearer ${ store.getters.getToken}`
                },
                params: {
                    userId: store.getters.getUserInfo.id,
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        this.messages = res.data.map(message => {
                            message.sendTime = this.timestampToHumanReadable(message.sendTime);
                            return message;
                        });
                    } else {
                        alert("failed to get the data");
                    }
                });
        },


        timestampToHumanReadable(timestamp) {
            const date = new Date(timestamp );
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }


    }
}