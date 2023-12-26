declare global {
  interface Window {
    script2: {
      handleCode: (githubAppCode: string) => void
    }
  }
}
export {}
