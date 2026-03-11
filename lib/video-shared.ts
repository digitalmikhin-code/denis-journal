export type VideoPlatform = "youtube" | "rutube" | "vk";

export type VideoFrontmatter = {
  title: string;
  date: string;
  platform: VideoPlatform;
  url: string;
  description?: string;
  draft?: boolean;
};

export type VideoItem = {
  slug: string;
  fileName: string;
  frontmatter: VideoFrontmatter;
};

function youtubeEmbed(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    const id = url.pathname.split("/").filter(Boolean)[0];
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.hostname.includes("youtube.com")) {
    const watchId = url.searchParams.get("v");
    if (watchId) {
      return `https://www.youtube.com/embed/${watchId}`;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const marker = parts[0];
    if ((marker === "shorts" || marker === "embed") && parts[1]) {
      return `https://www.youtube.com/embed/${parts[1]}`;
    }
  }

  return null;
}

function rutubeEmbed(url: URL): string | null {
  if (!url.hostname.includes("rutube.ru")) {
    return null;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "play" && parts[1] === "embed" && parts[2]) {
    return `https://rutube.ru/play/embed/${parts[2]}`;
  }

  if (parts[0] === "video" && parts[1]) {
    return `https://rutube.ru/play/embed/${parts[1]}`;
  }

  return null;
}

function vkEmbed(url: URL): string | null {
  const host = url.hostname.toLowerCase();

  if (host.includes("vkvideo.ru") && url.pathname.includes("video_ext.php")) {
    return url.toString();
  }

  if (host.includes("vk.com") && url.pathname.includes("video_ext.php")) {
    return `https://vkvideo.ru${url.pathname}${url.search}`;
  }

  if ((host.includes("vk.com") || host.includes("vkvideo.ru")) && url.pathname.includes("/video")) {
    const match = url.pathname.match(/video(-?\d+)_(\d+)/);
    if (match) {
      const oid = match[1];
      const id = match[2];
      return `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${id}&hd=2`;
    }
  }

  return null;
}

export function resolveEmbedUrl(platform: VideoPlatform, rawUrl: string): string | null {
  if (!rawUrl) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  if (platform === "youtube") {
    return youtubeEmbed(url);
  }
  if (platform === "rutube") {
    return rutubeEmbed(url);
  }
  return vkEmbed(url);
}
