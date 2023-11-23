"use client";
import { formatDistanceStrict } from "date-fns";
import fr from "date-fns/locale/fr";
import { useEffect, useState } from "react";

export default function Time({ updatedAt }: { updatedAt: Date | string }) {
	const [dateFormat, setDateFormat] = useState<string | null>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setDateFormat((value) => formatDistanceStrict(updatedAt as Date, Date.now(), { locale: fr, addSuffix: true }));
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [dateFormat, updatedAt]);

	return <div>{dateFormat}</div>;
}
