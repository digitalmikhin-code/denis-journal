import { NextResponse, type NextRequest } from "next/server";

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Subscribers CRM", charset="UTF-8"',
      "Cache-Control": "no-store"
    }
  });
}

export function middleware(request: NextRequest): NextResponse {
  const dashboardUser = process.env.SUBSCRIBERS_DASHBOARD_USER;
  const dashboardPassword = process.env.SUBSCRIBERS_DASHBOARD_PASSWORD;

  if (!dashboardUser || !dashboardPassword) {
    return new NextResponse("Subscribers dashboard auth is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" }
    });
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.slice("Basic ".length).trim();
  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex < 0) return unauthorizedResponse();

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    if (username !== dashboardUser || password !== dashboardPassword) {
      return unauthorizedResponse();
    }
  } catch {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/subscribers/:path*"]
};

