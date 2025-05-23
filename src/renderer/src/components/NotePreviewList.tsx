import { NotePreview } from '@/components/NotePreview'
import { useNotesList } from '@/hooks/useNotesList'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: NotePreviewListProps) => {
  const { notes, selectedNoteIndex, handleSelectNote } = useNotesList({ onSelect })

  if (!notes?.length) {
    return (
      <ul className={twMerge('text-center pt-4', className)} {...props}>
        <span>No notes Yet !</span>
      </ul>
    )
  }

  return (
    <ul className={className} {...props}>
      {notes?.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          {...note}
          isActive={selectedNoteIndex === index}
          onClick={handleSelectNote(index)}
        />
      ))}
    </ul>
  )
}
