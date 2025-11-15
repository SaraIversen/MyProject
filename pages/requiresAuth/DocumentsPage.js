const DocumentsPage = {
  template: /*html*/`
    <div class="docs-container">
      <aside class="sidebar">
        <h2>Folders</h2>
        <ul>
          <li v-for="(docs, folder) in documents" 
              :key="folder"
              @click="selectFolder(folder)"
              :class="{ active: folder === selectedFolder }">
            {{ folder }}
          </li>
        </ul>
        <input class="documents-input" v-model="newFolderName" placeholder="New folder name" @keyup.enter="addFolder">
      </aside>

      <main class="main-content">
        <div class="doc-list">
          <h2>{{ selectedFolder || 'Select a Folder' }}</h2>
          <ul v-if="selectedFolder">
            <li v-for="doc in documents[selectedFolder]" 
                :key="doc.id" 
                @click="selectDocument(doc)"
                :class="{ active: doc === selectedDocument }">
              {{ doc.title }}
            </li>
          </ul>
          <button class="documents-button" v-if="selectedFolder" @click="createDocument">+ New Document</button>
        </div>

        <div class="doc-editor" v-if="selectedDocument">
          <input class="title-input" v-model="selectedDocument.title" placeholder="Document title">
          <textarea v-model="selectedDocument.content" class="content-editor" placeholder="Start writing..."></textarea>
          <div class="editor-actions">
            <button class="documents-button" @click="saveDocument">Save</button>
            <button class="documents-button" @click="deleteDocument">Delete</button>
          </div>
        </div>
      </main>
    </div>
  `,
  data() {
    return {
      documents: {
        Gameplay: [
          { id: 1, title: 'Combat System', content: 'Describe combat mechanics here.' },
          { id: 2, title: 'Level Design', content: 'Notes on level design.' }
        ],
        Story: [
          { id: 3, title: 'Main Plot', content: 'The story begins...' }
        ],
        Characters: []
      },
      selectedFolder: null,
      selectedDocument: null,
      newFolderName: ''
    }
  },
  methods: {
    selectFolder(folder) {
      this.selectedFolder = folder;
      this.selectedDocument = null;
    },
    addFolder() {
      const name = this.newFolderName.trim();
      if (name && !this.documents[name]) {
        this.documents[name] = [];
        this.newFolderName = '';
      }
    },
    selectDocument(doc) {
      this.selectedDocument = doc;
    },
    createDocument() {
      const newDoc = { id: Date.now(), title: 'New Document', content: '' };
      this.documents[this.selectedFolder].push(newDoc);
      this.selectedDocument = newDoc;
    },
    saveDocument() {
      // For now, it just saves in memory
      alert('Document saved (in-memory only for now)');
    },
    deleteDocument() {
      const docs = this.documents[this.selectedFolder];
      const index = docs.indexOf(this.selectedDocument);
      if (index !== -1) docs.splice(index, 1);
      this.selectedDocument = null;
    }
  }
}