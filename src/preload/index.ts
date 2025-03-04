import { CreateNote, DeleteNote, GetNotes, ReadNotes, WriteNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('Context isolation is not enabled')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: () => {
      return navigator.language || navigator.languages[0] || 'en-US'
    },
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNotes: (...args: Parameters<ReadNotes>) => ipcRenderer.invoke('readNotes', ...args),
    writeNotes: (...args: Parameters<WriteNotes>) => ipcRenderer.invoke('writeNotes', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args)
  })
  contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('window:minimize'),
    closeWindow: () => ipcRenderer.send('window:close')
  })
} catch (error) {
  console.error(error)
}
