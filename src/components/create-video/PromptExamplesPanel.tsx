
interface PromptExamplesPanelProps {
  examples: string[];
  onExampleClick: (example: string) => void;
}

const PromptExamplesPanel = ({ examples, onExampleClick }: PromptExamplesPanelProps) => {
  return (
    <div className="mb-4 p-4 bg-theme-black/70 border border-theme-gray/30 rounded-md">
      <h3 className="text-sm font-medium text-theme-orange mb-2">Prompt Examples:</h3>
      <ul className="space-y-2">
        {examples.map((example, index) => (
          <li key={index}>
            <button 
              onClick={() => onExampleClick(example)}
              className="text-xs text-white/80 hover:text-theme-orange text-left w-full p-2 rounded hover:bg-theme-gray/20 transition-colors"
            >
              {example}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptExamplesPanel;
