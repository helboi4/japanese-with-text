import "./_styles/globals.css";
import TopBar from "./_components/topBar";
import { Red_Hat_Display, Space_Mono, Noto_Sans_JP } from "next/font/google";

const redHat = Red_Hat_Display({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-red-hat"
})

const spaceMono = Space_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-space-mono"
})

const mPlus1 = Noto_Sans_JP({
	subsets: ["latin-ext"],
	weight: ['300'],
	variable: "--font-noto-sans"
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${redHat.variable} ${spaceMono.variable} ${mPlus1.variable}`}>
			<body>
				<TopBar></TopBar>
				{children}
			</body>
		</html>
	);
}
