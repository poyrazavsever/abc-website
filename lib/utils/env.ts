export function getEnv(name: string): string {
  const value = getOptionalEnv(name);

  if (value === undefined) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

export function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];

  return value && value.trim() !== "" ? value : undefined;
}
