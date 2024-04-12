import * as React from 'react';

import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { toast } from '@redwoodjs/web/toast';

const CopyButton = ({ code }: { code: string }) => {
  return (
    <button className="absolute right-3 top-2">
      <CopyToClipboard text={code} onCopy={() => toast.success('Copied!')}>
        <div>
          <DocumentDuplicateIcon className="h-4 w-4 text-pink-300 hover:text-pink-100" />
        </div>
      </CopyToClipboard>
    </button>
  );
};

type Props = {
  code: string;
  language: string;
  style: string;
};
const CodeBlock = ({ code, language, style }: Props) => {
  return (
    <div className="relative">
      <CopyButton code={code} />
      <SyntaxHighlighter
        language={language}
        style={style}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={false}
        showInlineLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
