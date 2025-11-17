import { type InsertTeam, type Certificate } from "@/shared/schema";

// Google Apps Script Web App URL
export const API_BASE = "https://script.google.com/macros/s/AKfycbyXnJuxNouj-3xDHKU2O9aS5-i6ybGZEGwKhl1qqC8ZfANuxlHu6k3bgBQYWLJMIXvtOQ/exec";

export interface TeamRegistrationResponse {
  success: boolean;
  message: string;
  teamId?: string;
  certificates?: Array<{ name: string; email: string; url: string }>;
}

export interface CertificateResponse {
  success: boolean;
  certificates: Certificate[];
  message?: string;
}

/**
 * Register a new team
 */
export async function registerTeam(data: InsertTeam): Promise<TeamRegistrationResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(API_BASE + "?method=register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. The server is taking too long to respond. Please try again.');
      }
      console.error("Registration API Error:", error.message);
      throw error;
    }
    throw new Error('An unexpected error occurred during registration.');
  }
}

/**
 * Get certificates by email
 */
export async function getCertificate(email: string): Promise<CertificateResponse> {
  const response = await fetch(
    API_BASE + "?method=certificate&email=" + encodeURIComponent(email),
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certificates");
  }

  return response.json();
}
