import { MarkdownPage } from "@/components/MarkdownPage"
import content from "@/content/terms-of-service.md?raw"
import SEO from "@/components/SEO"

export default function Terms() {
  	return (
		<>
			<MarkdownPage title="Terms of Service" content={content} />
			<SEO title="Terms of Service" url="/terms" />
		</>
	)
}
