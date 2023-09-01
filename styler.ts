import { StylerError } from "./error.ts";
import { toCamelCase, toSnakeCase } from "./to-case.ts";

export type Var = "{}" | ":";
export type Case = "camel" | "snake";
export type Option = {
  var: Var;
  case: Case;
};

const bracketToColon = (path: string, toCase: (s: string) => string) => {
  const parts = path.split("/");
  const newParts = parts.map((part) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return ":" + toCase(part.slice(1, part.length - 1));
    }
    return part;
  });
  return newParts.join("/");
};

const colonToBracket = (path: string, toCase: (s: string) => string) => {
  const parts = path.split("/");
  const newParts = parts.map((part) => {
    if (part.startsWith(":")) {
      return "{" + toCase(part.slice(1)) + "}";
    }
    return part;
  });
  return newParts.join("/");
};

const mkCase = (c: Case) => {
  if (c === "camel") {
    return toCamelCase;
  } else if (c === "snake") {
    return toSnakeCase;
  } else {
    throw new StylerError("invalid case");
  }
};

const guessVar = (path: string) => {
  if (path.includes("{") && path.includes("}")) {
    return "{}";
  } else if (path.includes(":")) {
    return ":";
  } else {
    throw new StylerError("invalid path");
  }
};

const mkVar = (path: string, v: Var) => {
  const fromVar = guessVar(path);
  if (fromVar === ":" && v === "{}") {
    return colonToBracket;
  } else if (fromVar === "{}" && v === ":") {
    return bracketToColon;
  } else {
    throw new StylerError("invalid var");
  }
};

export const newStyler = (option: Option) => (path: string) =>
  mkVar(path, option.var)(path, mkCase(option.case));
