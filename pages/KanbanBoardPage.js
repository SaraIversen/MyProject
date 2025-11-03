const KanbanBoardPage = {
  template: /*html*/`
  <div class="defaultPageSetup">
  
    <button @click="$router.push('/boards')">← Back to Boards</button>
    <h1>{{ $route.params.title }}</h1>

    <div class="kanbanboard">
      <div
        v-for="(column, colIndex) in columns"
        :key="column.id"
        class="column"
        @dragover.prevent="onDragOver(colIndex, $event)"
        @drop="onDrop(colIndex)"
      >

        <h2>{{ column.title }}</h2>

        <div
          v-for="(card, cardIndex) in column.cards"
          :key="card.id"
          class="card"
          :class="{ 'drag-over': isCardHovered(colIndex, cardIndex) }"
          draggable="true"
          @dragstart="onDragStart(colIndex, cardIndex, $event)"
          @dragend="onDragEnd($event)"
          @dragover.prevent="onCardDragOver(colIndex, cardIndex, $event)"
          @dragleave="onCardDragLeave(colIndex, cardIndex, $event)"
        >
          {{ card.text }}
        </div>

        <input
          v-model="newCardText[colIndex]"
          placeholder="New card..."
          @keyup.enter="addCard(colIndex)"
        />
        <button class="add-card" @click="addCard(colIndex)">Add Card</button>
      </div>

      <div class="column new-list">
        <input
          v-model="newColumnTitle"
          placeholder="New list title..."
          @keyup.enter="addColumn"
        />
        <button class="add-column" @click="addColumn">Add List</button>
      </div>
    </div>
  </div>
  `,

  data() {
    return {
      boardTitle: '',
      columns: [
        { id: 1, title: 'To Do', cards: [{ id: 1, text: 'Example task' }] },
        { id: 2, title: 'In Progress', cards: [] },
        { id: 3, title: 'Done', cards: [] },
      ],
      newColumnTitle: '',
      newCardText: [],
      draggedCard: null,
      dropTarget: { colIndex: null, cardIndex: null },
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

    onDragStart(colIndex, cardIndex, event) {
      this.draggedCard = { colIndex, cardIndex };
      event.target.classList.add('dragging');
    },

    onDragEnd(event) {
      event.target.classList.remove('dragging');
      this.dropTarget = { colIndex: null, cardIndex: null };
    },

    onCardDragOver(colIndex, cardIndex, event) {
      this.dropTarget = { colIndex, cardIndex };
    },

    onCardDragLeave(colIndex, cardIndex, event) {
      // Clear highlight if we leave the card area
      if (this.dropTarget.colIndex === colIndex && this.dropTarget.cardIndex === cardIndex) {
        this.dropTarget = { colIndex: null, cardIndex: null };
      }
    },

    onDragOver(colIndex, event) {
      // If hovering over empty column
      if (!this.columns[colIndex].cards.length) {
        this.dropTarget = { colIndex, cardIndex: null };
      }
    },

    onDrop(targetColIndex) {
      if (!this.draggedCard) return;

      const { colIndex, cardIndex } = this.draggedCard;
      const card = this.columns[colIndex].cards.splice(cardIndex, 1)[0];
      const { colIndex: dropCol, cardIndex: dropCardIndex } = this.dropTarget;

      if (dropCardIndex !== null && dropCol === targetColIndex) {
        this.columns[targetColIndex].cards.splice(dropCardIndex, 0, card);
      } else {
        this.columns[targetColIndex].cards.push(card);
      }

      this.draggedCard = null;
      this.dropTarget = { colIndex: null, cardIndex: null };
    },

    isCardHovered(colIndex, cardIndex) {
      return (
        this.dropTarget.colIndex === colIndex &&
        this.dropTarget.cardIndex === cardIndex
      );
    },
  },
};