import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/theme/ThemeProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Student Voice",
	description:
		"Une app pour faciliter l' échange entre prof et etudiants de maniere constructive",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" className="h-full">
			<body className={cn(inter.className,"bg-background w-full",'h-full')}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>{children}</ThemeProvider>
			</body>
		</html>
	);
}
