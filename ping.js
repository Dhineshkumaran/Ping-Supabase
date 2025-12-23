import express from "express";
import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

async function pingDB() {
  const { error } = await supabase
    .from("gallery_images")
    .select("id")
    .limit(1);

  if (error) {
    console.error("DB select failed:", error.message);
  } else {
    console.log("DB query successful:", new Date().toISOString());
  }
}

cron.schedule("0 10 * * 1,4", pingDB);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
