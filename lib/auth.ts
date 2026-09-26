import { cookies } from "next/headers";

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "vsdfhgfgjhjerhh@sdsg3$";
export const AUTH_COOKIE_NAME = "vwc_admin_session";
export const AUTH_TOKEN_VALUE = "vwc_authenticated_admin_session_valid";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return session?.value === AUTH_TOKEN_VALUE;
}
