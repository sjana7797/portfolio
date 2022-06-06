import { createClient } from "next-sanity";
import imageUriBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "ucwpnuwl",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const buildUrl = imageUriBuilder(client);

export const urlFor = (source: string) => buildUrl.image(source);
