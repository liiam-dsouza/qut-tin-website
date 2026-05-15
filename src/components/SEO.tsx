import { Helmet } from "react-helmet-async"
import { event } from "@/data/event"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const baseUrl = "https://techindustrynight.com"
const defaultDescription = "The flagship networking event for students, founders, and industry leaders. Bridge the gap between academia and industry at Tech Industry Night 2026."
const defaultImage = `${baseUrl}/tin-og.png`

function SEO({ title, description, image, url }: SEOProps) {
	const fullTitle = title
		? `${title} - Tech Industry Night ${event.year}`
		: `Tech Industry Night ${event.year}`
	const metaDescription = description ?? defaultDescription
	const metaImage = image ?? defaultImage
	const metaUrl = url ? `${baseUrl}${url}` : baseUrl

	return (
		<Helmet>
			{/* Primary */}
			<title>{fullTitle}</title>
			<meta name="description" content={metaDescription} />
			<link rel="canonical" href={metaUrl} />

			{/* Open Graph */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={metaDescription} />
			<meta property="og:image" content={metaImage} />
			<meta property="og:url" content={metaUrl} />
			<meta property="og:site_name" content={`Tech Industry Night ${event.year}`} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={metaDescription} />
			<meta name="twitter:image" content={metaImage} />

			{/* Extra */}
			<meta name="theme-color" content="#E91E8C" />
		</Helmet>
  	)
}

export default SEO
