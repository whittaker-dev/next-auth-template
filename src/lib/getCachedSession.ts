import { auth } from "@/auth";
import { cache } from "react";

export const getCachedSession = cache(auth);
