/**
 * @fileOverview A React hook to determine if the user is on a mobile device.
 * It uses the `window.matchMedia` API to check the screen width against a breakpoint.
 */
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A custom hook that returns a boolean indicating if the current device is mobile.
 * @returns {boolean} `true` if the viewport width is less than the mobile breakpoint, otherwise `false`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
