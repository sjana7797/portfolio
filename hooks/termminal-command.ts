"use client";

import { useEffect, useMemo, useState } from "react";
import {
  clear,
  terminalMessages as messages,
} from "~/components/home/constants";
import { useCommand } from "~/store";
import { v4 as uuid } from "uuid";
import { Message } from "~/components/home/type";

export const useTerminal = () => {
  const { commands, addCommand, clearCommands } = useCommand();

  const [terminalMessages, setTerminalMessages] = useState<Message[]>([]);

  useEffect(() => {
    const commandLength = commands.length;

    if (!commandLength) {
      setTerminalMessages([]);
      return;
    }
    const lastCommand = commands[commandLength - 1];

    const userMessage: Message = {
      message: lastCommand.name,
      id: uuid(),
      type: "user",
    };
    setTerminalMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage: Message = {
        message: messages[lastCommand.id],
        id: uuid(),
        type: "bot",
      };

      setTerminalMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 300);
  }, [commands]);

  return { terminalMessages, addCommand, clearCommands };
};
