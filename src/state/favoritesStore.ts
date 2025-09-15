import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface FavoriteRef {
  id: string
  book: string
  chapter: number
  verseStart?: number
  verseEnd?: number
  text?: string
  addedAt: number
}

interface FavoritesState {
  favorites: FavoriteRef[]
  addFavorite: (fav: Omit<FavoriteRef, 'id' | 'addedAt'>) => void
  removeFavorite: (id: string) => void
  isFavorite: (book: string, chapter: number, verseStart?: number, verseEnd?: number) => boolean
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (fav) => set((state) => {
        const id = `${fav.book}|${fav.chapter}|${fav.verseStart ?? ''}-${fav.verseEnd ?? ''}`
        if (state.favorites.some(f => f.id === id)) return state
        const next: FavoriteRef = { id, addedAt: Date.now(), ...fav }
        return { favorites: [next, ...state.favorites].slice(0, 200) }
      }),
      removeFavorite: (id) => set((state) => ({ favorites: state.favorites.filter(f => f.id !== id) })),
      isFavorite: (book, chapter, verseStart, verseEnd) => {
        const id = `${book}|${chapter}|${verseStart ?? ''}-${verseEnd ?? ''}`
        return get().favorites.some(f => f.id === id)
      }
    }),
    { name: 'favorites-store' }
  )
)


