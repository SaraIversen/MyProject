const KanbanBoardPage = {
  components: { Modal },
  template: /*html*/`
  <div class="defaultPageSetup">
  
    <!--<button class="button" @click="$router.push('/boards')">Back</button>
    <h1>{{ $route.params.title }}</h1>-->

    <div class="kanbanboard-header">
        <h1 class="kanbanboard-page-title">{{ $route.params.title }}</h1>
        <!--<div class="kanbanboard-header-spacer">
            <img src="./assets/images/socks_green.jpg" class="member-avatar" title="Member name 1">
            <img src="./assets/images/socks_blue.jpg" class="member-avatar" title="Member name 2">
            <img src="./assets/images/socks_blue.jpg" class="member-avatar" title="Member name 3">
            <img src="./assets/images/socks_green.jpg" class="member-avatar" title="Member name 4">
            <img src="./assets/images/socks_blue.jpg" class="member-avatar" title="Member name 5">
            <button class="button" @click="">Share</button>
        </div>-->
    </div>

    <div class="kanbanboard">
    <div
        v-for="(column, colIndex) in columns"
        :key="column.id"
        class="kanban-column"
        :class="{ hovered: hoveredColumnIndex === colIndex && draggedColumnIndex !== null }"
        @dragover.prevent="onColumnDragOverTarget(colIndex, $event)"
        @drop="onColumnDrop(colIndex)"
        >

        <!-- COLUMN HEADER (for dragging columns) -->
        <h2 class="kanban-column-title"
            draggable="true"
            @dragstart="onColumnDragStart(colIndex, $event)"
            @dragend="onColumnDragEnd($event)"
            >
            {{ column.title }}
        </h2>

        <!-- CARD CONTAINER (for dragging cards) -->
        <div
            class="cards-container"
            @dragover.prevent="onCardDragOverColumn(colIndex, $event)"
            @drop="onCardDropInColumn(colIndex)"
            >
            <div v-if="!column.cards.length && draggedCard !== null" class="empty-drop-zone">
                Drop card here
            </div>
            <div
                v-for="(card, cardIndex) in column.cards"
                :key="card.id"
                class="card"
                :class="{ 'drag-over': isCardHovered(colIndex, cardIndex) }"
                draggable="true"
                @click="openCardModal(card)"
                @dragstart="onCardDragStart(colIndex, cardIndex, $event)"
                @dragend="onCardDragEnd($event)"
                @dragover.prevent="onCardDragOverTarget(colIndex, cardIndex, $event)"
                @dragleave="onCardDragLeaveTarget(colIndex, cardIndex, $event)"
                >
            {{ card.title }}
            </div>
        </div>

        <input
            class="kanbanboard-input"
            v-show="column.creatingNewCard"
            v-model="newCardText[colIndex]"
            placeholder="New card..."
            @keyup.enter="addCard(colIndex)"
            @click.stop
            />
            <button class="add-card" @click="addCard(colIndex)">+ Add Card</button>
        </div>

        <div class="kanban-column new-list">
            <input
            class="kanbanboard-input"
            v-show="creatingNewColumn"
            v-model="newColumnTitle"
            placeholder="New list title..."
            @keyup.enter="addColumn"
            @click.stop
            />
            <button class="add-column" @click="addColumn">+ Add List</button>
        </div>
    </div>

    <Modal
    :show="showCardModal"
    :title="selectedCard ? selectedCard.title : ''"
    :description="selectedCard ? selectedCard.description : ''"
    @close="closeCardModal"
    >
    <div v-if="selectedCard">
        <!-- <p><strong>Card ID:</strong> {{ selectedCard.id }}</p> 
        <p><strong>Description</strong></p>
        <textarea v-model="selectedCard.title" style="width:100%;height:100px;"></textarea> -->
        <textarea v-model="selectedCard.description" style="width:100%;height:100px;"></textarea>
    </div>
    </Modal>
    
</div>
`,
data() {
    return {
        boardTitle: '',
        columns: [
            { 
                id: 1, 
                title: 'To Do', 
                cards: [
                    { id: 1, title: 'Design main menu', description: '' },
                    { id: 2, title: 'Implement login system', description: '' }
                ], 
                creatingNewCard: false 
            },
            {   
                id: 2, 
                title: 'In Progress', 
                cards: [
                    { id: 3, title: 'Networking system', description: '' }
                ], 
                creatingNewCard: false 
            },
            { 
                id: 3, 
                title: 'Done', 
                cards: [
                    { id: 4, title: 'Project setup', description: '' }
                ], 
                creatingNewCard: false 
            },
        ],

        creatingNewColumn: false,
        newColumnTitle: '',

        hoveredColumnIndex: null,
        draggedColumnIndex: null,

        newCardText: [],

        draggedCard: null,
        dropTarget: { colIndex: null, cardIndex: null },

        // Modal related
        selectedCard: null,
        showCardModal: false,
    };
},
beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
},
mounted() {
    document.addEventListener('click', this.handleClickOutside);
},
methods: {
    // ---------- ADD CARD & COLUMN LOGIC ---------- //
    addColumn() {
        // Close any open "add card" inputs
        this.columns.forEach(col => (col.creatingNewCard = false));

        // First click: show input if not already creating a new column
        if (!this.creatingNewColumn) {
            this.creatingNewColumn = true;
            return;
        }

        if (!this.newColumnTitle.trim()) return;
            this.columns.push({
                id: Date.now(),
                title: this.newColumnTitle.trim(),
                cards: [],
            });
        this.newColumnTitle = '';
    },

    addCard(colIndex) {
        // Close any open "add column" input
        this.creatingNewColumn = false;

        const column = this.columns[colIndex];

        // First click: show input if not already creating a new card
        if (!column.creatingNewCard) {

            // Close all other columns first
            this.columns.forEach(c => (c.creatingNewCard = false));

            // Activate only this column
            column.creatingNewCard = true;

            return;
        }

        const text = this.newCardText[colIndex]?.trim();
        if (!text) return;

        // Add the new card
        column.cards.push({
            id: Date.now(),
            title: text,
        });

        // Reset input
        this.newCardText[colIndex] = '';
        // column.creatingNewCard = false;
    },

    // ---------- CARD DRAG & DROP LOGIC ---------- //
    // When the mouse is over a card
    isCardHovered(colIndex, cardIndex) {
        return (
            this.dropTarget.colIndex === colIndex &&
            this.dropTarget.cardIndex === cardIndex
        );
    },

    onCardDragStart(colIndex, cardIndex, event) {
        // console.log("drag start");

        // Close any open "add card" and list inputs
        this.closeAllAddNewInputs();

        this.draggedCard = { colIndex, cardIndex };
        event.target.classList.add('dragging');
    },
    onCardDragEnd(event) {
        // console.log("drag end");
        event.target.classList.remove('dragging');
        this.dropTarget = { colIndex: null, cardIndex: null };
    },

    // When dragging a card, we store the current hover target
    onCardDragOverTarget(colIndex, cardIndex, event) {
        // console.log("card drag over");
        this.dropTarget = { colIndex, cardIndex };
    },
    // Clear highlight if we leave the card area (moves the mouse away from any available drop targets)
    onCardDragLeaveTarget(colIndex, cardIndex, event) {
        // console.log("card drag leave");
        if (this.dropTarget.colIndex === colIndex && this.dropTarget.cardIndex === cardIndex) {
            this.dropTarget = { colIndex: null, cardIndex: null };
        }
    },

    // If hovering over an empty column
    onCardDragOverColumn(colIndex, event) {
        if (!this.columns[colIndex].cards.length) {
            this.dropTarget = { colIndex, cardIndex: null };
        }
    },

    // This is the core method that actually moves the card to its new spot when you drop it.
    onCardDropInColumn(targetColIndex) {
        if (!this.draggedCard) return; // Check if a card is actually being dragged.

        const { colIndex, cardIndex } = this.draggedCard; // Get where the dragged card originally came from.
        const card = this.columns[colIndex].cards.splice(cardIndex, 1)[0]; // Remove the card from its old location.
        const { colIndex: dropCol, cardIndex: dropCardIndex } = this.dropTarget; // Get information about where the card was dropped.

        // Logic to decide how to insert the card:
        if (dropCardIndex !== null && dropCol === targetColIndex) // If the card was dropped over or between specific cards in the same column, insert it there.
        {
            this.columns[targetColIndex].cards.splice(dropCardIndex, 0, card); 
        } 
        else // Otherwise (like if you dropped it in an empty column or at the bottom), just append it with push.
        {
            this.columns[targetColIndex].cards.push(card);
        }

        // Cleanup, to prepare for the next drag-and-drop action.
        this.draggedCard = null;
        this.dropTarget = { colIndex: null, cardIndex: null };
    },

    // ---------- CAOLUMN DRAG & DROP LOGIC ---------- //
    onColumnDragStart(colIndex, event) {
        // console.log("drag start");

        // Close any open "add card" and list inputs
        this.closeAllAddNewInputs();


        this.draggedColumnIndex = colIndex;
        event.target.classList.add('dragging');
    },
    onColumnDragEnd(event) {
        // console.log("drag end");
        event.target.classList.remove('dragging');
        this.draggedColumnIndex = null;
        this.hoveredColumnIndex = null;
    },
    onColumnDragOverTarget(targetColIndex, event) {
        // console.log("column drag over");
        this.hoveredColumnIndex = targetColIndex;
    },
    onColumnDrop(targetColIndex) {
        // console.log("column drop");
        if (this.draggedColumnIndex === null || this.draggedColumnIndex === targetColIndex) return;
        
        // Move the dragged column
        const moved = this.columns.splice(this.draggedColumnIndex, 1)[0];
        this.columns.splice(targetColIndex, 0, moved);

        // Reset states
        this.draggedColumnIndex = null;
        this.hoveredColumnIndex = null;
        // console.log("column dropped at index:", targetColIndex);
    },

    // ---------- DEACTIVATE INPUT FIELDS ---------- //
    handleClickOutside(event) {
        const columnEls = this.$el.querySelectorAll('.column:not(.new-list)');
        let clickedInsideAnyColumn = false;

        columnEls.forEach((columnEl, index) => {
            const col = this.columns[index];

            if (columnEl.contains(event.target)) {
                clickedInsideAnyColumn = true;

                // Check if the click target is the input or the add button
                const isClickOnAddUI =
                    event.target.closest('input') || event.target.closest('.add-card');

                // If user clicked inside the same column but not on input or add button → close it
                if (!isClickOnAddUI) {
                    col.creatingNewCard = false;
                }
            } 
            else 
            {
                // Click was outside this column → close it
                col.creatingNewCard = false;
            }
        });

        // If click wasn't inside any column → close all
        if (!clickedInsideAnyColumn) {
            this.columns.forEach(col => (col.creatingNewCard = false));
        }
    },
    closeAllAddNewInputs() {
        this.columns.forEach(col => (col.creatingNewCard = false));
        this.creatingNewColumn = false;
    },

    // ---------- MODAL REALTED ---------- //
    openCardModal(card) {
        this.selectedCard = card;
        this.showCardModal = true;
    },
    closeCardModal() {
        this.showCardModal = false;
        this.selectedCard = null;
    },
  }
}