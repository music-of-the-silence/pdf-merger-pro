const themes = {
  light: {
    // Background colors
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--bg-tertiary': '#f1f5f9',
    '--bg-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--bg-navbar': 'rgba(255, 255, 255, 0.95)',
    '--bg-card': '#ffffff',
    '--bg-footer': 'linear-gradient(135deg, #1e293b, #334155)',
    
    // Text colors
    '--text-primary': '#1e293b',
    '--text-secondary': '#64748b',
    '--text-tertiary': '#94a3b8',
    '--text-white': '#ffffff',
    '--text-muted': '#6b7280',
    
    // Border colors
    '--border-primary': '#e2e8f0',
    '--border-secondary': '#cbd5e1',
    '--border-accent': '#4f46e5',
    '--border-navbar': 'rgba(255, 255, 255, 0.2)',
    
    // Shadow colors
    '--shadow-light': 'rgba(0, 0, 0, 0.05)',
    '--shadow-medium': 'rgba(0, 0, 0, 0.1)',
    '--shadow-heavy': 'rgba(0, 0, 0, 0.15)',
    '--shadow-navbar': 'rgba(0, 0, 0, 0.1)',
    
    // Accent colors
    '--accent-primary': '#4f46e5',
    '--accent-secondary': '#7c3aed',
    '--accent-gradient': 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    '--accent-hover': '#3730a3',
    
    // Status colors
    '--success-bg': '#dcfce7',
    '--success-text': '#166534',
    '--success-border': '#bbf7d0',
    '--error-bg': '#fee2e2',
    '--error-text': '#dc2626',
    '--error-border': '#fecaca',
    '--warning-bg': '#fef3c7',
    '--warning-text': '#92400e',
    '--warning-border': '#fde68a',
    
    // Interactive elements
    '--btn-primary-bg': 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    '--btn-primary-text': '#ffffff',
    '--btn-secondary-bg': '#f1f5f9',
    '--btn-secondary-text': '#475569',
    '--btn-secondary-border': '#e2e8f0',
    
    // Form elements
    '--input-bg': '#ffffff',
    '--input-border': '#d1d5db',
    '--input-focus-border': '#4f46e5',
    '--input-focus-shadow': 'rgba(79, 70, 229, 0.1)',
    
    // Overlay and backdrop
    '--overlay-light': 'rgba(255, 255, 255, 0.1)',
    '--overlay-medium': 'rgba(255, 255, 255, 0.2)',
    '--backdrop-blur': 'blur(10px)',
    
    // Animation colors
    '--glow-primary': 'rgba(79, 70, 229, 0.3)',
    '--glow-secondary': 'rgba(124, 58, 237, 0.3)'
  },
  
  dark: {
    // Background colors
    '--bg-primary': '#0f172a',
    '--bg-secondary': '#1e293b',
    '--bg-tertiary': '#334155',
    '--bg-gradient': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    '--bg-navbar': 'rgba(15, 23, 42, 0.95)',
    '--bg-card': '#1e293b',
    '--bg-footer': 'linear-gradient(135deg, #0f172a, #1e293b)',
    
    // Text colors
    '--text-primary': '#f1f5f9',
    '--text-secondary': '#cbd5e1',
    '--text-tertiary': '#94a3b8',
    '--text-white': '#ffffff',
    '--text-muted': '#64748b',
    
    // Border colors
    '--border-primary': '#334155',
    '--border-secondary': '#475569',
    '--border-accent': '#6366f1',
    '--border-navbar': 'rgba(255, 255, 255, 0.1)',
    
    // Shadow colors
    '--shadow-light': 'rgba(0, 0, 0, 0.2)',
    '--shadow-medium': 'rgba(0, 0, 0, 0.3)',
    '--shadow-heavy': 'rgba(0, 0, 0, 0.4)',
    '--shadow-navbar': 'rgba(0, 0, 0, 0.3)',
    
    // Accent colors
    '--accent-primary': '#6366f1',
    '--accent-secondary': '#8b5cf6',
    '--accent-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    '--accent-hover': '#4f46e5',
    
    // Status colors
    '--success-bg': '#064e3b',
    '--success-text': '#6ee7b7',
    '--success-border': '#065f46',
    '--error-bg': '#7f1d1d',
    '--error-text': '#fca5a5',
    '--error-border': '#991b1b',
    '--warning-bg': '#78350f',
    '--warning-text': '#fcd34d',
    '--warning-border': '#92400e',
    
    // Interactive elements
    '--btn-primary-bg': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    '--btn-primary-text': '#ffffff',
    '--btn-secondary-bg': '#334155',
    '--btn-secondary-text': '#cbd5e1',
    '--btn-secondary-border': '#475569',
    
    // Form elements
    '--input-bg': '#1e293b',
    '--input-border': '#475569',
    '--input-focus-border': '#6366f1',
    '--input-focus-shadow': 'rgba(99, 102, 241, 0.2)',
    
    // Overlay and backdrop
    '--overlay-light': 'rgba(255, 255, 255, 0.05)',
    '--overlay-medium': 'rgba(255, 255, 255, 0.1)',
    '--backdrop-blur': 'blur(15px)',
    
    // Animation colors
    '--glow-primary': 'rgba(99, 102, 241, 0.4)',
    '--glow-secondary': 'rgba(139, 92, 246, 0.4)'
  }
};

export default themes; 