import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models'
import { CreateNote, DeleteNote, GetNotes, ReadNotes, WriteNotes } from '@shared/types'
import { dialog } from 'electron'
import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'
import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path, { join } from 'path'
import welcomeNote from '../../../resources/welcomeNote.md?asset'

/**
 * Obtiene el directorio raíz de la aplicación
 * @returns {string} Ruta al directorio raíz
 */
export const getRootDir = (): string => {
  return join(homedir(), 'Documents', appDirectoryName)
}

/**
 * Obtiene la lista de archivos markdown del directorio
 * @returns {Promise<NoteInfo[]>} Lista de nombres de archivos
 * @throws {Error} Si hay un error al leer el directorio
 */
export const getNotes: GetNotes = async () => {
  try {
    const rootDir = getRootDir()
    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
      encoding: fileEncoding,
      withFileTypes: false
    })

    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

    if (isEmpty(notes)) {
      const content = await readFile(welcomeNote, { encoding: fileEncoding })
      await writeFile(join(rootDir, 'Welcome.md'), content, { encoding: fileEncoding })

      notes.push('Welcome.md')
    }

    return Promise.all(notes.map(getNoteInfoFromFileName))
  } catch (error) {
    throw new Error(`Error al obtener las notas: ${error?.['message']}`)
  }
}

export const getNoteInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
  const fileStats = await stat(join(getRootDir(), fileName))

  return {
    title: fileName.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNotes: ReadNotes = async (fileName) => {
  return readFile(join(getRootDir(), `${fileName}.md`), { encoding: fileEncoding })
}

export const writeNotes: WriteNotes = async (fileName, content) => {
  return writeFile(join(getRootDir(), `${fileName}.md`), content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New note',
    defaultPath: join(rootDir, 'Untitled.md'),
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) return false

  const { name: fileName, dir: parentDir } = path.parse(filePath)
  if (parentDir !== rootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: `All notes must be inside the ${rootDir} directory`
    })
    return false
  }
  await writeFile(filePath, '')

  return fileName
}

export const deleteNote: DeleteNote = async (fileName) => {
  const rootDir = getRootDir()
  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete note',
    message: `Are you sure you want to delete ${fileName}?`,
    buttons: ['Delete', 'Cancel'],
    defaultId: 1,
    cancelId: 1
  })

  if (response === 1) {
    return false
  }
  await remove(join(rootDir, `${fileName}.md`))
  return true
}
