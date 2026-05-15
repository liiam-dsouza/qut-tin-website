import { MarkdownPage } from "@/components/MarkdownPage"
import content from "@/content/privacy-policy.md?raw"

export default function PrivacyPolicy() {
	return <MarkdownPage title="Privacy Policy" content={content} />
}
