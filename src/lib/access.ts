import { Tool } from "@prisma/client";
import { GET } from "@/app/api/access/tools/route";
export const getUserTools = async (): Promise<Tool[]> => {
  const res = await fetch("/api/access/tools");
  if (!res.ok) {
    return [];
  }

  const tools = await res.json();
  return tools;
};

export const getUserToolsServer = async (): Promise<Tool[]> => {
  const result = await GET();
  if (result.ok) {
    return result.json();
  }

  return [];
};
