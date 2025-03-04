import { CreateNote, DeleteNote, GetNotes, ReadNotes, WriteNotes } from '@shared/types'
declare global {
  interface Window {
    electron: {
      minimizeWindow: () => void
      closeWindow: () => void
    }
    //electron: ElectronAPI
    context: {
      locale: () => string
      getNotes: GetNotes
      readNotes: ReadNotes
      writeNotes: WriteNotes
      createNote: CreateNote
      deleteNote: DeleteNote
    }
  }
}
export {}
