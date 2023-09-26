import Header from "../Header.vue";
import store from "@/store";
 
export default {
    components: {Header},
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            email: '',
            avatarUrl: ''
            // imageUrl: require('@/assets/img_2.png')
        };
    },
    computed: {
        id() {
            // Get the user from the store and return its id
            const user = store.getters.getUserInfo;
            return user.id;
        }
    },
    mounted() {
        // Automatically fetch the profile once the component is mounted
        this.fetchUserProfile();
    },
    methods: {
        // 选择文件的方法
        chooseFile() {
            // console.log("Choosing file...");
            this.$refs.fileInput.click();
        },
        // 处理文件更改的方法
        handleFileChange(event) {
            const selectedFile = event.target.files[0];
            if (!selectedFile) {
                return;
            }
            this.uploadFile(selectedFile);
        },
        // 上传文件的方法
        uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);

            const token = store.getters.getToken;
            this.$axios.post(this.$httpurl + '/member/employer/uploadImage', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(res => {
                    if (res.code === 200) {
                        console.log("reset imageUrl");
                        this.avatarUrl = res.data;
                    } else {
                        alert("上传失败");
                    }
                });
        },
        fetchUserProfile() {
            this.$axios.get(this.$httpurl + '/user/profile', {
                params: { id: this.id }  // 根据需要动态传入用户ID
            })
                .then(response => {
                    if (response.data.code === 200) {
                        const userData = response.data.data;
                        this.name = userData.name;
                        this.address = userData.address;
                        this.phone = userData.phone;
                        this.email = userData.email;
                        this.avatarUrl = userData.avatarUrl;
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
                phone: this.phone,
                address: this.address,
                avatarUrl: this.avatarUrl
                // 移除了 email 和 address 字段，因为后端不需要这些字段
            })
                .then(res => res.data)
                .then(data => {
                    // 根据新的返回格式进行检查
                    if (data.code === 200 && data.data.code === 200) {
                        alert("Profile updated successfully!");
                        this.fetchUserProfile();  // 重新获取最新的用户信息
                        this.$refs.headerComponent.fetchUserProfile(); // 获取Header组件的用户信息
                    } else {
                        alert("Failed to update the profile");
                    }
                })
                .catch(error => {
                    console.error("An error occurred while updating the profile:", error);
                });
        },
        logOut() {
            // 1. Update the store state
            store.commit('setIsLoggedIn', false);
            store.commit('setToken', null);
            // 2. Redirect to the login page
            this.$router.push('/'); // Assuming the route path for your login page is '/login'
        }

    }
};
