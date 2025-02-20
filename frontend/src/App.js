import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "tailwindcss/tailwind.css";
import { Code } from "lucide-react";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# This is a Heading 1  
## This is a Heading 2  
### This is a Heading 3  
**This is bold text**  
*This is italic text*  
- Item 1  
- Item 2  
- Item 3  
[Google](https://www.google.com)  
![Alt text](https://via.placeholder.com/150)  
`);
  const [html, setHtml] = useState("");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    if (markdown.trim() === "") {
      setHtml("");
      return;
    }

    const fetchHtml = async () => {
      try {
        const response = await axios.post("http://localhost:5000/convert", { markdown });
        console.log(response.data.html,"response.data.html")
        setHtml(response.data.html);
      } catch (error) {
        console.error("Error converting markdown:", error);
      }
    };

    fetchHtml();
  }, [markdown]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col p-4">
      <h1 className="text-xl font-bold text-gray-800">Markdown Editor</h1>
      <div className="flex flex-1 mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Markdown Editor Section */}
        <div className="w-1/2 border-r border-gray-300 bg-gray-50 flex flex-col">
          <div className="h-[40px] bg-gray-200 text-gray-700 text-sm font-semibold p-2.5 border-b flex items-center">
            MARKDOWN
          </div>
          <textarea
            className="w-full flex-1 p-3 border-none focus:outline-none bg-white font-mono text-sm"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type Markdown here..."
          />
        </div>

        {/* Preview Section */}
        <div className="w-1/2 bg-white flex flex-col">
          <div className="h-[40px] bg-gray-200 text-gray-700 text-sm font-semibold p-2 border-b flex items-center justify-between">
            PREVIEW
            <button
              className="px-2 py-1 bg-gray-800 text-white rounded-md text-xs flex items-center gap-1"
              onClick={() => setShowCode(!showCode)}
            >
              <Code size={12} />
              {showCode ? "Hide Code" : "Show Code"}
            </button>
          </div>
          <div className="flex-1 p-3 overflow-auto bg-white">
            {showCode ? (
              <SyntaxHighlighter language="markdown" style={atomDark} className="rounded-md">
                {html}
              </SyntaxHighlighter>
            ) : (
              <div className="prose lg:prose-lg max-w-full p-2 text-gray-800" dangerouslySetInnerHTML={{ __html: html }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;
