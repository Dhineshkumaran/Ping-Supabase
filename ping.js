import cron from "node-cron";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function pingDB() {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")          
    .limit(1);           

  if (error) {
    console.error("DB select failed:", error.message);
  } else {
    console.log("DB query successful:", new Date().toISOString());
  }
}

// Run twice a week — Monday & Thursday at 10AM
cron.schedule("0 10 * * MON,THU", pingDB);

console.log("Supabase DB ping scheduled...");