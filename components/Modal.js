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
          <button class="button-modal" @click="">Labels</button>
          <button class="button-modal" @click="">Checklist</button>
          <button class="button-modal" @click="">Members</button>

          <p><strong>Description</strong></p>
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button class="button-archive" @click="">Archive</button>
        </div>
      </div>
    </div>
  `
}