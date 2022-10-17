declare module 'cozy-flags' {
  export const FlagSwitcher: React.FC
  export const FlagContext: React.Context
  export const FlagProvider: React.FC
  export const Flag: React.FC
  export const useFlags: () => Record<string, boolean>
  export const useFlag: (flagName: string) => boolean
  export const withFlags: (Component: React.FC) => React.FC
  export const withFlag: (flagName: string) => (Component: React.FC) => React.FC
  export const useFlagSwitcher: () => {
    flags: Record<string, boolean>
    setFlag: (flagName: string, value: boolean) => void
  }
  export default useFlag
}
