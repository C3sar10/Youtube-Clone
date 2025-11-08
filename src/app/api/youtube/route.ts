import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  const apiKey = process.env.YOUTUBE_API_KEY;

  let apiUrl = "";

  if (query) {
    apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&videoEmbeddable=true&q=${encodeURIComponent(
      query
    )}&type=video&key=${apiKey}`;
  } else {
    apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=24&videoEmbeddable=true&key=${apiKey}`;
  }

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      // YouTube may return a structured error
      console.error("YouTube API returned an error:", data);
      return NextResponse.json({ error: data.error?.message || "YouTube API error" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
  }
}