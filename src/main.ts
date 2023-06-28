//! IF ANYTHING IN THIS FILE IS CHANGED MAKE SURE setVersion.js HAS ALSO BEEN UPDATED
import App from "./App.svelte";

const app = new App({
	target: document.body,
	props: {
		version: "1.0.0",
	}
});

export default app;