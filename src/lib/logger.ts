import { prisma } from "@/lib/prisma";
import { LogType } from "@prisma/client";

export class Logger {
  static async log(
    message: string,
    logType: LogType = LogType.INFO,
    location: string = ""
  ) {
    console.log(
      `[${new Date().toISOString()}] [${
        LogType[logType]
      }] (${location}) ${message}`
    );

    try {
      await prisma.logs.create({
        data: {
          log: message,
          type: logType,
        },
      });
    } catch (error) {
      console.error("Error logging message: ", error);
    }
  }

  static async error(location: string, message: string) {
    this.log(message, LogType.ERROR, location);
  }

  static async info(location: string, message: string) {
    this.log(message, LogType.INFO, location);
  }

  static async warn(location: string, message: string) {
    this.log(message, LogType.WARNING, location);
  }
}
