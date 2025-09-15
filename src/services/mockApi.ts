// Service API mock pour contourner les problèmes de serveur
// Ce service simule les appels API en utilisant le localStorage

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

class MockApiService {
  private storageKey = 'bible_interactive_profiles'

  async saveProfile(profile: UserProfile): Promise<{ success: boolean; id?: string; action?: string }> {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Générer un ID si nécessaire
      if (!profile.id) {
        profile.id = Date.now().toString()
      }
      
      // Ajouter des timestamps
      const now = new Date().toISOString()
      if (!profile.createdAt) {
        profile.createdAt = now
      }
      profile.updatedAt = now
      
      // Sauvegarder dans localStorage
      const existingProfiles = this.getStoredProfiles()
      const existingIndex = existingProfiles.findIndex(p => p.id === profile.id)
      
      if (existingIndex >= 0) {
        existingProfiles[existingIndex] = profile
      } else {
        existingProfiles.push(profile)
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(existingProfiles))
      
      return {
        success: true,
        id: profile.id,
        action: existingIndex >= 0 ? 'updated' : 'created'
      }
    } catch (error) {
      console.error('Erreur sauvegarde profil mock:', error)
      return { success: false }
    }
  }

  async loadProfile(userId?: string): Promise<{ success: boolean; profile?: UserProfile }> {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const profiles = this.getStoredProfiles()
      
      if (userId) {
        const profile = profiles.find(p => p.id === userId)
        return {
          success: !!profile,
          profile: profile || undefined
        }
      } else {
        // Retourner le dernier profil
        const profile = profiles[profiles.length - 1]
        return {
          success: !!profile,
          profile: profile || undefined
        }
      }
    } catch (error) {
      console.error('Erreur chargement profil mock:', error)
      return { success: false }
    }
  }

  private getStoredProfiles(): UserProfile[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Erreur lecture localStorage:', error)
      return []
    }
  }

  // Méthode pour ajouter des données de test
  async addTestData(): Promise<void> {
    const testProfiles: UserProfile[] = [
      {
        id: '1',
        firstName: 'Jean',
        lastName: 'Dupont',
        age: 29,
        church: 'Église Orthodoxe',
        email: 'jean.dupont@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        firstName: 'Marie',
        lastName: 'Martin',
        age: 24,
        church: 'Église Catholique',
        email: 'marie.martin@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    localStorage.setItem(this.storageKey, JSON.stringify(testProfiles))
  }

  // Méthode pour vérifier si on est en mode mock
  isMockMode(): boolean {
    return true // Toujours en mode mock pour l'instant
  }
}

export const mockApi = new MockApiService()
