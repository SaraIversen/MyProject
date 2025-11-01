const KanbanBoardPage = {
  template: /*html*/`
    <h1>Kanban Board</h1>

    <div class="board">
      <div v-for="(column, colIndex) in columns" :key="column.id" class="column"
           @dragover.prevent
           @drop="dropCard(colIndex)">
        <h2>{{ column.title }}</h2>

        <div v-for="(card, cardIndex) in column.cards"
             :key="card.id"
             class="card"
             draggable="true"
             @dragstart="dragStart(colIndex, cardIndex, $event)"
             @dragend="dragEnd($event)">
          {{ card.text }}
        </div>

        <input v-model="newCardText[colIndex]" placeholder="New card..." @keyup.enter="addCard(colIndex)" />
        <button class="add-card" @click="addCard(colIndex)">Add Card</button>
      </div>
    </div>

    <hr>

    <input v-model="newColumnTitle" placeholder="New column title..." @keyup.enter="addColumn" />
    <button class="add-column" @click="addColumn">Add Column</button>
  `,
  data() {
    return {
      columns: [
        { id: 1, title: 'To Do', cards: [{ id: 1, text: 'Example task' }] },
        { id: 2, title: 'In Progress', cards: [] },
        { id: 3, title: 'Done', cards: [] },
      ],
      newColumnTitle: '',
      newCardText: [],
      draggedCard: null,
    };
  },

  methods: {
    addColumn() {
      if (!this.newColumnTitle.trim()) return;
      this.columns.push({
        id: Date.now(),
        title: this.newColumnTitle.trim(),
        cards: [],
      });
      this.newColumnTitle = '';
    },
    addCard(colIndex) {
      const text = this.newCardText[colIndex]?.trim();
      if (!text) return;
      this.columns[colIndex].cards.push({
        id: Date.now(),
        text,
      });
      this.newCardText[colIndex] = '';
    },
    dragStart(colIndex, cardIndex, event) {
      this.draggedCard = { colIndex, cardIndex };
      event.target.classList.add('dragging');
    },
    dragEnd(event) {
      event.target.classList.remove('dragging');
    },
    dropCard(targetColIndex) {
      const { colIndex, cardIndex } = this.draggedCard;
      const card = this.columns[colIndex].cards.splice(cardIndex, 1)[0];
      this.columns[targetColIndex].cards.push(card);
      this.draggedCard = null;
    },
  },
};
