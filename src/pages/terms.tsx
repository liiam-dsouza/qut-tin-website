import { MarkdownPage } from "@/components/MarkdownPage"
import content from "@/content/terms-of-service.md?raw"

export default function Terms() {
  	return <MarkdownPage title="Terms of Service" content={content} />
}
