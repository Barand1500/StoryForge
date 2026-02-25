'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Undo,
  Redo,
  Eye,
  Edit3,
  Maximize2,
  Minimize2,
  Save
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  onSave?: () => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

type ToolbarAction = 
  | 'bold' | 'italic' | 'underline' | 'strikethrough'
  | 'h1' | 'h2' | 'h3'
  | 'ul' | 'ol' | 'quote' | 'code' | 'codeblock'
  | 'link' | 'image' | 'hr'
  | 'alignLeft' | 'alignCenter' | 'alignRight';

interface ToolbarButton {
  action: ToolbarAction;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  markdown?: string;
}

const toolbarGroups: ToolbarButton[][] = [
  [
    { action: 'bold', icon: Bold, label: 'Kalın (Ctrl+B)', markdown: '**' },
    { action: 'italic', icon: Italic, label: 'İtalik (Ctrl+I)', markdown: '*' },
    { action: 'underline', icon: Underline, label: 'Altı Çizili', markdown: '<u></u>' },
    { action: 'strikethrough', icon: Strikethrough, label: 'Üstü Çizili', markdown: '~~' },
  ],
  [
    { action: 'h1', icon: Heading1, label: 'Başlık 1', markdown: '# ' },
    { action: 'h2', icon: Heading2, label: 'Başlık 2', markdown: '## ' },
    { action: 'h3', icon: Heading3, label: 'Başlık 3', markdown: '### ' },
  ],
  [
    { action: 'ul', icon: List, label: 'Madde İşareti', markdown: '- ' },
    { action: 'ol', icon: ListOrdered, label: 'Numaralı Liste', markdown: '1. ' },
    { action: 'quote', icon: Quote, label: 'Alıntı', markdown: '> ' },
  ],
  [
    { action: 'code', icon: Code, label: 'Satır İçi Kod', markdown: '`' },
    { action: 'codeblock', icon: Code, label: 'Kod Bloğu', markdown: '```\n' },
    { action: 'link', icon: Link, label: 'Bağlantı', markdown: '[](url)' },
    { action: 'image', icon: Image, label: 'Resim', markdown: '![](url)' },
    { action: 'hr', icon: Minus, label: 'Yatay Çizgi', markdown: '\n---\n' },
  ],
];

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg my-2 overflow-x-auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-[var(--primary)] pl-4 my-2 italic text-gray-600 dark:text-gray-400">$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="my-4 border-gray-300 dark:border-gray-600" />')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-[var(--primary)] hover:underline" target="_blank">$1</a>')
    // Images
    .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-2" />')
    // Line breaks
    .replace(/\n/g, '<br />');

  return html;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = 'Yazmaya başla...',
  minHeight = 200,
  maxHeight = 600,
  onSave,
  autoSave = false,
  autoSaveDelay = 3000
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update counts
  useEffect(() => {
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    const chars = value.length;
    setWordCount(words);
    setCharCount(chars);
  }, [value]);

  // Auto-save
  useEffect(() => {
    if (autoSave && onSave && value) {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
      autoSaveTimerRef.current = setTimeout(() => {
        onSave();
        setLastSaved(new Date());
      }, autoSaveDelay);
    }
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [value, autoSave, onSave, autoSaveDelay]);

  // Add to history
  const addToHistory = useCallback((newValue: string) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(newValue);
      return newHistory.slice(-50); // Keep last 50
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  // Handle undo/redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      onChange(history[historyIndex - 1]);
    }
  }, [historyIndex, history, onChange]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      onChange(history[historyIndex + 1]);
    }
  }, [historyIndex, history, onChange]);

  // Insert markdown
  const insertMarkdown = useCallback((action: ToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let newText = '';
    let cursorOffset = 0;

    switch (action) {
      case 'bold':
        newText = `**${selectedText || 'kalın metin'}**`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case 'italic':
        newText = `*${selectedText || 'italik metin'}*`;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'underline':
        newText = `<u>${selectedText || 'altı çizili'}</u>`;
        cursorOffset = selectedText ? newText.length : 3;
        break;
      case 'strikethrough':
        newText = `~~${selectedText || 'üstü çizili'}~~`;
        cursorOffset = selectedText ? newText.length : 2;
        break;
      case 'h1':
        newText = `# ${selectedText || 'Başlık 1'}`;
        cursorOffset = newText.length;
        break;
      case 'h2':
        newText = `## ${selectedText || 'Başlık 2'}`;
        cursorOffset = newText.length;
        break;
      case 'h3':
        newText = `### ${selectedText || 'Başlık 3'}`;
        cursorOffset = newText.length;
        break;
      case 'ul':
        newText = `- ${selectedText || 'liste öğesi'}`;
        cursorOffset = newText.length;
        break;
      case 'ol':
        newText = `1. ${selectedText || 'liste öğesi'}`;
        cursorOffset = newText.length;
        break;
      case 'quote':
        newText = `> ${selectedText || 'alıntı'}`;
        cursorOffset = newText.length;
        break;
      case 'code':
        newText = `\`${selectedText || 'kod'}\``;
        cursorOffset = selectedText ? newText.length : 1;
        break;
      case 'codeblock':
        newText = `\`\`\`\n${selectedText || 'kod bloğu'}\n\`\`\``;
        cursorOffset = selectedText ? newText.length : 4;
        break;
      case 'link':
        newText = `[${selectedText || 'bağlantı metni'}](url)`;
        cursorOffset = selectedText ? newText.length - 4 : 1;
        break;
      case 'image':
        newText = `![${selectedText || 'alt metin'}](resim-url)`;
        cursorOffset = selectedText ? newText.length - 10 : 2;
        break;
      case 'hr':
        newText = '\n---\n';
        cursorOffset = newText.length;
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);
    addToHistory(newValue);

    // Set cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, [value, onChange, addToHistory]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            insertMarkdown('bold');
            break;
          case 'i':
            e.preventDefault();
            insertMarkdown('italic');
            break;
          case 'u':
            e.preventDefault();
            insertMarkdown('underline');
            break;
          case 's':
            if (onSave) {
              e.preventDefault();
              onSave();
              setLastSaved(new Date());
            }
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [insertMarkdown, handleUndo, handleRedo, onSave]);

  const containerClasses = isFullscreen 
    ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col' 
    : 'relative border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900';

  return (
    <div className={containerClasses}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-wrap">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-gray-600">
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Geri Al (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Yinele (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Formatting tools */}
        {toolbarGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-1 px-2 border-r border-gray-300 dark:border-gray-600 last:border-r-0">
            {group.map(({ action, icon: Icon, label }) => (
              <button
                key={action}
                onClick={() => insertMarkdown(action)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={label}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        ))}

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className={`p-2 rounded-lg transition-colors ${isPreview ? 'bg-[var(--primary)] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            title={isPreview ? 'Düzenle' : 'Önizleme'}
          >
            {isPreview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          {onSave && (
            <button
              onClick={() => {
                onSave();
                setLastSaved(new Date());
              }}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Kaydet (Ctrl+S)"
            >
              <Save className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Editor/Preview */}
      <div className={`flex-1 ${isFullscreen ? 'overflow-auto' : ''}`}>
        {isPreview ? (
          <div 
            className="p-4 prose dark:prose-invert max-w-none overflow-auto"
            style={{ minHeight, maxHeight: isFullscreen ? undefined : maxHeight }}
            dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onBlur={() => {
              if (value !== history[historyIndex]) {
                addToHistory(value);
              }
            }}
            placeholder={placeholder}
            className="w-full p-4 resize-none focus:outline-none bg-transparent"
            style={{ 
              minHeight: isFullscreen ? '100%' : minHeight, 
              maxHeight: isFullscreen ? undefined : maxHeight,
              fontFamily: 'ui-monospace, monospace'
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>{wordCount} kelime</span>
          <span>{charCount} karakter</span>
        </div>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span>Son kayıt: {lastSaved.toLocaleTimeString('tr-TR')}</span>
          )}
          <span className="hidden sm:inline">Markdown destekleniyor</span>
        </div>
      </div>
    </div>
  );
}
