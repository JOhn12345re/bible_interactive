import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockApi, type UserProfile as MockUserProfile } from '../services/mockApi'

export interface UserProfile {
  id?: string
  firstName: string
  lastName: string
  age: number
  church: string
  email?: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

interface ProfileState {
  profile: UserProfile | null
  isProfileComplete: boolean
  setProfile: (profile: UserProfile) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  clearProfile: () => void
  saveProfileToServer: (profile: UserProfile) => Promise<boolean>
  loadProfileFromServer: (userId?: string) => Promise<boolean>
}

const defaultProfile: UserProfile = {
  firstName: '',
  lastName: '',
  age: 0,
  church: '',
  email: ''
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isProfileComplete: false,

      setProfile: (profile) => {
        const isComplete = !!(profile.firstName && profile.lastName && profile.age > 0 && profile.church)
        set({ profile, isProfileComplete: isComplete })
      },

      updateProfile: (updates) => {
        const currentProfile = get().profile || defaultProfile
        const newProfile = { ...currentProfile, ...updates }
        const isComplete = !!(newProfile.firstName && newProfile.lastName && newProfile.age > 0 && newProfile.church)
        set({ profile: newProfile, isProfileComplete: isComplete })
      },

      clearProfile: () => {
        set({ profile: null, isProfileComplete: false })
      },

      saveProfileToServer: async (profile) => {
        try {
          // Essayer d'abord l'API PHP
          const response = await fetch('/api/profile.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile)
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success) {
              set({ profile: { ...profile, id: result.id } })
              return true
            }
          }
          
          // Si l'API PHP échoue, utiliser le service mock
          console.warn('API PHP indisponible, utilisation du service mock')
          const mockResult = await mockApi.saveProfile(profile as MockUserProfile)
          if (mockResult.success) {
            set({ profile: { ...profile, id: mockResult.id } })
            return true
          }
          
          return false
        } catch (error) {
          console.error('Erreur sauvegarde profil:', error)
          
          // En cas d'erreur, essayer le service mock
          try {
            console.warn('Tentative de sauvegarde avec le service mock')
            const mockResult = await mockApi.saveProfile(profile as MockUserProfile)
            if (mockResult.success) {
              set({ profile: { ...profile, id: mockResult.id } })
              return true
            }
          } catch (mockError) {
            console.error('Erreur service mock:', mockError)
          }
          
          return false
        }
      },

      loadProfileFromServer: async (userId) => {
        try {
          // Essayer d'abord l'API PHP
          const url = userId ? `/api/profile.php?id=${userId}` : '/api/profile.php'
          const response = await fetch(url)
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.profile) {
              const isComplete = !!(result.profile.firstName && result.profile.lastName && result.profile.age > 0 && result.profile.church)
              set({ profile: result.profile, isProfileComplete: isComplete })
              return true
            }
          }
          
          // Si l'API PHP échoue, utiliser le service mock
          console.warn('API PHP indisponible, utilisation du service mock')
          const mockResult = await mockApi.loadProfile(userId)
          if (mockResult.success && mockResult.profile) {
            const isComplete = !!(mockResult.profile.firstName && mockResult.profile.lastName && mockResult.profile.age > 0 && mockResult.profile.church)
            set({ profile: mockResult.profile, isProfileComplete: isComplete })
            return true
          }
          
          return false
        } catch (error) {
          console.error('Erreur chargement profil:', error)
          
          // En cas d'erreur, essayer le service mock
          try {
            console.warn('Tentative de chargement avec le service mock')
            const mockResult = await mockApi.loadProfile(userId)
            if (mockResult.success && mockResult.profile) {
              const isComplete = !!(mockResult.profile.firstName && mockResult.profile.lastName && mockResult.profile.age > 0 && mockResult.profile.church)
              set({ profile: mockResult.profile, isProfileComplete: isComplete })
              return true
            }
          } catch (mockError) {
            console.error('Erreur service mock:', mockError)
          }
          
          return false
        }
      }
    }),
    { 
      name: 'profile-store',
      partialize: (state) => ({ 
        profile: state.profile, 
        isProfileComplete: state.isProfileComplete 
      })
    }
  )
)
