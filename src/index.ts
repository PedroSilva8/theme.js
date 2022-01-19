/** Theme Type */
type Theme = {
  [key: string]: string
}

export default class ThemeJs {
  /** List of all themes */
  static Themes: Theme[] = []

  /** Selected Theme Index */
  static SelectedTheme = -1

  /**
   * Get Current Theme
   * @returns returns the current theme, if nothing is selected returns an empty obj
   */
  static CurrentTheme() {
    return this.SelectedTheme === -1 ? {} : this.Themes[this.SelectedTheme]
  }

  /**
   * Change selected theme
   * @param name the name of the theme to select
   */
  static SetCurrentTheme(name: string) {
    this.SelectedTheme = this.Themes.findIndex((val) => val.name === name)
  }

  /**
   * Create a theme
   * @param name The name of the theme
   * @param setCurrent if true sets the new theme as current theme, false by default
   */
  static CreateTheme(name: string, setCurrent = false) {
    this.Themes.push({ name })
    if (setCurrent) this.SelectedTheme = this.Themes.length - 1
  }

  static AddTheme(theme: Theme, setCurrent = false) {
    this.Themes.push(theme)
    if (setCurrent) this.SelectedTheme = this.Themes.length - 1
  }

  /**
   * Delete all themes
   */
  static Clear() {
    this.SelectedTheme = -1
    this.Themes = []
  }

  /**
   * Load a theme from a file
   * @param theme The object to be loaded
   * @param setCurrent If it should set new theme as selected
   * @returns True if theme is valid, otherwise returns false
   */
  static LoadTheme(theme: unknown, setCurrent = false) {
    if (theme as Theme) {
      this.Themes.push(theme as Theme)
      if (setCurrent) this.SelectedTheme = this.Themes.length - 1
      return true
    }
    return false
  }

  /**
   * Set the a value for the current or named theme
   * @param param the theme paramenter being changed
   * @param value the new value
   * @param themeName the theme being changed, leave undefined to change the current theme
   * @returns
   */
  static SetThemeValue(param: string, value: string, themeName?: string | undefined) {
    if (!themeName && this.SelectedTheme === -1) return

    if (!themeName) return (this.CurrentTheme()[param] = value)

    const selTheme = this.Themes.find((val) => val.name === themeName)

    if (selTheme) selTheme[param] = value
  }

  /**
   * Applys Theme To CSS
   * @param name The name of the theme to apply, leave undefined to apply selected theme
   * @param spacing The value used to replace _ , - by default
   */
  static ApplyTheme(name?: string | undefined, spacing = '-') {
    let selTheme = name ? this.Themes.find((val) => val.name === name) : this.CurrentTheme()

    if (!selTheme) selTheme = {}

    for (const [key, val] of Object.entries(selTheme)) {
      if (key !== 'name') {
        document.documentElement.style.setProperty('--' + key.replace('_', spacing), val)
        document.documentElement.style.setProperty('--rgb-' + key.replace('_', spacing), this.hexToRgb(val))
      }
    }
  }

  /**
   * Function used to convert hex value to R, G, B
   * @param hex The hex being converted
   */
  static hexToRgb = (hex: string): string => {
    const arrBuff = new ArrayBuffer(4)
    const vw = new DataView(arrBuff)
    vw.setUint32(0, parseInt(hex.substring(1), 16), false)
    const arrByte = new Uint8Array(arrBuff)

    return arrByte[1] + ',' + arrByte[2] + ',' + arrByte[3]
  }
}
