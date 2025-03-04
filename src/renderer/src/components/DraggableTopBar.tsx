import { Minus, X } from 'lucide-react'

export const DraggableTopBar = () => {
  const handleMinimize = () => window.electron.minimizeWindow()
  const handleClose = () => window.electron.closeWindow()

  return (
    <header className="absolute inset-0 ml-[250px] h-10 flex justify-end items-center">
      <button
        onClick={handleMinimize}
        aria-label="Minimizar ventana"
        className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-zinc-900/60 
          active:bg-zinc-900/40 transition-colors"
      >
        <Minus size={18} />
      </button>
      <button
        onClick={handleClose}
        aria-label="Cerrar ventana"
        className="w-10 h-10 flex items-center justify-center bg-transparent hover:bg-red-500/60 
          active:bg-red-500/40 transition-colors"
      >
        <X size={18} />
      </button>
    </header>
  )
}
