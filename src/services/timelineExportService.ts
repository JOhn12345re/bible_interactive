// Service d'export de la frise chronologique pour génération de documents
import { CompleteTimelineService, type HistoricalPeriod, type HistoricalEvent } from './completeTimelineService';

export interface ExportData {
  title: string;
  description: string;
  generated_date: string;
  periods: ExportPeriod[];
  educational_goals: string[];
  bibliography: string[];
}

export interface ExportPeriod {
  id: string;
  title: string;
  period_range: string;
  description: string;
  historical_context: string;
  key_themes: string[];
  events: ExportEvent[];
}

export interface ExportEvent {
  title: string;
  book: string;
  year: string;
  description: string;
  key_verses: string[];
  spiritual_lessons: string[];
  educational_notes: string;
}

class TimelineExportService {
  async getExportData(): Promise<ExportData> {
    const timelineData = await CompleteTimelineService.getCompleteTimelineData();
    
    return {
      title: "Les Fondements de la Bible - Frise Chronologique Complète",
      description: "Guide éducatif illustré des événements bibliques majeurs, de la Création aux débuts du christianisme. Version adaptée pour enfants et familles.",
      generated_date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      periods: timelineData.timeline.periods.map(period => this.convertPeriodForExport(period)),
      educational_goals: [
        "Comprendre la progression chronologique de l'histoire biblique",
        "Découvrir les liens entre les différents événements et personnages",
        "Apprendre les leçons spirituelles et morales des récits bibliques",
        "Développer une vision d'ensemble de l'histoire du salut",
        "Contextualiser historiquement et géographiquement les événements bibliques"
      ],
      bibliography: [
        "Bible Louis Segond 1910 - Domaine public",
        "Atlas biblique - Société biblique française",
        "Histoire du peuple d'Israël - André Paul",
        "Chronologie biblique - Pierre Courthial",
        "Images libres de droits - Pixabay, Unsplash"
      ]
    };
  }

  private convertPeriodForExport = (period: HistoricalPeriod): ExportPeriod => {
    return {
      id: period.id,
      title: period.title,
      period_range: period.period_range,
      description: period.description,
      historical_context: period.historical_background || "Contexte historique à développer",
      key_themes: period.key_themes || [],
      events: period.events
        .filter(event => event.available) // Seulement les événements disponibles
        .map(event => this.convertEventForExport(event))
    };
  }

  private convertEventForExport = (event: HistoricalEvent): ExportEvent => {
    let year = "Date inconnue";
    if (event.year_bc) {
      year = `${event.year_bc} av. J.-C.`;
    } else if (event.year_ad) {
      year = `${event.year_ad} ap. J.-C.`;
    }

    return {
      title: event.title,
      book: event.book,
      year: year,
      description: event.description,
      key_verses: event.key_verses || [],
      spiritual_lessons: event.spiritual_lessons || [],
      educational_notes: event.educational_notes || "Leçons éducatives à développer pour cette histoire."
    };
  }

  // Génération de contenu formaté pour différents usages
  generateMarkdownContent(data: ExportData): string {
    let content = `# ${data.title}\n\n`;
    content += `${data.description}\n\n`;
    content += `*Généré le ${data.generated_date}*\n\n`;
    
    content += `## Table des matières\n\n`;
    data.periods.forEach((period, index) => {
      content += `${index + 1}. [${period.title}](#${period.id}) (${period.period_range})\n`;
    });
    content += `\n`;

    data.periods.forEach((period) => {
      content += `## ${period.title} {#${period.id}}\n\n`;
      content += `**Période :** ${period.period_range}\n\n`;
      content += `${period.description}\n\n`;
      
      if (period.historical_context) {
        content += `### Contexte historique\n${period.historical_context}\n\n`;
      }
      
      if (period.key_themes.length > 0) {
        content += `### Thèmes principaux\n`;
        period.key_themes.forEach(theme => {
          content += `- ${theme}\n`;
        });
        content += `\n`;
      }

      content += `### Événements\n\n`;
      period.events.forEach((event, index) => {
        content += `#### ${index + 1}. ${event.title}\n\n`;
        content += `**Livre biblique :** ${event.book}  \n`;
        content += `**Date :** ${event.year}  \n\n`;
        content += `${event.description}\n\n`;
        
        if (event.key_verses.length > 0) {
          content += `**Versets clés :**\n`;
          event.key_verses.forEach(verse => {
            content += `> ${verse}\n\n`;
          });
        }
        
        if (event.spiritual_lessons.length > 0) {
          content += `**Leçons spirituelles :**\n`;
          event.spiritual_lessons.forEach(lesson => {
            content += `- ${lesson}\n`;
          });
          content += `\n`;
        }
        
        content += `**Pour les enfants :** ${event.educational_notes}\n\n`;
        content += `---\n\n`;
      });
    });

    content += `## Objectifs éducatifs\n\n`;
    data.educational_goals.forEach(goal => {
      content += `- ${goal}\n`;
    });
    content += `\n`;

    content += `## Sources et références\n\n`;
    data.bibliography.forEach(source => {
      content += `- ${source}\n`;
    });

    return content;
  }

  // Génération de données structurées pour PDF Python
  generatePythonData(data: ExportData): string {
    const pythonData = {
      title: data.title,
      description: data.description,
      generated_date: data.generated_date,
      periods: data.periods.map(period => ({
        title: period.title,
        period_range: period.period_range,
        description: period.description,
        events: period.events.map(event => ({
          title: event.title,
          book: event.book,
          year: event.year,
          description: event.description,
          key_verses: event.key_verses,
          educational_notes: event.educational_notes
        }))
      }))
    };

    return `# Données pour génération PDF - Frise Chronologique Biblique
# Généré automatiquement le ${data.generated_date}

TIMELINE_DATA = ${JSON.stringify(pythonData, null, 2)}

# Utilisation :
# import json
# data = json.loads(json.dumps(TIMELINE_DATA))
# # Puis utiliser dans votre script de génération PDF
`;
  }
}

export const timelineExportService = new TimelineExportService();