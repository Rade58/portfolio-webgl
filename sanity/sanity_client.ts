import buildSanityClient from "@sanity/client";

export default buildSanityClient({
  dataset: "production",
  projectId: "4mpb3bwc",
  useCdn: true,
});
