import { getClient } from "@lib/sanity.server";

const DebugCaching = true;
declare global {
  // var is required for the object to exist in globalThis
  // let or const will be rejected.
  // eslint-disable-next-line no-var
  var sanityCache: any; // You can rename this to whatever you want.
}

export async function getEntryCachedMem(
  id: string,
  query: string,
  cacheTimeInSeconds = 60
): Promise<any> {
  const cacheKey = id;

  if (globalThis.sanityCache == null) {
    globalThis.sanityCache = {};
  }

  if (globalThis.sanityCache[cacheKey]) {
    DebugCaching && console.log(`Cache hit for [${id}]`);
    const cached = JSON.parse(globalThis.sanityCache[cacheKey]);

    // Cache will expire at TTL
    if (new Date().getTime() < cached.ttl) {
      return cached.entry;
    }

    DebugCaching &&
      console.log(
        `Cache expired for [${id}] - revalidating. Time diff in seconds: [${
          Math.floor(new Date().getTime() - cached.ttl) / 1000
        }]`
      );
  }

  const entry = await getClient(false).fetch(query);

  const cachedEntry = {
    ttl: new Date().getTime() + 1000 * cacheTimeInSeconds,
    entry,
  };

  DebugCaching && console.log(`Fetching & caching entry for [${id}]`);

  try {
    globalThis.sanityCache[cacheKey] = JSON.stringify(cachedEntry);
  } catch (e: any) {
    console.log("Error caching data to globalThis: ", e.message);
  }

  return entry;
}
