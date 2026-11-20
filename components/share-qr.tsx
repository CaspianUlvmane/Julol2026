"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import qrCode from "@/app/Julol2026 QR-kod.png"

export default function ShareQr() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (isOpen && dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [isOpen])

  function closeDialog() {
    dialogRef.current?.close()
    setIsOpen(false)
  }

  return (
    <div>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer underline underline-offset-4 hover:text-white/80"
      >
        Dela med dig av hemsidan!
      </button>
      {isOpen && (
        <dialog
          ref={dialogRef}
          aria-labelledby="share-qr-title"
          onClose={() => setIsOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog()
            }
          }}
          className="fixed inset-0 m-0 grid h-dvh max-h-none w-screen max-w-none place-items-center bg-transparent p-4 text-white backdrop:bg-black/70"
        >
          <div className="relative flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-teal-950 p-6 text-foreground shadow-2xl">
            <button
              type="button"
              aria-label="Stäng QR-koden"
              onClick={closeDialog}
              className="absolute top-2 right-3 cursor-pointer text-2xl leading-none"
            >
              <span aria-hidden="true">×</span>
            </button>
            <Image
              src={qrCode}
              alt="QR-kod för att öppna hemsidan"
              className="h-auto w-56 rounded-lg"
            />
            <p>Skanna QR-koden för att öppna hemsidan.</p>
          </div>
        </dialog>
      )}
    </div>
  )
}
