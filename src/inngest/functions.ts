import {  openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

// Step 2 code...
export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event }) => {
        const codeAgent = createAgent({
            name: "summarizer",
            system: "You are an expert next.js developer.  You write read able and maintainable code. you write simple next.js snippets & React",
            model: openai({ model: "gpt-4o" }),
          });
          const { output } = await codeAgent.run(
            `Write the following snippets: ${event.data.value}`,
          );
          console.log(output);
      return { output };
    },
  );
  