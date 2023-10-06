export default {
    props: ['nowUser', 'remoteUser', 'text', 'avatarUrl'],
    data(){
        return {
            translateMenuVisible: false,
            translatedText: '',  // 存储翻译的结果
        };
    },
    mounted() {
        document.addEventListener('click', this.hidePopover);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hidePopover);
    },
    methods: {
        showTranslateMenu(event, text) {
            // 设置popover的位置
            event.stopPropagation(); // 阻止事件冒泡
            const popover = this.$refs.translatePopover.$el;
            popover.style.left = `${event.pageX}px`;
            popover.style.top = `${event.pageY}px`;

            // 显示popover
            this.translateMenuVisible = true;
        },
        hidePopover() {
            this.translateMenuVisible = false;
        },
        async handleTranslate(targetLanguage) {
            const apiKey = 'AIzaSyDM_dL6KmNoXYqXsAR8HFsYAftHpIVk4Mg'; // Google Translate API密钥
            const detectUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
            const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

            try {
                // 步骤1: 检测文本的源语言
                const detectResponse = await this.$axios.post(detectUrl, { q: this.text });
                if (!detectResponse.data || !detectResponse.data.data || !detectResponse.data.data.detections || detectResponse.data.data.detections.length === 0) {
                    throw new Error('Cannot detect source language.');
                }
                const detectedLanguage = detectResponse.data.data.detections[0][0].language;

                // 步骤2: 使用检测到的语言作为`source`参数翻译文本
                const translationResponse = await this.$axios.post(translateUrl, {
                    q: this.text,
                    source: detectedLanguage,
                    target: targetLanguage
                });

                if (translationResponse.data && translationResponse.data.data && translationResponse.data.data.translations && translationResponse.data.data.translations.length > 0) {
                    this.translatedText = translationResponse.data.data.translations[0].translatedText;
                }
            } catch (error) {
                console.error('Translation API Error:', error);
            }

            // 关闭popover
            this.translateMenuVisible = false;
        }
    }
}