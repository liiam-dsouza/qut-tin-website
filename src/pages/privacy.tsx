import { MarkdownPage } from "@/components/MarkdownPage"
import content from "@/content/privacy-policy.md?raw"
import SEO from "@/components/SEO"

export default function PrivacyPolicy() {
	return (
		<>
			<SEO title="Privacy Policy" url="/privacy" />
			<MarkdownPage title="Privacy Policy" content={content} />
		</>

	)
}
