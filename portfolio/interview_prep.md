# 🚀 Tech Interview Prep: React Portfolio Project

As a FAANG interviewer with 10+ years of experience, when I look at a project like your portfolio, I'm less interested in *what* it looks like and heavily interested in *how* you built it, the technical decisions you made, and how you handle edge cases. 

Here is a curated list of questions I would ask you about this specific codebase, along with exactly what I would be looking for in your answers.

---

## 1. System Design & Architecture

> [!NOTE]
> **Interviewer Intent:** I want to know if you blindly picked tools or if you understand the trade-offs of your tech stack.

**Q: You chose Vite over Webpack or Create React App (CRA). Can you explain the underlying difference in how Vite serves your code during development versus Webpack?**

**How you should answer:**
"Yes. Webpack is a bundler-based dev server. Before it can serve the page, it has to crawl the entire application, process all modules, and bundle them together. This gets exponentially slower as the codebase grows. Vite, on the other hand, leverages native ES modules in the browser. It serves source code directly and only transforms modules on-demand as the browser requests them. For dependencies, Vite pre-bundles them using esbuild (which is written in Go and extremely fast). This results in near-instant server start times and much faster Hot Module Replacement (HMR), regardless of app size."

**Q: Your application fetches data from multiple external platforms (LeetCode, GitHub, GFG, etc.) on load in your DSA section. If the Codeforces API goes down, what happens to your page?**

**How you should answer:**
"The page still loads perfectly. To handle multiple independent network requests, I used `Promise.allSettled()` instead of `Promise.all()`. 
If I had used `Promise.all()`, a single rejection (like Codeforces returning a 500 status) would short-circuit the entire array, causing all other platform fetches to throw an error. By using `Promise.allSettled()`, I ensure that the application waits for all requests to finish seamlessly. I then check `if (result.status === 'fulfilled')` for each platform. If an API fails, that specific card gracefully falls back to showing '—' (null/undefined states) while the rest of the application functions normally."

---

## 2. API Integrations & Web Security (CORS)

> [!CAUTION]
> **Interviewer Intent:** Front-end engineers must understand CORS. It's a fundamental browser security mechanism. If you can explain CORS and how to bypass it correctly, you instantly stand out.

**Q: While integrating the GeeksForGeeks API, you couldn't fetch data directly from the browser due to CORS errors, so you used a proxy. Can you explain what CORS is, why the browser blocked your request, and how the proxy solves this?**

**How you should answer:**
"CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to prevent malicious scripts on one origin from reading data from another origin without permission. When my localhost (or my portfolio domain) tried to request the GFG API, the browser sent a preflight request. Because GFG's servers don't include my domain in their `Access-Control-Allow-Origin` headers, the browser blocked the response to protect user data. 

To solve this, I used a proxy. CORS is strictly a *browser-level* security feature; servers communicating with servers do not enforce CORS. 
1. **In Development:** I configured Vite's built-in dev server to act as a proxy. My frontend requests `/gfg-api`, the local Node server intercepts it, makes a server-to-server request to GFG, and passes the JSON back to the frontend.
2. **In Production:** I use a proxy service (like `corsproxy.io`). My frontend asks the remote proxy server to fetch the data. The proxy server fetches it from GFG (no CORS involved), appends the `Access-Control-Allow-Origin: *` header to its own response, and sends it back to my browser window."

---

## 3. Advanced React Patterns & Performance

> [!TIP]
> **Interviewer Intent:** I want to see how you manage state, side effects, and optimize React rendering lifecycles.

**Q: I saw you built a custom `useTypingAnimation` hook in your Hero section. How did you handle cleanup, and why is that important in React?**

**How you should answer:**
"In the `useTypingAnimation` hook, I used `setTimeout` inside a `useEffect` to manage the typing and deleting intervals. I ensured that the `useEffect` returns a cleanup function: `return () => clearTimeout(timeout);`. 
This is critical because if the component unmounts (for example, the user routes to a different page) while a timeout is still pending, the timer will eventually fire and try to update state on an unmounted component. This causes a memory leak and throws a React warning. Returning the cleanup function guarantees the timer is destroyed if the component is removed from the DOM."

**Q: You are fetching live data on the client side. If I navigate away from the DSA section and come back 5 seconds later, do you make the network requests again?**

**How you should answer:**
"No, I implemented a custom session storage caching mechanism in my `codingApis.js` utility. Before making a `fetch()` call, the function checks `sessionStorage` for a specific cache key. If the data exists and the timestamp is less than 10 minutes old (TTL), it returns the cached data immediately. This prevents redundant network requests, avoids hitting API rate limits (especially for GitHub which limits to 60 requests/hr for unauthenticated users), and provides a much faster, snappy experience when the user navigates back and forth."

**Q: You utilized Intersection Observers for your animated counters. Why use an Intersection Observer instead of a standard window scroll event listener?**

**How you should answer:**
"Scroll event listeners are notoriously bad for performance. They fire synchronously on the main thread hundreds of times per second when a user scrolls. If you attach complex logic to them, it causes severe layout thrashing and UI jank.
The `IntersectionObserver` API resolves this by offloading the calculation of element visibility to the browser asynchronously. It only fires a callback precisely when the targeted element enters or exits the viewport threshold. I used this for the `<AnimatedNumber />` component so the counting animation only triggers when the user actually scrolls down to see the DSA section, saving CPU cycles when it's out of view."

---

## 4. General Advice for the Interview:
1. **Own Your Technical Choices:** If they ask you why you used `framer-motion` over standard CSS transitions, be honest. "Framer Motion provides orchestrations (like staggering children arrays easily with layout animations) that are incredibly tedious to manage with pure CSS keyframes."
2. **Admit Knowledge Gaps Gracefully:** If an interviewer asks a deep dive into WebGL/Three.js math and you don't know it, say: *"I utilized the `@react-three/drei` and `@react-three/fiber` abstractions to quickly implement 3D models. I understand the basics of scenes, cameras, and meshes in React Fiber, but I haven't written raw GLSL shaders."* Honesty is a highly rated signal in FAANG interviews.
