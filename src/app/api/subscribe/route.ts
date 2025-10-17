import { redisSubscriber } from "@/util/redis";

export const GET = async (request: Request) => {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      await redisSubscriber.subscribe("sample-channel", (message) => {
        const data = `data: ${JSON.stringify({
          timestamp: new Date().toISOString(),
          message,
        })}\n\n`;

        controller.enqueue(encoder.encode(data));
      });

      request.signal.addEventListener("abort", async () => {
        await redisSubscriber.unsubscribe("sample-channel");
        await redisSubscriber.quit();
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
