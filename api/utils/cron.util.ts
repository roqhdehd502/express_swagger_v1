import cron from "node-cron";

export const cronUpdate = cron.schedule("0 * * * *", async () => {
  try {
    console.log("Cron Schedule Running : cronUpdate");
  } catch (error: any) {
    console.log(error);
  }
});
