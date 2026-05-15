import ReactMarkdown from "react-markdown"

interface MarkdownPageProps {
	title: string
	content: string
}

export function MarkdownPage({ content }: MarkdownPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-6 py-24 prose prose-neutral dark:prose-invert max-w-7xl">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
