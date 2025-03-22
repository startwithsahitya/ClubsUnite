// src/auth.js
import NextAuth from "next-auth";
import { nextAuthConfig } from "../lib/next-auth-config";

export const { auth } = NextAuth(nextAuthConfig);
