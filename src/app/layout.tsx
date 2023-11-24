import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast'
import Script from "next/script";
import { getServerSession } from "next-auth";
import AuthProvider from "@/lib/session-provider";
import { options } from "./api/auth/[...nextauth]/options";


const roboto = Roboto({ subsets: ["latin"], weight: ["100","300" ,"400" ,"500" ,"700" ,"900"]});

export const metadata: Metadata = {
	title: "Student Voice",
	description:
		"Une app pour faciliter l' échange entre prof et etudiants de maniere constructive",
	manifest: "/manifest.json",
	

};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(options)
	return (
		<html lang="fr" className="h-full flex flex-col items-center">
			<body className={cn(roboto.className, "bg-backgroun w-full max-w-lg mx-auto relative", 'h-full')}>
				<AuthProvider session={session}>
					<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>{children}</ThemeProvider>
				</AuthProvider>
				<Toaster position="top-right" />
			</body>
			<Script id="serviceworker" src="/js.js" />
		</html>
	);
}
