const BoardsPage = {
  template: /*html*/`
    <div class="defaultPageSetup">
        <!-- <h1>Boards</h1> -->

        <br/>
    
        <!-- ⭐ Starred boards section -->
        <div v-if="starredBoards.length">
            <h2>Starred Boards</h2>
            <div class="boards-container">
                <router-link
                    v-for="board in starredBoards"
                    :key="board.id"
                    class="board"
                    :to="{ 
                        name: 'kanbanboard', 
                        params: { 
                            id: board.id.toString(),
                            title: board.title 
                        } 
                    }"
                >
                <div class="star" @click.stop="toggleStar(board)">
                    <span v-if="board.starred" class="star-filled">★</span>
                    <span v-else class="star-outline">☆</span>
                </div>

                <img :src="board.image" class="board-image" />
                <h2>{{ board.title }}</h2>
                </router-link>
            </div>
        </div>

        <br/><br/>

        <!-- 📋 Regular boards -->
        <h2>YOUR BOARDS</h2>
        <div class="boards-container">
            <router-link
                v-for="(board, boardIndex) in boards"
                :key="board.id"
                class="board"
                :to="{ 
                        name: 'kanbanboard', 
                        params: { 
                            id: board.id.toString(),
                            title: board.title 
                        } 
                    }"
                >

                <div class="star" @click.stop="toggleStar(board)">
                    <span v-if="board.starred" class="star-filled">★</span>
                    <span v-else class="star-outline">☆</span>
                </div>

                <img :src="board.image" class="board-image" />
                <h2>{{ board.title }}</h2>
            </router-link>

            <!-- ➕ Create new board card -->
            <div class="board create-board" @click="openModal">
                <span class="plus">＋</span>
                <p>Create new board</p>
            </div>

            <!-- 🪟 Modal for creating a new board -->
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal">
                <h2>Create New Board</h2>
                <input v-model="newBoardTitle" placeholder="Board title..." />
                <input v-model="newBoardImage" placeholder="Image URL (optional)" />
                <div class="modal-actions">
                    <button @click="createBoard">Create</button>
                    <button class="cancel" @click="closeModal">Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  `,
    data() {
        return {
            boards: [
                { id: 1, title: 'My First Board', image: './assets/images/socks_green.jpg', starred: false },
                { id: 2, title: 'Game Jam u24', image: './assets/images/socks_blue.jpg', starred: true },
            ],
            showModal: false,
            newBoardTitle: '',
            newBoardImage: '',
        };
    },
    methods: {
        toggleStar(board) {
            board.starred = !board.starred;
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.newBoardTitle = '';
            this.newBoardImage = '';
        },
        createBoard() {
            const title = this.newBoardTitle.trim();
            if (!title) return;

            this.boards.push({
                id: Date.now(),
                title,
                image: this.newBoardImage || 'https://via.placeholder.com/300x150?text=New+Board',
                starred: false,
            });

            this.closeModal();
        },
    },
    computed: {
        starredBoards() {
            return this.boards.filter(b => b.starred);
        },
        unstarredBoards() {
            return this.boards.filter(b => !b.starred);
        },
    },
}