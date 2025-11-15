const MoodboardPage = {
  template: /*html*/`
    <div class="moodboard-container">
      <div class="toolbar">
        <input type="file" @change="onImageUpload" multiple accept="image/*">
      </div>

      <div class="moodboard" @mousedown="bringToFront">
        <div 
          v-for="(img, index) in images" 
          :key="img.id"
          class="draggable-image"
          :style="{
            top: img.y + 'px',
            left: img.x + 'px',
            zIndex: img.z
          }"
          @mousedown.prevent="startDrag($event, img)"
        >
          <img :src="img.src" alt="">
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      images: [],
      dragInfo: null,
      currentZ: 1
    };
  },
  methods: {
    onImageUpload(event) {
      const files = event.target.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push({
            id: Date.now() + Math.random(),
            src: e.target.result,
            x: 100,
            y: 100,
            z: this.currentZ++
          });
        };
        reader.readAsDataURL(file);
      }
    },
    startDrag(e, img) {
      this.dragInfo = {
        img,
        offsetX: e.clientX - img.x,
        offsetY: e.clientY - img.y
      };
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    onDrag(e) {
      if (!this.dragInfo) return;
      const { img, offsetX, offsetY } = this.dragInfo;
      img.x = e.clientX - offsetX;
      img.y = e.clientY - offsetY;
    },
    stopDrag() {
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
      this.dragInfo = null;
    },
    bringToFront(e) {
      // Optional: ensures clicked image comes to front
      const target = this.images.find(img => e.target.src === img.src);
      if (target) target.z = ++this.currentZ;
    }
  }
};