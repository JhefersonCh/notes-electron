import {
  ActionsButtonsRow,
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  SideBar
} from '@/components'
import { useRef } from 'react'

const App = () => {
  const editorContainerRef = useRef<HTMLDivElement>(null)

  const resetScroll = () => {
    editorContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <SideBar className="p-2 pr-0 border-r border-r-white/20">
          <ActionsButtonsRow className="flex justify-between mt-1 pr-2" />
          <div className="max-h-[calc(100vh-60px)] overflow-auto w-full pr-2">
            <NotePreviewList className="mt-2 space-y-1" onSelect={resetScroll} />
          </div>
        </SideBar>
        <Content className="p-2  bg-zinc-900/50 ">
          <FloatingNoteTitle className="mt-2" />
          <div className="max-h-[calc(100vh-60px)] overflow-auto" ref={editorContainerRef}>
            <MarkdownEditor />
          </div>
        </Content>
      </RootLayout>
    </>
  )
}

export default App
