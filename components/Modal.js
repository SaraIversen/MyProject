const Modal = {
  props: ['show', 'title', 'description'],
  emits: ['close'],
  template: /*html*/`
    <div v-if="show" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal">
        <header class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="$emit('close')">×</button>
        </header>
        <div class="modal-body">

          <!-- Custom MultiSelect -->
          <!--<div class="multiselect" @click="toggleDropdown">
            <div class="selected" :class="{ placeholder: selectedLabels.length === 0 }">
              <template v-if="selectedLabels.length === 0">
                Select colors...
              </template>
              <template v-else>
                <div v-for="(label, index) in selectedLabels" :key="label.id" class="tag">
                  {{ label.color }}
                  <span @click.stop="removeLabel(label)">×</span>
                </div>
              </template>
            </div>

            <div class="dropdown" v-if="dropdownOpen">
              <div v-for="label in labels"
                   :key="label.id"
                   :class="{ active: isSelected(label) }"
                   @click.stop="toggleLabel(label)">
                {{ label.color }}
              </div>
            </div>
          </div>-->


                    <!--<button class="button-modal" @click="">Labels</button>
                    <label for="labels">Labels</label>
                    <select id="labels" name="labels" v-model="currentLabels" multiple="multiple">
                      <option>Red</option>
                      <option>Green</option>
                      <option>Blue</option>
                      <option>Yellow</option>
                    </select>

                    <div class="multiselect" id="colorSelect">
                    <div class="selected placeholder">Select colors...</div>
                    <div class="dropdown">
                      <div data-value="Red">Red</div>
                      <div data-value="Green">Green</div>
                      <div data-value="Blue">Blue</div>
                      <div data-value="Yellow">Yellow</div>
                    </div>
                  </div>-->

          <!-- <button class="button-modal" @click="">Checklist</button>
          <button class="button-modal" @click="">Members</button> -->

          <p><strong>Description</strong></p>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button class="button-archive" @click="">Archive</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      dropdownOpen: false,
      labels: [
        { id: 1, name: 'Bug', color: 'red' },
        { id: 2, name: 'Feature', color: 'green' },
        { id: 3, name: 'Improvement', color: 'blue' },
        { id: 4, name: 'Documentation', color: 'yellow' },
      ],
      selectedLabels: [],
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleLabel(label) {
      if (this.isSelected(label)) {
        this.selectedLabels = this.selectedLabels.filter(l => l.id !== label.id);
      } else {
        this.selectedLabels.push(label);
      }
    },
    removeLabel(label) {
      this.selectedLabels = this.selectedLabels.filter(l => l.id !== label.id);
    },
    isSelected(label) {
      return this.selectedLabels.some(l => l.id === label.id);
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    ...{
      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
      },
      toggleLabel(label) {
        if (this.isSelected(label)) {
          this.selectedLabels = this.selectedLabels.filter(l => l.id !== label.id);
        } else {
          this.selectedLabels.push(label);
        }
      },
      removeLabel(label) {
        this.selectedLabels = this.selectedLabels.filter(l => l.id !== label.id);
      },
      isSelected(label) {
        return this.selectedLabels.some(l => l.id === label.id);
      },
      handleClickOutside(e) {
        if (!this.$el.contains(e.target)) {
          this.dropdownOpen = false;
        }
      },
    }
  }
}