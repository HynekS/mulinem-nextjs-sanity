// import { createClient } from "next-sanity";
import { createClient } from "sanity-codegen";
import { config } from "./config";
import { Documents } from "../schema";

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient<Documents>(config);

// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient<Documents>({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview: boolean) =>
  usePreview ? previewClient : sanityClient;
