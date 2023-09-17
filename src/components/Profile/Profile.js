import Header from "../Header.vue";
import store from "@/store";

export default {
    components: {Header},
    data() {
        return {
            id: 1, // assuming you need an ID to fetch/update the user data
            name: '',
            // address: '',
            phone: '',
            email: ''
        };
    },
    mounted() {
        // Automatically fetch the profile once the component is mounted
        this.fetchUserProfile();
    },
    methods: {

        fetchUserProfile() {
            this.user = store.getters.getUserInfo;
            let userId = this.user.id;
            this.$axios.get(this.$httpurl + '/user/profile', {
                params: { id: userId }  // 根据需要动态传入用户ID
            })
                .then(response => {
                    if (response.data.code === 200) {
                        const userData = response.data.data;
                        this.name = userData.name;
                        // this.address = userData.address || "";  // 假设响应中没有地址字段
                        this.phone = userData.phone;
                        this.email = userData.email;
                    } else {
                        console.error("Error fetching profile:", response.data.msg);
                    }
                })
                .catch(error => {
                    console.error("Error fetching profile:", error.response ? error.response.data : error.message);
                });
        },

        updateProfile() {
            this.$axios.post(this.$httpurl + '/user/update', {
                id: this.id,
                name: this.name,
                phone: this.phone
                // 移除了 email 和 address 字段，因为后端不需要这些字段
            })
                .then(res => res.data)
                .then(data => {
                    // 根据新的返回格式进行检查
                    if (data.code === 200 && data.data.code === 200) {
                        alert("Profile updated successfully!");
                        this.fetchUserProfile();  // 重新获取最新的用户信息
                    } else {
                        alert("Failed to update the profile");
                    }
                })
                .catch(error => {
                    console.error("An error occurred while updating the profile:", error);
                });
        }
    }
};
