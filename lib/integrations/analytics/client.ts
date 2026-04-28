"use client";

export async function trackClientEvent(eventName: string, properties?: Record<string, unknown>) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventName, properties }),
    });
  } catch (err) {
    console.error("Analytics error:", err);
  }
}
