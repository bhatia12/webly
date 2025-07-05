import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";
import {Sandbox} from '@e2b/code-interpreter'
import { getSandbox } from "./utils";

// Step 2 code...
export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        const sandboxId = await step.run("get-sandbox-id", async() => {
          const sandbox = await Sandbox.create("webly-nextjs-test")
          return sandbox.sandboxId
        })

        const codeAgent = createAgent({
            name: "summarizer",
            system: "You are an expert next.js developer.  You write read able and maintainable code. you write simple next.js snippets & React",
            model: openai({ model: "gpt-4o" }),
          });
          const { output } = await codeAgent.run(
            `Write the following snippets: ${event.data.value}`,
          );
          console.log(output);
          const sandboxUrl = await step.run("get-sandbox-url", async()=> {
            const sandbox = await getSandbox(sandboxId);
            const host =  sandbox.getHost(3000);
            return `https://${host}`;


          })
          return { output, sandboxUrl };
    },
  );