"use client"

import { useCallback, useState, useSyncExternalStore } from "react"

const STORAGE_ERROR = "storage-error"
const RATING_CHANGE_EVENT = "julol2026:rating-change"

function isRating(value: number): boolean {
  return value >= 0.5 && value <= 5 && Number.isInteger(value * 2)
}

function subscribeToRatingChanges(callback: () => void) {
  window.addEventListener("storage", callback)
  window.addEventListener(RATING_CHANGE_EVENT, callback)

  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(RATING_CHANGE_EVENT, callback)
  }
}

function getSavedRating(
  storageKey: string
): number | null | typeof STORAGE_ERROR {
  try {
    const savedRating = window.localStorage.getItem(storageKey)
    const parsedRating = savedRating === null ? NaN : Number(savedRating)

    return isRating(parsedRating) ? parsedRating : null
  } catch {
    return STORAGE_ERROR
  }
}

function getServerRating(): null {
  return null
}

export default function BeerRating({ beerId }: { beerId: string }) {
  const [saveError, setSaveError] = useState(false)
  const storageKey = `julol2026:beer-rating:${beerId}`
  const getSnapshot = useCallback(
    () => getSavedRating(storageKey),
    [storageKey]
  )
  const savedRating = useSyncExternalStore(
    subscribeToRatingChanges,
    getSnapshot,
    getServerRating
  )
  const rating = typeof savedRating === "number" ? savedRating : null

  function saveRating(nextRating: number) {
    try {
      window.localStorage.setItem(storageKey, String(nextRating))
      setSaveError(false)
      window.dispatchEvent(new Event(RATING_CHANGE_EVENT))
    } catch (error) {
      console.error("Could not save the beer rating to local storage.", error)
      setSaveError(true)
    }
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="font-semibold">Betygsätt</legend>
      <div role="group" aria-label="Choose a rating from 0.5 to 5 stars">
        {Array.from({ length: 5 }, (_, index) => {
          const star = index + 1
          const halfRating = star - 0.5
          const fill =
            rating === null ? 0 : Math.min(Math.max(rating - index, 0), 1) * 100

          return (
            <span
              key={star}
              className="relative inline-flex text-4xl leading-none"
            >
              <span
                aria-hidden="true"
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to right, #fbbf24 ${fill}%, #6b7280 ${fill}%)`,
                }}
              >
                ★
              </span>
              <button
                type="button"
                aria-label={`Rate ${halfRating} out of 5 stars`}
                aria-pressed={rating === halfRating}
                onClick={() => saveRating(halfRating)}
                className="absolute inset-y-0 left-0 w-1/2 rounded-l-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              />
              <button
                type="button"
                aria-label={`Rate ${star} out of 5 stars`}
                aria-pressed={rating === star}
                onClick={() => saveRating(star)}
                className="absolute inset-y-0 right-0 w-1/2 rounded-r-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              />
            </span>
          )
        })}
      </div>
      <p aria-live="polite">
        {rating === null
          ? "Icke betygsatt"
          : `Ditt betyg: ${rating.toFixed(1)} / 5`}
      </p>
      {savedRating === STORAGE_ERROR && (
        <p role="alert">
          Ditt sparade betyg kunde inte laddas från denna webbläsare.
        </p>
      )}
      {saveError && (
        <p role="alert">Ditt betyg kunde inte sparas i denna webbläsare.</p>
      )}
    </fieldset>
  )
}
