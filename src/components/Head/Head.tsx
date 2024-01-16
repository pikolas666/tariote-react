import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

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
		<>
			<link rel="icon" href="/favicon.ico" />
			<title>Tariote Photography</title>
			<Script src="//code.tidio.co/jxloh9mwayhrsrumsqwksfuurzju8h0x.js" async />
		</>
	);
};

export default CustomHead;
