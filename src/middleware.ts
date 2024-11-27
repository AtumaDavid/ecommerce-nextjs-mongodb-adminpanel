import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload, jwtDecode } from "jwt-decode";

// Extend the JwtPayload interface to include the role property
interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export function middleware(request: NextRequest) {
  const encryptedToken = request.cookies.get("token")?.value || "";
  const { pathname, origin } = request.nextUrl;
  const isDashboardRoutes = pathname.startsWith("/dashboard");
  //   const decoded = jwtDecode(encryptedToken);
  //   if (encryptedToken) {
  //     const decoded = jwtDecode(encryptedToken);
  //     console.log(decoded);
  //   }

  if (!encryptedToken) {
    // if not logged in and trying to access dashboard route, redirect to signin
    if (isDashboardRoutes) {
      return NextResponse.redirect(`${origin}/signin`);
    }
    // if (pathname !== "/signin") {
    //   return NextResponse.redirect(`${origin}/signin`);
    // }
  } else {
    const decoded = jwtDecode<CustomJwtPayload>(encryptedToken);
    // console.log(decoded);

    if (isDashboardRoutes && decoded?.role !== "admin") {
      return NextResponse.redirect(`${origin}`);
    }
    // if logged in and trying to access the signin, redirect to dashboard
    if (pathname === "/signin") {
      if (isDashboardRoutes && decoded?.role !== "admin") {
        return NextResponse.redirect(`${origin}`);
      }
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.next();
}

// TEST
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const encryptedToken = request.cookies.get("token")?.value;
//   const { pathname, origin } = request.nextUrl;

//   const publicRoutes = ["/signin", "/registration"]; // Add other public routes
//   const protectedRoutes = ["/dashboard"]; // Add other dashboard/protected routes

//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // If no token and trying to access a protected route, redirect to signin
//   if (!encryptedToken && isProtectedRoute) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   // If token exists and trying to access public auth routes, redirect to dashboard
//   if (encryptedToken && isPublicRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/signin", "/dashboard/:path*", "/registration"], // Specify routes middleware should run on
// };
