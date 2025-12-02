/**
 * Utilitaires de sécurité pour Bible Interactive
 * Protection contre les attaques XSS, injection, etc.
 */

/**
 * Liste des balises HTML autorisées pour le contenu riche
 */
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'span', 'div',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'sup', 'sub', 'hr'
];

/**
 * Liste des attributs autorisés par balise
 */
const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  'a': ['href', 'title', 'target', 'rel'],
  'span': ['class', 'style'],
  'div': ['class', 'style'],
  'p': ['class', 'style'],
  'td': ['colspan', 'rowspan'],
  'th': ['colspan', 'rowspan'],
  '*': ['class', 'id'] // Attributs globaux
};

/**
 * Patterns dangereux à supprimer
 */
const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  /<embed\b[^>]*>/gi,
  /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
  /<input\b[^>]*>/gi,
  /<button\b[^<]*(?:(?!<\/button>)<[^<]*)*<\/button>/gi,
  /<textarea\b[^<]*(?:(?!<\/textarea>)<[^<]*)*<\/textarea>/gi,
  /<select\b[^<]*(?:(?!<\/select>)<[^<]*)*<\/select>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:/gi,
  /on\w+\s*=/gi, // Tous les gestionnaires d'événements (onclick, onload, etc.)
  /expression\s*\(/gi, // CSS expressions
  /url\s*\([^)]*script:/gi
];

/**
 * Sanitize une chaîne HTML pour éviter les attaques XSS
 * @param html - Le HTML à nettoyer
 * @returns Le HTML nettoyé et sécurisé
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let sanitized = html;

  // Supprimer les patterns dangereux
  for (const pattern of DANGEROUS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  // Nettoyer les attributs dangereux dans les balises restantes
  sanitized = sanitized.replace(/<([a-z][a-z0-9]*)\s+([^>]*)>/gi, (match, tag, attrs) => {
    const tagLower = tag.toLowerCase();
    
    // Si la balise n'est pas autorisée, la supprimer
    if (!ALLOWED_TAGS.includes(tagLower)) {
      return '';
    }

    // Filtrer les attributs
    const allowedAttrs = [...(ALLOWED_ATTRIBUTES[tagLower] || []), ...(ALLOWED_ATTRIBUTES['*'] || [])];
    
    const cleanAttrs = attrs.replace(/([a-z-]+)\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, 
      (attrMatch: string, attrName: string, attrValue: string) => {
        const attrNameLower = attrName.toLowerCase();
        
        // Supprimer les gestionnaires d'événements
        if (attrNameLower.startsWith('on')) {
          return '';
        }
        
        // Vérifier si l'attribut est autorisé
        if (!allowedAttrs.includes(attrNameLower)) {
          return '';
        }

        // Pour href, vérifier le protocole
        if (attrNameLower === 'href') {
          const value = attrValue.replace(/["']/g, '').toLowerCase().trim();
          if (value.startsWith('javascript:') || value.startsWith('vbscript:') || value.startsWith('data:')) {
            return 'href="#"';
          }
        }

        // Pour les styles, supprimer les expressions dangereuses
        if (attrNameLower === 'style') {
          let styleValue = attrValue.replace(/["']/g, '');
          styleValue = styleValue.replace(/expression\s*\([^)]*\)/gi, '');
          styleValue = styleValue.replace(/url\s*\([^)]*\)/gi, '');
          return `style="${styleValue}"`;
        }

        return attrMatch;
      }
    );

    return `<${tag}${cleanAttrs ? ' ' + cleanAttrs.trim() : ''}>`;
  });

  // Fermer les balises non autorisées
  for (const tag of ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'select']) {
    const closeRegex = new RegExp(`</${tag}>`, 'gi');
    sanitized = sanitized.replace(closeRegex, '');
  }

  return sanitized;
}

/**
 * Échappe les caractères HTML spéciaux pour affichage en texte brut
 * @param text - Le texte à échapper
 * @returns Le texte échappé
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return text.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char] || char);
}

/**
 * Valide et nettoie une URL
 * @param url - L'URL à valider
 * @returns L'URL nettoyée ou une chaîne vide si invalide
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const trimmed = url.trim().toLowerCase();
  
  // Protocoles autorisés
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  
  try {
    const parsed = new URL(url, window.location.origin);
    
    // Vérifier le protocole
    if (!allowedProtocols.includes(parsed.protocol)) {
      return '';
    }
    
    return url;
  } catch {
    // URL relative, vérifier qu'elle ne contient pas de script
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('vbscript:') || trimmed.startsWith('data:')) {
      return '';
    }
    return url;
  }
}

/**
 * Valide une entrée utilisateur (texte simple)
 * @param input - L'entrée à valider
 * @param maxLength - Longueur maximale autorisée
 * @returns L'entrée nettoyée
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Tronquer si trop long
  let sanitized = input.slice(0, maxLength);
  
  // Supprimer les caractères de contrôle (sauf newline, tab)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Échapper les caractères HTML
  sanitized = escapeHtml(sanitized);
  
  return sanitized.trim();
}

/**
 * Valide un nom de fichier
 * @param filename - Le nom de fichier à valider
 * @returns Le nom de fichier nettoyé ou null si invalide
 */
export function sanitizeFilename(filename: string): string | null {
  if (!filename || typeof filename !== 'string') {
    return null;
  }

  // Supprimer les chemins de traversée
  let sanitized = filename.replace(/\.\./g, '');
  
  // Ne garder que les caractères alphanumériques, tirets, underscores et points
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Éviter les noms de fichiers dangereux
  const dangerousNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'LPT1'];
  const baseName = sanitized.split('.')[0].toUpperCase();
  if (dangerousNames.includes(baseName)) {
    return null;
  }

  return sanitized || null;
}

/**
 * Génère un nonce cryptographique pour CSP
 * @returns Un nonce base64
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Vérifie si une chaîne contient du contenu potentiellement dangereux
 * @param content - Le contenu à vérifier
 * @returns true si le contenu semble dangereux
 */
export function containsDangerousContent(content: string): boolean {
  if (!content || typeof content !== 'string') {
    return false;
  }

  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\s*\(/i,
    /expression\s*\(/i
  ];

  return dangerousPatterns.some(pattern => pattern.test(content));
}

export default {
  sanitizeHtml,
  escapeHtml,
  sanitizeUrl,
  sanitizeInput,
  sanitizeFilename,
  generateNonce,
  containsDangerousContent
};
