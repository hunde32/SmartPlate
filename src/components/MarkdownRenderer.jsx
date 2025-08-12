import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import './markdown.css';

const components = {
  h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
  h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
  p: ({ node, ...props }) => <p className="markdown-p" {...props} />,
  ul: ({ node, ...props }) => <ul className="markdown-ul" {...props} />,
  ol: ({ node, ...props }) => <ol className="markdown-ol" {...props} />,
  li: ({ node, ...props }) => <li className="markdown-li" {...props} />,
  blockquote: ({ node, ...props }) => <blockquote className="markdown-blockquote" {...props} />,
  table: ({ node, ...props }) => <table className="markdown-table" {...props} />,
  thead: ({ node, ...props }) => <thead className="markdown-thead" {...props} />,
  tbody: ({ node, ...props }) => <tbody className="markdown-tbody" {...props} />,
  th: ({ node, ...props }) => <th className="markdown-th" {...props} />,
  td: ({ node, ...props }) => <td className="markdown-td" {...props} />,
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const MarkdownRenderer = ({ children }) => {
  if (!children) {
    return null;
  }
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
