import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const CustomHead = () => {
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = () => {
			// Show Tidio chat when the page is the home page
			if (router.pathname === "/") {
				tidioChatApi.display(true);
			} else {
				// Hide Tidio chat for other pages
				tidioChatApi.display(false);
			}
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		// Cleanup the event listener on component unmount
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.pathname, router.events]);

	return (
		<Head>
			<link rel="icon" href="/flavicon.png" />
			<title>Tariote Photography</title>
			<script
				src="//code.tidio.co/jxloh9mwayhrsrumsqwksfuurzju8h0x.js"
				async
			></script>
		</Head>
	);
};

export default CustomHead;
