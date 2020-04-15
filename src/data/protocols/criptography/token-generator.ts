export interface TokenGenerator {
  generate (id: number): Promise<string>
}
